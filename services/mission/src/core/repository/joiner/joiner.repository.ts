import type { JoinerMissionId } from "@/core/types";
import type { TypeJoinerRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeJoinerCreate,
  TypeJoinerUpdate,
  TypeReturnItem,
} from "@/core/types/schema/joiner";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/joiner";
import { JoinerItemSchema } from "@/core/types/schema/joiner";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get Joiners count error"),
        try: async () => await db.joiner.count(),
      });
    },
    create(
      data: TypeJoinerCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create Joiners error"),
        try: async () => await db.joiner.create({ data }),
      }).pipe(Effect.andThen(JoinerItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  joiner all error"),
        try: async () =>
          await db.joiner.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(JoinerItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  Joiners one error"),
        try: async () =>
          await db.joiner.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(JoinerItemSchema.parse),
      );
    },
    remove(
      id: JoinerMissionId,
    ): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete Joiners error"),
        try: async () =>
          await db.joiner.delete({
            where: { id },
          }),
      }).pipe(Effect.andThen(JoinerItemSchema.parse));
    },
    update(
      id: JoinerMissionId,
      data: TypeJoinerUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update Joiners error"),
        try: async () =>
          await db.joiner.update({
            data,
            where: { id },
          }),
      }).pipe(Effect.andThen(JoinerItemSchema.parse));
    },
  } satisfies TypeJoinerRepository;
}
export class JoinerRepositoryContext extends Context.Tag("repository-joinner")<
  JoinerRepositoryContext,
  TypeJoinerRepository
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
