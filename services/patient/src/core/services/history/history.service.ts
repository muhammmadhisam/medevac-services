import type { HistoryId, TypeFailResponse, TypeGetAllData } from "@/core/types";
import type { TypeHistoryRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeHistoryCreate,
  TypeHistoryUpdate,
  TypeReturnItem,
} from "@/core/types/schema/history";
import type { TypeHistoryService } from "@/core/types/services";
import { HistoryRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({ HistoryRepo }: { HistoryRepo: TypeHistoryRepository }) {
  return {
    create(
      data: TypeHistoryCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return HistoryRepo.create(data).pipe(
        Effect.catchTags({
          CreateHistoryError: error =>
            Effect.fail(TypeFailResponseError.new("เพิ่มข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeGetAllData<TypeReturnItem>, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("data", () =>
          HistoryRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllHistoryError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมูลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          HistoryRepo.count(param.where).pipe(
            Effect.catchTags({
              CountHistoryError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return HistoryRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneHistoryError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมูล")(error, 404)),
        }),
      );
    },
    getOneById(id: HistoryId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return HistoryRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneHistoryError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(id: HistoryId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => HistoryRepo.remove(id)),
        Effect.catchTags({
          RemoveHistoryError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: HistoryId,
      data: TypeHistoryUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => HistoryRepo.update(id, data)),
        Effect.catchTags({
          UpdateHistoryError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeHistoryService;
}
export class HistoryServiceContext extends Context.Tag("service-history")<
  HistoryServiceContext,
  TypeHistoryService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      HistoryRepo: HistoryRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
