import type {
  TypeFailResponse,
  TypeSignIn,
  TypeToken,
} from "@/core/types/index.js";
import type { TypeUserRepository } from "@/core/types/repositories/index.js";
import type { TypeJwtService } from "@/core/types/services/index.js";
import { verifyPassword } from "@/core/helpers/password.js";
import {
  TokenSchema,
  TypeFailResponseError,
  UserJwtSchema,
  UsersId,
} from "@/core/types/index.js";
import { Effect } from "effect";
import { passwordIncorrect } from "./password-incorrect.js";

type Param = {
  UsersRepo: TypeUserRepository;
  JwtService: TypeJwtService;
};

export default ({ JwtService, UsersRepo }: Param) => {
  return (data: TypeSignIn): Effect.Effect<TypeToken, TypeFailResponse> => {
    return Effect.Do.pipe(
      Effect.flatMap(() => UsersRepo.getOne({ username: data.username })),
      Effect.tap(({ password: hash_pasword }) =>
        verifyPassword(hash_pasword)(data.password).pipe(
          Effect.flatMap(verify =>
            Effect.if(verify, {
              onFalse: () => passwordIncorrect(),
              onTrue: () => Effect.void,
            }),
          ),
        ),
      ),
      Effect.let("user", user => UserJwtSchema.parse(user)),
      Effect.let("user_id", ({ user }) => UsersId(user.id)),
      Effect.bind("access_token", ({ user, user_id }) =>
        JwtService.genAccessToken({
          exp: Math.floor(Date.now() / 1000) + 60 * 5,
          user,
          user_id,
        })),
      Effect.bind("refresh_tokens", ({ user_id }) =>
        JwtService.genRefreshToken({
          exp: Math.floor(Date.now() / 1000) + 60 * 5,
          user_id,
        })),
      Effect.andThen(({ access_token, refresh_tokens }) =>
        TokenSchema.parse({ access_token, refresh_token: refresh_tokens }),
      ),
      Effect.catchTags({
        GetOneUsersError: () =>
          Effect.fail(TypeFailResponseError.new("query data fail")(null)),
        HashPasswordError: () => passwordIncorrect(),
        NoSuchElementException: () => passwordIncorrect(),
      }),
    );
  };
};
