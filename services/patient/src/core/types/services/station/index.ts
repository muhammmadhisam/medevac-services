import type {
  StationPatientId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/station";

export type TypeStationPatientService = {
  create: (
    data: Type.TypeStationPatientCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: StationPatientId,
    data: Type.TypeStationPatientUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (
    id: StationPatientId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: StationPatientId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
};
