import type {
  RefreshTokenId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { Effect } from "effect";
import type * as Type from "../../schema/store-refresh-token";

export type TypeStoreRefreshTokenService = {
  create: (
    data: Type.TypeStoreRefreshTokenCreate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  update: (
    id: RefreshTokenId,
    data: Type.TypeStoreRefreshTokenUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  remove: (
    id: RefreshTokenId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOneById: (
    id: RefreshTokenId,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<TypeGetAllData<Type.TypeReturnItem>, TypeFailResponse>;
  getOneOrCreate: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<Type.TypeReturnItem, TypeFailResponse>;
};
