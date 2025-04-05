import type { JoinerMissionId } from "@/core/types";
import type * as Error from "@/core/types/errors/joiner";
import type { Effect } from "effect";
import type { NoSuchElementException } from "effect/Cause";
import type * as Type from "../../schema/joiner";

export type TypeJoinerRepository = {
  create: (
    data: Type.TypeJoinerCreate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.CreateError>;
  update: (
    id: JoinerMissionId,
    data: Type.TypeJoinerUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.UpdateError>;
  remove: (
    id: JoinerMissionId,
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
