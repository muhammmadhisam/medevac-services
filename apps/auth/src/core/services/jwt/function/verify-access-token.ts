import type { AccessToken } from "@medevac/core";
import { GetEnv } from "@medevac/configs";
import { JwtObjectSchema, TypeFailResponseError } from "@medevac/core";

import * as Errors from "@medevac/core/error/jwt";
import { Effect } from "effect";
import { verify } from "hono/jwt";

export default (data: AccessToken) =>
  Effect.Do.pipe(
    Effect.flatMap(() =>
      Effect.tryPromise({
        catch: Errors.VerifyAccessTokenError.new(
          "verify access token  is Fail",
        ),
        try: () => verify(data, GetEnv().SECRET_TOKEN),
      }),
    ),
    Effect.map(paload => JwtObjectSchema.parse(paload)),
    Effect.catchTags({
      VerifyAccessTokenError: e =>
        Effect.fail(TypeFailResponseError.new("Unauthorized")(e, 401)),
    }),
  );
