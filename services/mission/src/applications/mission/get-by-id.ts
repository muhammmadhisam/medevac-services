import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { MissionServiceContext } from "@/core/services/mission/mission.service";
import {
  FailResponseSchema,
  ParamSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { MissionSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  MissionSchema.omit({ delete_date: true }),
);
const RequestParam = validator("param", ParamSchema);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Get Mission by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Mission by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Mission by id fail",
    },
  },
  tags: ["Mission"],
});

export default (app: TypeApplication) =>
  app.get("/:id", authorizationMiddleware, Docs, RequestParam, async (c) => {
    const query = c.req.valid("param");
    const program = MissionServiceContext.pipe(
      Effect.andThen(service =>
        service.getOne({
          ...query,
        }),
      ),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "get data by id" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
