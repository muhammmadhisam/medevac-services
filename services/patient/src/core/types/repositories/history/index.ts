import type { HistoryId } from "@/core/types";
import type * as Error from "@/core/types/errors/history";
import type { Effect } from "effect";
import type { NoSuchElementException } from "effect/Cause";
import type * as Type from "../../schema/history";

export type TypeHistoryRepository = {
  create: (
    data: Type.TypeHistoryCreate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.CreateError>;
  update: (
    id: HistoryId,
    data: Type.TypeHistoryUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.UpdateError>;
  remove: (
    id: HistoryId,
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
