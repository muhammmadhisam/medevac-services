import type { TypeJwtObject } from "@medevac/core";
import { GetEnv } from "@medevac/configs";
import { AccessToken, TypeFailResponseError } from "@medevac/core";
import * as Errors from "@medevac/core/error/jwt";
import { Effect } from "effect";
import { sign } from "hono/jwt";

export default (data: TypeJwtObject) =>
  Effect.Do.pipe(
    Effect.flatMap(() =>
      Effect.tryPromise({
        catch: Errors.GenAccessTokenError.new("generate token jwt is Fail"),
        try: () => sign(data, GetEnv().SECRET_TOKEN),
      }),
    ),
    Effect.map(jwt => AccessToken(jwt)),
    Effect.catchTags({
      GenAccessTokenError: e =>
        Effect.fail(TypeFailResponseError.new(e.message)(e)),
    }),
  );
