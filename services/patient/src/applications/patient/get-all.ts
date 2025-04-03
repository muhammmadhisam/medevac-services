import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { PatientServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  PaginationSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { PatientSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  PatientSchema.omit({ delete_date: true }).array(),
);

const RequestQuery = validator("query", PaginationSchema);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Get all Patient",
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
  tags: ["Patient"],
});

export default (app: TypeApplication) =>
  app.get("/", authorizationMiddleware, Docs, RequestQuery, async (c) => {
    const query = c.req.valid("query");
    const program = PatientServiceContext.pipe(
      Effect.andThen(service =>
        service.getAll({
          orderBy: { create_date: "desc" },
          pagination: { limit: query.limit, page: query.page * query.limit },
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
  });
