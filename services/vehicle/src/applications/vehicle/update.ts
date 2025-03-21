import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { VehicleServiceContext } from "@/core/services/vehicle/vehicle.service";
import {
  FailResponseSchema,
  ParamSchema,
  SuccessResponseSchema,
  VehicleId,
} from "@/core/types/index.js";
import { VehiclePartialSchema, VehicleSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(
  VehicleSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  VehiclePartialSchema.omit({
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
      description: "Update Vehicle",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Vehicle by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Update Vehicle Error",
    },
  },
  tags: ["Vehicle"],
});

export default (app: TypeApplication) =>
  app.put("/:id", Docs, RequestParam, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const q = c.req.valid("param");
    const program = VehicleServiceContext.pipe(
      Effect.andThen(service => service.update(VehicleId(q.id), data)),
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
