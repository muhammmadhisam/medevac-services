import type { StationPatientId } from "@/core/types";
import type { TypeStationPatientRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeStationPatientCreate,
  TypeStationPatientUpdate,
} from "@/core/types/schema/station";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/station";
import { StationPatientItemSchema } from "@/core/types/schema/station";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get StationPatients count error"),
        try: async () => await db.stationPatient.count(),
      });
    },
    create(
      data: TypeStationPatientCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create StationPatients error"),
        try: async () => await db.stationPatient.create({ data }),
      }).pipe(Effect.andThen(StationPatientItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  StationPatients all error"),
        try: async () =>
          await db.stationPatient.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(StationPatientItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  StationPatients one error"),
        try: async () =>
          await db.stationPatient.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(StationPatientItemSchema.parse),
      );
    },
    remove(
      id: StationPatientId,
    ): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete StationPatients error"),
        try: async () => await db.stationPatient.delete({ where: { id } }),
      }).pipe(Effect.andThen(StationPatientItemSchema.parse));
    },
    update(
      id: StationPatientId,
      data: TypeStationPatientUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update StationPatients error"),
        try: async () =>
          await db.stationPatient.update({ data, where: { id } }),
      }).pipe(Effect.andThen(StationPatientItemSchema.parse));
    },
  } satisfies TypeStationPatientRepository;
}
export class StationPatientRepositoryContext extends Context.Tag(
  "repository-station-patient",
)<StationPatientRepositoryContext, TypeStationPatientRepository>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
