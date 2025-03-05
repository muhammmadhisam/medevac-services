import type { MissionId } from "@/core/types";
import type { TypeMissionRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeMissionCreate,
  TypeMissionUpdate,
  TypeReturnItem,
} from "@/core/types/schema/mission";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/mission";
import { MissionItemSchema } from "@/core/types/schema/mission";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get Missions count error"),
        try: async () => await db.mission.count(),
      });
    },
    create(
      data: TypeMissionCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create Missions error"),
        try: async () => await db.mission.create({ data }),
      }).pipe(Effect.andThen(MissionItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  Missions all error"),
        try: async () =>
          await db.mission.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(MissionItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
      TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
    > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  Missions one error"),
        try: async () =>
          await db.mission.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(MissionItemSchema.parse),
      );
    },
    remove(id: MissionId): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete Missions error"),
        try: async () => await db.mission.delete({ where: { id } }),
      }).pipe(Effect.andThen(MissionItemSchema.parse));
    },
    update(
      id: MissionId,
      data: TypeMissionUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update Missions error"),
        try: async () => await db.mission.update({ data, where: { id } }),
      }).pipe(Effect.andThen(MissionItemSchema.parse));
    },
  } satisfies TypeMissionRepository;
}
export class MissionsRepositoryContext extends Context.Tag(
  "repository-Missions",
)<MissionsRepositoryContext, TypeMissionRepository>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
