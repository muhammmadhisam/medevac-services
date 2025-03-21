import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { MissionServiceContext } from "@/core/services/mission/mission.service";
import {
  FailResponseSchema,
  MissionId,
  ParamSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { MissionPartialSchema, MissionSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  MissionSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  MissionPartialSchema.omit({
    create_date: true,
    delete_date: true,
    id: true,
    update_date: true,
  }),
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
      description: "Update Mission",
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
      description: "Update Mission Error",
    },
  },
  tags: ["Mission"],
});

export default (app: TypeApplication) =>
  app.put(
    "/:id",
    authorizationMiddleware,
    Docs,
    RequestParam,
    RequestBody,
    async (c) => {
      const data = c.req.valid("json");
      const q = c.req.valid("param");
      const program = MissionServiceContext.pipe(
        Effect.andThen(service => service.update(MissionId(q.id), data)),
        Effect.andThen(data =>
          ResponseSchema.parse({ data, message: "updated" }),
        ),
        Effect.andThen(data => c.json(data, 200)),
        Effect.catchAll(error =>
          Effect.succeed(c.json(error, { status: error.status })),
        ),
      );
      const result = await ServicesRuntime.runPromise(program);
      return result;
    },
  );
