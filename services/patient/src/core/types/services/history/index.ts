import type { HistoryId, TypeFailResponse, TypeGetAllData } from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/history";

export type TypeHistoryService = {
  create: (
    data: Type.TypeHistoryCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: HistoryId,
    data: Type.TypeHistoryUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (
    id: HistoryId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: HistoryId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
};
