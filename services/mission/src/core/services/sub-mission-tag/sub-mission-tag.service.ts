import type {
  SubMissionTagId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { TypeSubMissionTagRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeSubMissionTagCreate,
  TypeSubMissionTagUpdate,
} from "@/core/types/schema/sub-mission-tag";
import type { TypeSubMissionTagService } from "@/core/types/services";
import { SubMissionTagRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({
  SubMissionTagRepo,
}: {
  SubMissionTagRepo: TypeSubMissionTagRepository;
}) {
  return {
    create(
      data: TypeSubMissionTagCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return SubMissionTagRepo.create(data).pipe(
        Effect.catchTags({
          CreateSubMissionTagError: error =>
            Effect.fail(
              TypeFailResponseError.new("เพิ่มข้อมุลภารกิจล้มเหลว")(error),
            ),
        }),
      );
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeGetAllData<TypeReturnItem>, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("data", () =>
          SubMissionTagRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllSubMissionTagError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          SubMissionTagRepo.count(param.where).pipe(
            Effect.catchTags({
              CountSubMissionTagError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error),
                ),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return SubMissionTagRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneSubMissionTagError: error =>
            Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    getOneById(
      id: SubMissionTagId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return SubMissionTagRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneSubMissionTagError: error =>
            Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(
      id: SubMissionTagId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => SubMissionTagRepo.remove(id)),
        Effect.catchTags({
          RemoveSubMissionTagError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: SubMissionTagId,
      data: TypeSubMissionTagUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => SubMissionTagRepo.update(id, data)),
        Effect.catchTags({
          UpdateSubMissionTagError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeSubMissionTagService;
}
export class SubMissionTagServiceContext extends Context.Tag(
  "service-sub-mission",
)<SubMissionTagServiceContext, TypeSubMissionTagService>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      SubMissionTagRepo: SubMissionTagRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
