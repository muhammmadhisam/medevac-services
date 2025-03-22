import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";

import { PatientServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { PatientOptionalDefaultsSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(
  PatientOptionalDefaultsSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  PatientOptionalDefaultsSchema.omit({
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
      description: "Create Patient",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Create Patient Error",
    },
  },
  tags: ["Patient"],
});

export default (app: TypeApplication) =>
  app.post("/", Docs, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const program = PatientServiceContext.pipe(
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
