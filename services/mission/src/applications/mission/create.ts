import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";

import { MissionServiceContext } from "@/core/services/mission/mission.service";
import {
  FailResponseSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";

import { MissionOptionalDefaultsSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";

import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  MissionOptionalDefaultsSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  MissionOptionalDefaultsSchema.omit({
    create_date: true,
    delete_date: true,
    id: true,
    update_date: true,
  }),
);
const Docs = describeRoute({
  responses: {
    201: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Create Mission",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Create Mission Error",
    },
  },
  tags: ["Mission"],
});

export default (app: TypeApplication) =>
  app.post("/", authorizationMiddleware, Docs, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const program = MissionServiceContext.pipe(
      Effect.andThen(service =>
        service.create({
          ...data,
        }),
      ),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "created" }),
      ),
      Effect.andThen(data => c.json(data, 201)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
