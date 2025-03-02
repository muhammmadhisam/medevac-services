import type { RefreshToken } from "@medevac/core";
import { GetEnv } from "@medevac/configs";
import { RefreshTokenObjectSchema, TypeFailResponseError } from "@medevac/core";
import * as Errors from "@medevac/core/error/jwt";
import { Effect } from "effect";
import { verify } from "hono/jwt";

export default (data: RefreshToken) =>
  Effect.Do.pipe(
    Effect.flatMap(() =>
      Effect.tryPromise({
        catch: Errors.VerifyAccessTokenError.new(
          "verify refresh token  is Fail",
        ),
        try: () => verify(data, GetEnv().SECRET_TOKEN),
      }),
    ),
    Effect.map(paload => RefreshTokenObjectSchema.parse(paload)),
    Effect.catchTags({
      VerifyAccessTokenError: e =>
        Effect.fail(TypeFailResponseError.new("Unauthorized")(e, 401)),
    }),
  );
