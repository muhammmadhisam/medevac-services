import type { TypeUserRepository, UsersId } from "@medevac/core";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeUserCreate,
  TypeUserUpdate,
} from "@medevac/core/schema/users";

import type { PrismaClient } from "@medevac/repo-auth";
import type { NoSuchElementException } from "effect/Cause";
import * as Errors from "@medevac/core/error/users";
import { UserItemSchema } from "@medevac/core/schema/users";
import { Context, Effect, Layer } from "effect";
import { DatabaseLayer } from "../../databases/index.js";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get Users count error"),
        try: async () => await db.users.count(),
      });
    },
    create(
      data: TypeUserCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create Users error"),
        try: async () => await db.users.create({ data }),
      }).pipe(Effect.andThen(UserItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  Users all error"),
        try: async () =>
          await db.users.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where, delete_date: null },
          }),
      }).pipe(Effect.andThen(UserItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  Users one error"),
        try: async () =>
          await db.users.findFirst({
            where: { ...where, delete_date: null },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(UserItemSchema.parse),
      );
    },
    remove(id: UsersId): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete Users error"),
        try: async () =>
          await db.users.update({
            data: { delete_date: new Date() },
            where: { delete_date: null, id: id as unknown as string },
          }),
      }).pipe(Effect.andThen(UserItemSchema.parse));
    },
    update(
      id: UsersId,
      data: TypeUserUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update Users error"),
        try: async () =>
          await db.users.update({
            data,
            where: { delete_date: null, id: id as unknown as string },
          }),
      }).pipe(Effect.andThen(UserItemSchema.parse));
    },
  } satisfies TypeUserRepository;
}
export class UsersRepositoryContext extends Context.Tag("repository-users")<
  UsersRepositoryContext,
  TypeUserRepository
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield * DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
