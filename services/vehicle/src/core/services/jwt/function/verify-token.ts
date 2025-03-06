import type { TypeFailResponse, TypeToken } from "@/core/types/index.js";

import { Effect } from "effect";
import verifyAccessToken from "./verify-access-token.js";

import verifyRefreshToken from "./verify-refresh-token.js";

export default (data: TypeToken): Effect.Effect<boolean, TypeFailResponse> => {
  return Effect.all([
    verifyRefreshToken(data.refresh_token),
    verifyAccessToken(data.access_token),
  ]).pipe(Effect.andThen(() => Effect.succeed(true)));
};
