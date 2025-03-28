import type {
  RefreshTokenId,
  TypeStoreRefreshTokenRepository,
} from "@medevac/core";
import type {
  StoreRefreshTokenItemSchema,
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  type TypeStoreRefreshTokenCreate,
  type TypeStoreRefreshTokenUpdate,
} from "@medevac/core/schema/store-refresh-token";
import type { PrismaClient } from "@medevac/repo-auth";
import type { NoSuchElementException } from "effect/Cause";
import * as Errors from "@medevac/core/error/store-refresh-token";
import { Context, Effect, Layer } from "effect";
import { DatabaseLayer } from "../../databases/index.js";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get StoreRefreshTokens count error"),
        try: async () => await db.storeRefreshToken.count(),
      });
    },
    create(
      data: TypeStoreRefreshTokenCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create StoreRefreshTokens error"),
        try: async () => await db.storeRefreshToken.create({ data }),
      }).pipe(Effect.andThen(StoreRefreshTokenItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  StoreRefreshTokens all error"),
        try: async () =>
          await db.storeRefreshToken.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(StoreRefreshTokenItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  StoreRefreshTokens one error"),
        try: async () =>
          await db.storeRefreshToken.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(StoreRefreshTokenItemSchema.parse),
      );
    },
    remove(
      id: RefreshTokenId,
    ): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete StoreRefreshTokens error"),
        try: async () => await db.storeRefreshToken.delete({ where: { id } }),
      }).pipe(Effect.andThen(StoreRefreshTokenItemSchema.parse));
    },
    update(
      id: RefreshTokenId,
      data: TypeStoreRefreshTokenUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update StoreRefreshTokens error"),
        try: async () =>
          await db.storeRefreshToken.update({ data, where: { id } }),
      }).pipe(Effect.andThen(StoreRefreshTokenItemSchema.parse));
    },
  } satisfies TypeStoreRefreshTokenRepository;
}
export class StoreRefreshTokensRepositoryContext extends Context.Tag(
  "repository-StoreRefreshTokens",
)<StoreRefreshTokensRepositoryContext, TypeStoreRefreshTokenRepository>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield * DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
