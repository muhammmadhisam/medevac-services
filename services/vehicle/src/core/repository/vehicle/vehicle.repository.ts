import type { VehicleId } from "@/core/types";
import type { TypeVehicleRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeVehicleCreate,
  TypeVehicleUpdate,
} from "@/core/types/schema/vehicle";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/vehicle";
import { VehicleItemSchema } from "@/core/types/schema/vehicle";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get Vehicles count error"),
        try: async () => await db.vehicle.count(),
      });
    },
    create(
      data: TypeVehicleCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create Vehicles error"),
        try: async () => await db.vehicle.create({ data }),
      }).pipe(Effect.andThen(VehicleItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  Vehicles all error"),
        try: async () =>
          await db.vehicle.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(VehicleItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  Vehicles one error"),
        try: async () =>
          await db.vehicle.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(VehicleItemSchema.parse),
      );
    },
    remove(id: VehicleId): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete Vehicles error"),
        try: async () => await db.vehicle.delete({ where: { id } }),
      }).pipe(Effect.andThen(VehicleItemSchema.parse));
    },
    update(
      id: VehicleId,
      data: TypeVehicleUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update Vehicles error"),
        try: async () => await db.vehicle.update({ data, where: { id } }),
      }).pipe(Effect.andThen(VehicleItemSchema.parse));
    },
  } satisfies TypeVehicleRepository;
}
export class VehiclesRepositoryContext extends Context.Tag(
  "repository-vehicle",
)<VehiclesRepositoryContext, TypeVehicleRepository>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
