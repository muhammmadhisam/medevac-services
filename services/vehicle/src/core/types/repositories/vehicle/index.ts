import type { VehicleId } from "@/core/types";
import type * as Error from "@/core/types/errors/vehicle";
import type { Effect } from "effect";
import type { NoSuchElementException } from "effect/Cause";
import type * as Type from "../../schema/vehicle";

export type TypeVehicleRepository = {
  create: (
    data: Type.TypeVehicleCreate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.CreateError>;
  update: (
    id: VehicleId,
    data: Type.TypeVehicleUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.UpdateError>;
  remove: (
    id: VehicleId,
  ) => Effect.Effect<Type.TypeReturnItem, Error.RemoveError>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<Type.TypeReturnItem[], Error.GetAllError>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<
    Type.TypeReturnItem,
    Error.GetOneError | NoSuchElementException
  >;
  count: (
    param?: Type.TypeGetOneParam,
  ) => Effect.Effect<number, Error.CountError>;
};
