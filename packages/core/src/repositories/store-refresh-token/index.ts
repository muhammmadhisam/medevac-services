import type { RefreshTokenId } from "@/core/types";
import type { Effect } from "effect";
import type { NoSuchElementException } from "effect/Cause";
import type * as Type from "../../schema/store-refresh-token";
import type * as Error from "../../types/errors/store-refresh-token";

export type TypeStoreRefreshTokenRepository = {
  create: (
    data: Type.TypeStoreRefreshTokenCreate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.CreateError>;
  update: (
    id: RefreshTokenId,
    data: Type.TypeStoreRefreshTokenUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.UpdateError>;
  remove: (
    id: RefreshTokenId,
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
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<number, Error.CountError>;
};
