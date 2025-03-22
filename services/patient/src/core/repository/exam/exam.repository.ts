import type { ExamId } from "@/core/types";
import type { TypeExamRepository } from "@/core/types/repositories";
import type {
  TypeExamCreate,
  TypeExamUpdate,
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
} from "@/core/types/schema/exam";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/exam";
import { ExamItemSchema } from "@/core/types/schema/exam";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get Exams count error"),
        try: async () => await db.exam.count(),
      });
    },
    create(
      data: TypeExamCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create Exams error"),
        try: async () => await db.exam.create({ data }),
      }).pipe(Effect.andThen(ExamItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  Exams all error"),
        try: async () =>
          await db.exam.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(ExamItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  Exams one error"),
        try: async () =>
          await db.exam.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(ExamItemSchema.parse),
      );
    },
    remove(id: ExamId): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete Exams error"),
        try: async () => await db.exam.delete({ where: { id } }),
      }).pipe(Effect.andThen(ExamItemSchema.parse));
    },
    update(
      id: ExamId,
      data: TypeExamUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update Exams error"),
        try: async () => await db.exam.update({ data, where: { id } }),
      }).pipe(Effect.andThen(ExamItemSchema.parse));
    },
  } satisfies TypeExamRepository;
}
export class ExamRepositoryContext extends Context.Tag("repository-exam")<
  ExamRepositoryContext,
  TypeExamRepository
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
