import type { SubMissionId } from "@/core/types";
import type { TypeSubMissionRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeSubMissionCreate,
  TypeSubMissionUpdate,
} from "@/core/types/schema/sub-mission";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/sub-mission";
import { SubMissionItemSchema } from "@/core/types/schema/sub-mission";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get SubMissions count error"),
        try: async () => await db.subMission.count(),
      });
    },
    create(
      data: TypeSubMissionCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create SubMissions error"),
        try: async () => await db.subMission.create({ data }),
      }).pipe(Effect.andThen(SubMissionItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  SubMissions all error"),
        try: async () =>
          await db.subMission.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where, delete_date: null },
          }),
      }).pipe(Effect.andThen(SubMissionItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  SubMissions one error"),
        try: async () =>
          await db.subMission.findFirst({
            where: { ...where, delete_date: null },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(SubMissionItemSchema.parse),
      );
    },
    remove(
      id: SubMissionId,
    ): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete SubMissions error"),
        try: async () =>
          await db.subMission.update({
            data: { delete_date: new Date() },
            where: { id },
          }),
      }).pipe(Effect.andThen(SubMissionItemSchema.parse));
    },
    update(
      id: SubMissionId,
      data: TypeSubMissionUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update SubMissions error"),
        try: async () =>
          await db.subMission.update({
            data,
            where: { delete_date: null, id },
          }),
      }).pipe(Effect.andThen(SubMissionItemSchema.parse));
    },
  } satisfies TypeSubMissionRepository;
}
export class SubMissionsRepositoryContext extends Context.Tag(
  "repository-sub-missions",
)<SubMissionsRepositoryContext, TypeSubMissionRepository>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
