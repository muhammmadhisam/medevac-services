import type { TypeFailResponse, TypeGetAllData, VehicleId } from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/vehicle";

export type TypeVehicleService = {
  create: (
    data: Type.TypeVehicleCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: VehicleId,
    data: Type.TypeVehicleUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (
    id: VehicleId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: VehicleId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
};
