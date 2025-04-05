import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { StationPatientServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  PaginationSchema,
  PatientId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { StationPatientSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(StationPatientSchema.array());

const RequestQuery = validator("query", PaginationSchema);
const RequestParam = validator(
  "param",
  z.object({
    patient_id: z.string().transform(v => PatientId(v)),
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
      description: "Get all StationPatient",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get all Error",
    },
  },
  tags: ["StationPatient"],
});

export default (app: TypeApplication) =>
  app.get(
    "/",
    authorizationMiddleware,
    Docs,
    RequestQuery,
    RequestParam,
    async (c) => {
      const query = c.req.valid("query");
      const param = c.req.valid("param");
      const program = StationPatientServiceContext.pipe(
        Effect.andThen(service =>
          service.getAll({
            orderBy: { create_date: "desc" },
            pagination: { limit: query.limit, page: query.page * query.limit },
            where: { ...param },
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
