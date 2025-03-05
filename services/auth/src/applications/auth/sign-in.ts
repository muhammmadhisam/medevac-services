import type { TypeApplication } from "@/core/configs/create-application.js";
import {
  FailResponseSchema,
  SignInSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { Duration, Effect } from "effect";

import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { setCookie } from "hono/cookie";
import { z } from "zod";
import { ServicesRuntime } from "../../core/runtime/index.js";
import { AuthServiceContext } from "../../core/services/auth/auth.service.js";

const ResponseSchema = SuccessResponseSchema(z.string().default("ok"));
const RequestBody = validator("json", SignInSchema);

const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "SignIn Success",
    },
    401: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "SignIn Fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "SignIn  Error",
    },
  },
  tags: ["authentication"],
});

export default (app: TypeApplication) =>
  app.post("/sign-in", Docs, RequestBody, async (c) => {
    const data = c.req.valid("json");
    const program = AuthServiceContext.pipe(
      Effect.andThen(service => service.signIn(data)),
      Effect.tap(({ access_token }) =>
        setCookie(c, "access_token", access_token, {
          httpOnly: true,
          maxAge: Duration.toSeconds(Duration.minutes(5)),
          sameSite: "Lax",
        }),
      ),
      Effect.tap(({ refresh_token }) =>
        setCookie(c, "refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: Duration.toSeconds(Duration.minutes(5)),
          sameSite: "Lax",
        }),
      ),
      Effect.andThen(() =>
        ResponseSchema.parse({ data: "ok", message: "signin success" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
