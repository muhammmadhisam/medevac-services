import type {
  RefreshToken,
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
import type { TypeStoreRefreshTokenService } from "@/core/types/services/store-refresh-token/index.js";
import { hashPassword } from "@/core/helpers/index.js";
import {
  RefreshTokenId,
  TypeFailResponseError,
  UserJwtSchema,
  UsersId,
} from "@/core/types/index.js";
import { Context, Effect, Layer } from "effect";
import { UsersRepositoryContext } from "../../repository/index.js";
import { JwtServiceContext } from "../jwt/jwt.service.js";
import { StoreRefreshTokenServiceContext } from "../store-refresh-token/store-refresh-token.service.js";
import tapDuplicateUserByUsername from "../tap/tap-duplicate-user-by-username.js";
import signIn from "./function/sign-in.js";

function init({
  JwtService,
  StoreRefreshTokenService,
  UsersRepo,
}: {
  UsersRepo: TypeUserRepository;
  JwtService: TypeJwtService;
  StoreRefreshTokenService: TypeStoreRefreshTokenService;
}) {
  return {
    me: (token: TypeToken): Effect.Effect<TypeUserJwt, TypeFailResponse> =>
      JwtService.verifyTokenAndReturnJwtObject(token),
    newRefreshToken(
      refresh_token: RefreshToken,
    ): Effect.Effect<TypeToken, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.flatMap(() =>
          StoreRefreshTokenService.getOne({ refresh_token }),
        ),
        Effect.flatMap(({ user_id }) => UsersRepo.getOne({ id: user_id })),
        Effect.let("user", user => UserJwtSchema.parse(user)),
        Effect.let("user_id", ({ user }) => UsersId(user.id ?? 0)),
        Effect.andThen(({ user, user_id }) =>
          JwtService.generateToken({
            exp: Math.floor(Date.now() / 1000) + 60 * 5,
            user,
            user_id,
          }),
        ),
        Effect.catchAll(() =>
          Effect.fail(TypeFailResponseError.new("unauthorization")(null, 401)),
        ),
      );
    },
    signIn: signIn({ JwtService, UsersRepo }),
    signOut(user_id: UsersId): Effect.Effect<void, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.flatMap(() => StoreRefreshTokenService.getOne({ user_id })),
        Effect.tap(({ id }) =>
          StoreRefreshTokenService.remove(RefreshTokenId(id || "")),
        ),
        Effect.flatMap(() => Effect.void),
        Effect.catchAll(() =>
          Effect.fail(TypeFailResponseError.new("signout error")(null)),
        ),
      );
    },
    signUp(data: TypeSignUp): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => tapDuplicateUserByUsername(data.username)),
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
      StoreRefreshTokenService: StoreRefreshTokenServiceContext,
      UsersRepo: UsersRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
