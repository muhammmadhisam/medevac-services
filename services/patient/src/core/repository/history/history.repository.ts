import type { HistoryId } from "@/core/types";
import type { TypeHistoryRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeHistoryCreate,
  TypeHistoryUpdate,
  TypeReturnItem,
} from "@/core/types/schema/history";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/history";
import { HistoryItemSchema } from "@/core/types/schema/history";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get History count error"),
        try: async () => await db.history.count(),
      });
    },
    create(
      data: TypeHistoryCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create History error"),
        try: async () => await db.history.create({ data }),
      }).pipe(Effect.andThen(HistoryItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  History all error"),
        try: async () =>
          await db.History.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(HistoryItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  History one error"),
        try: async () =>
          await db.history.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(HistoryItemSchema.parse),
      );
    },
    remove(id: HistoryId): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete History error"),
        try: async () => await db.history.delete({ where: { id } }),
      }).pipe(Effect.andThen(HistoryItemSchema.parse));
    },
    update(
      id: HistoryId,
      data: TypeHistoryUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update History error"),
        try: async () => await db.history.update({ data, where: { id } }),
      }).pipe(Effect.andThen(HistoryItemSchema.parse));
    },
  } satisfies TypeHistoryRepository;
}
export class HistoryRepositoryContext extends Context.Tag("repository-history")<
  HistoryRepositoryContext,
  TypeHistoryRepository
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
