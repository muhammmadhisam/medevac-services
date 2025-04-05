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
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(PatientItemSchema.array());

const RequestQuery = validator("query", PaginationSchema);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Get Paitnet In Mission by Current User Success",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Paitnet In Mission by Current User Fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Paitnet In Mission by Current User Fail",
    },
  },
  tags: ["Patient"],
});

export default (app: TypeApplication) =>
  app.get(
    "/current-patinet",
    authorizationMiddleware,
    Docs,
    RequestQuery,
    async (c) => {
      const query = c.req.valid("query");
      const user = c.get("user");
      if (!user)
        return c.json({ data: "unauthorization" }, { status: 401 });
      const program = PatientServiceContext.pipe(
        Effect.andThen(service =>
          service.getAll({
            pagination: { limit: query.limit, page: query.page * query.limit },
            where: { Mission: { Joiners: { every: { user_id: user.id } } } },
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
