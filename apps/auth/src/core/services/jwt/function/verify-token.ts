import type { TypeFailResponse, TypeToken } from "@medevac/core";

import { Effect } from "effect";
import conditionUserIdInRefreshTokenValid from "../conditions/condition-user-id-in-refresh-token-valid.js";
import verifyAccessToken from "./verify-access-token.js";
import verifyRefreshToken from "./verify-refresh-token.js";

export default (data: TypeToken): Effect.Effect<boolean, TypeFailResponse> => {
  return Effect.all([
    verifyRefreshToken(data.refresh_token),
    verifyAccessToken(data.access_token),
  ]).pipe(
    Effect.flatMap(([refresh_token_obj]) =>
      conditionUserIdInRefreshTokenValid({ refresh_token_obj }),
    ),
  );
};
