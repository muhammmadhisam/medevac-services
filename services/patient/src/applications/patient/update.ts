import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { PatientServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  ParamSchema,
  PatientId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { PatientPartialSchema, PatientSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(
  PatientSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  PatientPartialSchema.omit({
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
      description: "Update Patient",
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
      description: "Update Patient Error",
    },
  },
  tags: ["Patient"],
});

export default (app: TypeApplication) =>
  app.put("/:id", Docs, RequestParam, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const q = c.req.valid("param");
    const program = PatientServiceContext.pipe(
      Effect.andThen(service => service.update(PatientId(q.id), data)),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "updated" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
