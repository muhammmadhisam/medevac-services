import type { Effect } from "effect"
import type { NoSuchElementException } from "effect/Cause"
import type * as Type from "../../schema/users"

import type * as Error from "../../types/errors/users"
import type { UsersId } from "../../types/private"

export type TypeUserRepository = {
  create: (
    data: Type.TypeUserCreate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.CreateError>
  update: (
    id: UsersId,
    data: Type.TypeUserUpdate,
  ) => Effect.Effect<Type.TypeReturnItem, Error.UpdateError>
  remove: (
    id: UsersId,
  ) => Effect.Effect<Type.TypeReturnItem, Error.RemoveError>
  getAll: (
    param: Type.TypeGetAllParam,
  ) => Effect.Effect<Type.TypeReturnItem, Error.GetAllError>
  getOne: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<
    Type.TypeReturnItem,
    Error.GetOneError | NoSuchElementException
  >
  count: (
    param: Type.TypeGetOneParam,
  ) => Effect.Effect<number, Error.CountError>
}
