import type { TypeRefreshTokenObject } from "@medevac/core";
import { Effect } from "effect";
import tapGetUserByUserId from "../../tap/tap-get-user-by-user-id.js";

type Params = {
  refresh_token_obj: TypeRefreshTokenObject;
};

export default ({ refresh_token_obj }: Params) =>
  Effect.Do.pipe(
    Effect.tap(() => tapGetUserByUserId(refresh_token_obj.user_id)),
    Effect.andThen(() => Effect.succeed(true)),
    Effect.catchAll(() => Effect.succeed(false)),
  );
