import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { PatientServiceContext } from "@/core/services/patient/patient.service";
import {
  FailResponseSchema,
  PaginationSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { PatientItemSchema } from "@/core/types/schema/patient";

import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(PatientItemSchema.array());

const RequestQuery = validator("query", PaginationSchema);
const RequestParam = validator(
  "param",
  z.object({
    mission_id: z.string(),
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
  tags: ["Patinet"],
});

export default (app: TypeApplication) =>
  app.get(
    "/:mission_id/patinet",
    authorizationMiddleware,
    Docs,
    RequestQuery,
    RequestParam,
    async (c) => {
      const query = c.req.valid("query");
      const { mission_id } = c.req.valid("param");

      const program = PatientServiceContext.pipe(
        Effect.andThen(service =>
          service.getAll({
            pagination: { limit: query.limit, page: query.page * query.limit },
            where: { mission_id },
          }),
        ),
        Effect.andThen(({ data, total }) =>
          ResponseSchema.parse({
            data,
            message: "get data",
            meta_data: { total, ...query },
          }),
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
