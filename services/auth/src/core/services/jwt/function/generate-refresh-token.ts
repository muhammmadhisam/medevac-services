import type { TypeRefreshTokenObject } from "@/core/types";

import { GetEnv } from "@/core/env";
import { RefreshToken, TypeFailResponseError } from "@/core/types";

import * as Errors from "@/core/types/errors/jwt";
import { Effect } from "effect";
import { sign } from "hono/jwt";
import tapCreateItemStoreRefreshToken from "../../tap/tap-create-item-store-refresh-token";

export default (data: TypeRefreshTokenObject) =>
  Effect.Do.pipe(
    Effect.flatMap(() =>
      Effect.tryPromise({
        catch: Errors.GenRefreshTokenError.new(
          "generate refresh token jwt is Fail",
        ),
        try: () => sign(data, GetEnv().SECRET_TOKEN),
      }),
    ),
    Effect.map(jwt => RefreshToken(jwt)),
    Effect.flatMap(refresh_token =>
      tapCreateItemStoreRefreshToken(data.user_id, refresh_token),
    ),
    Effect.andThen(({ refresh_token }) => RefreshToken(refresh_token)),
    Effect.catchTags({
      CreateStoreRefreshTokenError: e =>
        Effect.fail(TypeFailResponseError.new(e.message)(e)),
      GenRefreshTokenError: e =>
        Effect.fail(TypeFailResponseError.new(e.message)(e)),
      GetOneStoreRefreshTokenError: e =>
        Effect.fail(TypeFailResponseError.new(e.message)(e)),
      RemoveStoreRefreshTokenError: e =>
        Effect.fail(TypeFailResponseError.new(e.message)(e)),
    }),
  );
