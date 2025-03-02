import type {
  TypeFailResponse,
  TypeSignIn,
  TypeSignUp,
  TypeToken,
} from "@/core/types/index.js";
import type { TypeUserJwt } from "@/core/types/jwt/index.js";
import type { UsersOptionalDefaults } from "@medevac/schema-auth";

import type { Effect } from "effect";

export type TypeAuthService = {
  signIn: (data: TypeSignIn) => Effect.Effect<TypeToken, TypeFailResponse>;
  signUp: (
    data: TypeSignUp,
  ) => Effect.Effect<UsersOptionalDefaults, TypeFailResponse>;
  me: (token: TypeToken) => Effect.Effect<TypeUserJwt, TypeFailResponse>;
};
