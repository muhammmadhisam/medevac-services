import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";

import { HistoryServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  PatientId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { HistoryOptionalDefaultsSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(HistoryOptionalDefaultsSchema);
const RequestBody = validator(
  "json",
  HistoryOptionalDefaultsSchema.omit({
    create_by: true,
    create_date: true,
    id: true,
    patient_id: true,
    update_by: true,
    update_date: true,
  }),
);
const RequestParam = validator(
  "param",
  z.object({
    patient_id: z.string().transform(v => PatientId(v)),
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
      description: "Create History",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Create History Error",
    },
  },
  tags: ["History"],
});

export default (app: TypeApplication) =>
  app.post("/", Docs, RequestParam, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const param = c.req.valid("param");
    const program = HistoryServiceContext.pipe(
      Effect.andThen(service =>
        service.create({
          ...data,
          Patient: { connect: { id: param.patient_id } },
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
