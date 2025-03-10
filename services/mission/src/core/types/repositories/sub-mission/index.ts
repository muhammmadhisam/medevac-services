import type { SubMissionId } from "@/core/types";
import type * as Error from "@/core/types/errors/sub-mission";
import type { Effect } from "effect";
import type { NoSuchElementException } from "effect/Cause";
import type * as Type from "../../schema/sub-mission";

export type TypeSubMissionRepository = {
  create: (
    data: Type.TypeSubMissionCreate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.CreateError>;
  update: (
    id: SubMissionId,
    data: Type.TypeSubMissionUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.UpdateError>;
  remove: (
    id: SubMissionId,
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
