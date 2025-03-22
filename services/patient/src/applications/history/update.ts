import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { HistoryServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  HistoryId,
  PatientId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { HistoryPartialSchema, HistorySchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(HistorySchema);
const RequestBody = validator(
  "json",
  HistoryPartialSchema.omit({
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
    id: z.string().transform(v => HistoryId(v)),
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
      description: "Update History",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get History by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Update History Error",
    },
  },
  tags: ["History"],
});

export default (app: TypeApplication) =>
  app.put("/:id", Docs, RequestParam, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const param = c.req.valid("param");
    const program = HistoryServiceContext.pipe(
      Effect.andThen(service => service.update(HistoryId(param.id), data)),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "updated" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
