import type {
  TypeFailResponse,
  TypeSignUp,
  TypeToken,
  TypeUserJwt,
} from "@/core/types/index.js";
import type { TypeUserRepository } from "@/core/types/repositories/index.js";
import type { TypeReturnItem } from "@/core/types/schema/users/index.js";
import type {
  TypeAuthService,
  TypeJwtService,
} from "@/core/types/services/index.js";
import { hashPassword } from "@/core/helpers/index.js";
import { TypeFailResponseError } from "@/core/types/index.js";
import { Context, Effect, Layer } from "effect";
import { UsersRepositoryContext } from "../../repository/index.js";
import { JwtServiceContext } from "../jwt/jwt.service.js";
import signIn from "./function/sign-in.js";

function init({
  JwtService,
  UsersRepo,
}: {
  UsersRepo: TypeUserRepository;
  JwtService: TypeJwtService;
}) {
  return {
    me: (token: TypeToken): Effect.Effect<TypeUserJwt, TypeFailResponse> =>
      JwtService.verifyTokenAndReturnJwtObject(token),
    signIn: signIn({ JwtService, UsersRepo }),
    signUp(data: TypeSignUp): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("password", () => hashPassword(data.password)),
        Effect.flatMap(({ password }) =>
          UsersRepo.create({ ...data, password, role: undefined }),
        ),
        Effect.catchTags({
          CreateUsersError: () =>
            Effect.fail(TypeFailResponseError.new("create user fail")(null)),
          HashPasswordError: () =>
            Effect.fail(
              TypeFailResponseError.new(
                "create user error  becuse hash password  fail ",
              )(null),
            ),
        }),
      );
    },
  } satisfies TypeAuthService;
}
export class AuthServiceContext extends Context.Tag("service-auth")<
  AuthServiceContext,
  TypeAuthService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      JwtService: JwtServiceContext,
      UsersRepo: UsersRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
