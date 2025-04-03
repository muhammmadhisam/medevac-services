import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";

import { VehicleServiceContext } from "@/core/services/vehicle/vehicle.service";
import {
  FailResponseSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { VehicleOptionalDefaultsSchema } from "@/core/types/schema/prisma";

import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(
  VehicleOptionalDefaultsSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  VehicleOptionalDefaultsSchema.omit({
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
      description: "Create Vehicle",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Create Vehicle Error",
    },
  },
  tags: ["Vehicle"],
});

export default (app: TypeApplication) =>
  app.post("/", Docs, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const program = VehicleServiceContext.pipe(
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
