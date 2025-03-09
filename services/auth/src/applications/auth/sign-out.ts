import type { TypeApplication } from "@/core/configs/create-application.js";

import { COOKIE } from "@/core/constants/cookie.js";
import { ServicesRuntime } from "@/core/runtime/index.js";
import { AuthServiceContext } from "@/core/services/auth/auth.service.js";
import {
  FailResponseSchema,
  SuccessResponseSchema,
  UsersId,
} from "@/core/types/index.js";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";

import { deleteCookie } from "hono/cookie";

import { z } from "zod";
import { authorizationMiddleware } from "../middleware/authorization.js";

const ResponseSchema = SuccessResponseSchema(z.string().default("ok"));

const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "SignOutSuccess",
    },
    401: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "SignOut Fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "SignOut  Error",
    },
  },
  tags: ["Authentication"],
});

export default (app: TypeApplication) =>
  app.get("/sign-out", Docs, authorizationMiddleware, async (c) => {
    const user = c.get("user");
    if (!user)
      return c.json({ message: "nofound user in context" }, { status: 401 });
    const program = AuthServiceContext.pipe(
      Effect.andThen(service => service.signOut(UsersId(user.id))),
      Effect.tap(() => deleteCookie(c, COOKIE.ACCESS)),
      Effect.tap(() => deleteCookie(c, COOKIE.REFRESH)),
      Effect.andThen(() =>
        ResponseSchema.parse({
          data: "ok",
          message: "signout  success",
        }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
