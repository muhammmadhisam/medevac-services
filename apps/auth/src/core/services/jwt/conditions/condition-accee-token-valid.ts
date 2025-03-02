import type { TypeToken } from "@medevac/core";

import { TypeFailResponseError } from "@medevac/core";
import { Effect } from "effect";
import verifyAccessToken from "../function/verify-access-token.js";
import verifyToken from "../function/verify-token.js";

export default (data: TypeToken) =>
  verifyToken(data).pipe(
    Effect.flatMap(verify =>
      Effect.if(verify, {
        onFalse: () =>
          Effect.fail(TypeFailResponseError.new("Unauthorized")(null, 401)),
        onTrue: () =>
          verifyAccessToken(data.access_token).pipe(
            Effect.andThen(v => v.user),
          ),
      }),
    ),
  );
