import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { MissionServiceContext } from "@/core/services/mission/mission.service";
import {
  FailResponseSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { MissionSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver } from "hono-openapi/zod";

import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  MissionSchema.omit({
    create_date: true,
    delete_date: true,
    update_date: true,
  }),
);

const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Get Mission Current",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Mission Current fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Mission Current fail",
    },
  },
  tags: ["Mission"],
});

export default (app: TypeApplication) =>
  app.get("/current-mission", authorizationMiddleware, Docs, async (c) => {
    const user = c.get("user");

    if (!user)
      return c.json({ data: "unauthorization" }, { status: 401 });

    const program = MissionServiceContext.pipe(
      Effect.andThen(service =>
        service.getOne({
          Joiners: { some: { user_id: user.id } },
        }),
      ),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "success" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
