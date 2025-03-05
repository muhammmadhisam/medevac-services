import type { TypeJwtObject } from "@/core/types";
import { GetEnv } from "@/core/env";

import { AccessToken, TypeFailResponseError } from "@/core/types";

import * as Errors from "@/core/types/errors/jwt";
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
