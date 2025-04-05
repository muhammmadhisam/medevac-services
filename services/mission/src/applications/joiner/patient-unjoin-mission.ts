import type { TypeApplication } from "@/core/configs/create-application.js";
import { authorizationMiddleware } from "@/applications/middleware";
import { ServicesRuntime } from "@/core/runtime";
import { PatientServiceContext } from "@/core/services/patient/patient.service";
import {
  FailResponseSchema,
  JoinerMissionId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { PatientItemSchema } from "@/core/types/schema/patient";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(PatientItemSchema);
const RequestParam = validator(
  "param",
  z.object({ mission_id: z.string(), patient_id: z.string() }),
);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Patient oin Mission Success",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Patient Join Mission Error",
    },
  },
  tags: ["Join"],
});

export default (app: TypeApplication) =>
  app.delete(
    "/patinet-un-join-mission/:patient_id",
    authorizationMiddleware,
    Docs,
    RequestParam,
    async (c) => {
      const { mission_id, patient_id } = c.req.valid("param");
      const program = PatientServiceContext.pipe(
        Effect.let("service", s => s),
        Effect.bind("patient", ({ service }) =>
          service.getOne({ mission_id, patient_id })),
        Effect.andThen(({ patient, service }) =>
          service.remove(JoinerMissionId(patient.id)),
        ),
        Effect.andThen(data =>
          ResponseSchema.parse({
            data,
            message: "นำผู้ป่วยออกจากเข้าร่วมภารกิจสำเร็จ",
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
