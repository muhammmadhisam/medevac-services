import type {
  TypeFailResponse,
  TypeSignIn,
  TypeToken,
} from "@/core/types/index.js";
import type { TypeUserRepository } from "@/core/types/repositories/index.js";
import type { TypeJwtService } from "@/core/types/services/index.js";

import { verifyPassword } from "@/core/helpers/password.js";
import {
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
      Effect.andThen(({ user, user_id }) =>
        JwtService.generateToken({
          exp: Math.floor(Date.now() / 1000) + 60 * 5,
          user,
          user_id,
        }),
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
