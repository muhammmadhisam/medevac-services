import type {
  RefreshToken,
  TypeFailResponse,
  TypeSignIn,
  TypeSignUp,
  TypeToken,
  UsersId,
} from "@/core/types/index.js";
import type { TypeUserJwt } from "@/core/types/jwt/index.js";
import type { UsersOptionalDefaults } from "@schema/index";

import type { Effect } from "effect";

export type TypeAuthService = {
  signIn: (data: TypeSignIn) => Effect.Effect<TypeToken, TypeFailResponse>;
  signUp: (
    data: TypeSignUp,
  ) => Effect.Effect<UsersOptionalDefaults, TypeFailResponse>;
  me: (token: TypeToken) => Effect.Effect<TypeUserJwt, TypeFailResponse>;
  newRefreshToken: (
    refresh_token: RefreshToken,
  ) => Effect.Effect<TypeToken, TypeFailResponse>;
  signOut: (user_id: UsersId) => Effect.Effect<void, TypeFailResponse>;
};
