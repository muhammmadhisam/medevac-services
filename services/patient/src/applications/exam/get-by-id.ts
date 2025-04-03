import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { ExamServiceContext } from "@/core/services";
import {
  ExamId,
  FailResponseSchema,
  PatientId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { ExamSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";

import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(ExamSchema);
const RequestParam = validator(
  "param",
  z.object({
    id: z.string().transform(v => ExamId(v)),
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
      description: "Get Exam by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Exam by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Exam by id fail",
    },
  },
  tags: ["Exam"],
});

export default (app: TypeApplication) =>
  app.get("/:id", Docs, RequestParam, async (c) => {
    const param = c.req.valid("param");
    const program = ExamServiceContext.pipe(
      Effect.andThen(service =>
        service.getOne({
          ...param,
        }),
      ),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "get data by id" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
