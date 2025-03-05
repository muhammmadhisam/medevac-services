import type { TypeJwtService } from "@/core/types/services/index.js";
import { Context, Effect, Layer } from "effect";
import conditionAcceeTokenValid from "./conditions/condition-accee-token-valid.js";

import verifyAccessToken from "./function/verify-access-token.js";
import verifyRefreshToken from "./function/verify-refresh-token.js";
import verifyToken from "./function/verify-token.js";

function init() {
  return Effect.succeed({
    verifyAccessToken,
    verifyRefreshToken,
    verifyToken,
    verifyTokenAndReturnJwtObject: conditionAcceeTokenValid,
  } satisfies TypeJwtService);
}

export class JwtServiceContext extends Context.Tag("service-jwt")<
  JwtServiceContext,
  TypeJwtService
>() {
  static Live = Layer.effect(this, init());
}
