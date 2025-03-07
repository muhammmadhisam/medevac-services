import type { TypeApplication } from "@/core/configs/create-application";
import { COOKIE } from "@/core/constants";
import {
  TOKEN_ACCESS_TIME,
  TOKEN_REFRESH_TIME,
} from "@/core/constants/token-time";
import { ServicesRuntime } from "@/core/runtime";
import { AuthServiceContext } from "@/core/services/auth";
import {
  FailResponseSchema,
  RefreshToken,
  SuccessResponseSchema,
} from "@/core/types";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { getCookie, setCookie } from "hono/cookie";
import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(z.string().default("ok"));

const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Generate Refresh Token Success",
    },
    401: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Generate Refresh Token Fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Generate Refresh Token  Error",
    },
  },
  tags: ["Authentication"],
});

export default (app: TypeApplication) =>
  app.get("/refresh-token", Docs, async (c) => {
    const refresh_token = getCookie(c, COOKIE.REFRESH);
    if (!refresh_token)
      return c.json({ data: "unauthorization" }, { status: 401 });
    // const user = c.get("user");
    // if (!user)
    //   return c.json({ message: "nofound user in context" }, { status: 401 });
    const program = AuthServiceContext.pipe(
      Effect.andThen(service =>
        service.newRefreshToken(RefreshToken(refresh_token)),
      ),
      Effect.tap(({ access_token }) =>
        setCookie(c, COOKIE.ACCESS, access_token, {
          httpOnly: true,
          maxAge: TOKEN_ACCESS_TIME,
          sameSite: "Lax",
        }),
      ),
      Effect.tap(({ refresh_token }) =>
        setCookie(c, COOKIE.REFRESH, refresh_token, {
          httpOnly: true,
          maxAge: TOKEN_REFRESH_TIME,
          sameSite: "Lax",
        }),
      ),
      Effect.andThen(() =>
        ResponseSchema.parse({
          data: "ok",
          message: "generate new refresh token success",
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
