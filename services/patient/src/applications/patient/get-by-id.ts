import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { PatientServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  ParamSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { PatientSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(
  PatientSchema.omit({ delete_date: true }),
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
      description: "Get Patient by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Patient by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Patient by id fail",
    },
  },
  tags: ["Patient"],
});

export default (app: TypeApplication) =>
  app.get("/:id", Docs, RequestParam, async (c) => {
    const query = c.req.valid("param");
    const program = PatientServiceContext.pipe(
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
