import type { SubMissionTagId } from "@/core/types";
import type { TypeSubMissionTagRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeSubMissionTagCreate,
  TypeSubMissionTagUpdate,
} from "@/core/types/schema/sub-mission-tag";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/sub-mission-tag";
import { SubMissionTagItemSchema } from "@/core/types/schema/sub-mission-tag";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get SubMissionTags count error"),
        try: async () => await db.subMissionTag.count(),
      });
    },
    create(
      data: TypeSubMissionTagCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create SubMissionTags error"),
        try: async () => await db.subMissionTag.create({ data }),
      }).pipe(Effect.andThen(SubMissionTagItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  SubMissionTags all error"),
        try: async () =>
          await db.subMissionTag.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where, delete_date: null },
          }),
      }).pipe(Effect.andThen(SubMissionTagItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  SubMissionTags one error"),
        try: async () =>
          await db.subMissionTag.findFirst({
            where: { ...where, delete_date: null },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(SubMissionTagItemSchema.parse),
      );
    },
    remove(
      id: SubMissionTagId,
    ): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete SubMissionTags error"),
        try: async () =>
          await db.subMissionTag.update({
            data: { delete_date: new Date() },
            where: { id },
          }),
      }).pipe(Effect.andThen(SubMissionTagItemSchema.parse));
    },
    update(
      id: SubMissionTagId,
      data: TypeSubMissionTagUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update SubMissionTags error"),
        try: async () =>
          await db.subMissionTag.update({
            data,
            where: { delete_date: null, id },
          }),
      }).pipe(Effect.andThen(SubMissionTagItemSchema.parse));
    },
  } satisfies TypeSubMissionTagRepository;
}
export class SubMissionTagRepositoryContext extends Context.Tag(
  "repository-sub-missions-tag",
)<SubMissionTagRepositoryContext, TypeSubMissionTagRepository>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
