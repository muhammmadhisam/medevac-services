import type {
  RefreshToken,
  TypeFailResponse,
  TypeToken,
} from "@/core/types/index.js";
import type {
  TypeJwtObject,
  TypeRefreshTokenObject,
  TypeUserJwt,
} from "@/core/types/jwt/index.js";
import type { AccessToken } from "@/core/types/private/access-token.js";
import type { Effect } from "effect";

export type TypeJwtService = {
  verifyAccessToken: (
    data: AccessToken,
  ) => Effect.Effect<TypeJwtObject, TypeFailResponse>;

  verifyRefreshToken: (
    data: RefreshToken,
  ) => Effect.Effect<TypeRefreshTokenObject, TypeFailResponse>;
  verifyToken: (data: TypeToken) => Effect.Effect<boolean, TypeFailResponse>;
  verifyTokenAndReturnJwtObject: (
    data: TypeToken,
  ) => Effect.Effect<TypeUserJwt, TypeFailResponse>;
};
