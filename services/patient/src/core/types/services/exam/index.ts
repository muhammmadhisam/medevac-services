import type { ExamId, TypeFailResponse, TypeGetAllData } from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/exam";

export type TypeExamService = {
  create: (
    data: Type.TypeExamCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: ExamId,
    data: Type.TypeExamUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (id: ExamId) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: ExamId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
};
