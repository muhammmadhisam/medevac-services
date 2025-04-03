import type {
  SubMissionTagId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/sub-mission-tag";

export type TypeSubMissionTagService = {
  create: (
    data: Type.TypeSubMissionTagCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: SubMissionTagId,
    data: Type.TypeSubMissionTagUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (
    id: SubMissionTagId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: SubMissionTagId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
};
