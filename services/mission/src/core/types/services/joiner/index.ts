import type {
  JoinerMissionId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/joiner";

export type TypeJoinerService = {
  create: (
    data: Type.TypeJoinerCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: JoinerMissionId,
    data: Type.TypeJoinerUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (
    id: JoinerMissionId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: JoinerMissionId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
};
