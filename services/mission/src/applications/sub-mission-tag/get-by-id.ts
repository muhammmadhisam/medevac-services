import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { SubMissionTagServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  SubMissionId,
  SubMissionTagId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { SubMissionTagSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";

import { z } from "zod";

import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  SubMissionTagSchema.omit({ delete_date: true }),
);
const RequestParam = validator(
  "param",
  z.object({
    id: z.string().transform(v => SubMissionTagId(v)),
    sub_mission_id: z.string().transform(v => SubMissionId(v)),
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
      description: "Get SubMissionTag by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get SubMissionTag by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get SubMissionTag by id fail",
    },
  },
  tags: ["SubMissionTag"],
});

export default (app: TypeApplication) =>
  app.get("/:id", authorizationMiddleware, Docs, RequestParam, async (c) => {
    const query = c.req.valid("param");
    const program = SubMissionTagServiceContext.pipe(
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
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
