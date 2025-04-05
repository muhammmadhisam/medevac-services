import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { StationPatientServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  PatientId,
  StationPatientId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import {
  StationPatientPartialSchema,
  StationPatientSchema,
} from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(StationPatientSchema);
const RequestBody = validator(
  "json",
  StationPatientPartialSchema.omit({
    create_date: true,
    id: true,
    patient_id: true,
    update_date: true,
  }),
);
const RequestParam = validator(
  "param",
  z.object({
    id: z.string().transform(v => StationPatientId(v)),
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
      description: "Update StationPatient",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get StationPatient by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Update StationPatient Error",
    },
  },
  tags: ["StationPatient"],
});

export default (app: TypeApplication) =>
  app.put("/:id", Docs, RequestParam, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const param = c.req.valid("param");
    const program = StationPatientServiceContext.pipe(
      Effect.andThen(service =>
        service.update(StationPatientId(param.id), data),
      ),
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
