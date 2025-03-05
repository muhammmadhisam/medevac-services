import type { AccessToken } from "@/core/types";

import { GetEnv } from "@/core/env";
import { JwtObjectSchema, TypeFailResponseError } from "@/core/types";

import * as Errors from "@/core/types/errors/jwt";
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
    Effect.map((paload) => JwtObjectSchema.parse(paload)),
    Effect.catchTags({
      VerifyAccessTokenError: (e) =>
        Effect.fail(TypeFailResponseError.new("Unauthorized")(e, 401)),
    }),
  );
