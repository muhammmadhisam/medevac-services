import type { TypeApplication } from "@medevac/core";
import {
  FailResponseSchema,
  SignUpSchema,
  SuccessResponseSchema,
} from "@medevac/core";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";
import { ServicesRuntime } from "../../core/runtime/index.js";
import { AuthServiceContext } from "../../core/services/auth/auth.service.js";

const ResponseSchema = SuccessResponseSchema(z.string().default("ok"));
const RequestBody = validator("json", SignUpSchema);

const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "SignUp Success",
    },

    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Create CcsProjectDetail Error",
    },
  },
  tags: ["Authentication"],
});

export default (app: TypeApplication) =>
  app.post("/sign-up", Docs, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const program = AuthServiceContext.pipe(
      Effect.andThen(service => service.signUp(data)),
      Effect.andThen(() =>
        ResponseSchema.parse({ data: "ok", message: "signup success" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
