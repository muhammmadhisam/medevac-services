import type {
  RefreshTokenId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { TypeStoreRefreshTokenRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeStoreRefreshTokenCreate,
  TypeStoreRefreshTokenUpdate,
} from "@/core/types/schema/store-refresh-token";
import type {} from "@/core/types/services";

import type { TypeStoreRefreshTokenService } from "@/core/types/services/store-refresh-token";
import { StoreRefreshTokensRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({
  StoreRefreshTokenRepo,
}: {
  StoreRefreshTokenRepo: TypeStoreRefreshTokenRepository;
}) {
  return {
    create(
      data: TypeStoreRefreshTokenCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return StoreRefreshTokenRepo.create(data).pipe(
        Effect.catchTags({
          CreateStoreRefreshTokenError: error =>
            Effect.fail(TypeFailResponseError.new("เพิ่มข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeGetAllData<TypeReturnItem>, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("data", () =>
          StoreRefreshTokenRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllStoreRefreshTokenError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมูลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          StoreRefreshTokenRepo.count(param.where).pipe(
            Effect.catchTags({
              CountStoreRefreshTokenError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return StoreRefreshTokenRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneStoreRefreshTokenError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมูล")(error, 404)),
        }),
      );
    },
    getOneById(
      id: RefreshTokenId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return StoreRefreshTokenRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneStoreRefreshTokenError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    getOneOrCreate(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return StoreRefreshTokenRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneStoreRefreshTokenError: e =>
            Effect.fail(
              TypeFailResponseError.new("query data StoreRefreshToken fail")(e),
            ),
          NoSuchElementException: () =>
            this.create({
              refresh_token: "",
              user: { connect: { id: param.user_id as string } },
            }),
        }),
      );
    },
    remove(
      id: RefreshTokenId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => StoreRefreshTokenRepo.remove(id)),
        Effect.catchTags({
          RemoveStoreRefreshTokenError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: RefreshTokenId,
      data: TypeStoreRefreshTokenUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => StoreRefreshTokenRepo.update(id, data)),
        Effect.catchTags({
          UpdateStoreRefreshTokenError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeStoreRefreshTokenService;
}
export class StoreRefreshTokenServiceContext extends Context.Tag(
  "service-StoreRefreshToken",
)<StoreRefreshTokenServiceContext, TypeStoreRefreshTokenService>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      StoreRefreshTokenRepo: StoreRefreshTokensRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
