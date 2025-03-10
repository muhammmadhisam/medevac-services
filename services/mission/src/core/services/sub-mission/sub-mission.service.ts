import type {
  SubMissionId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { TypeSubMissionRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeSubMissionCreate,
  TypeSubMissionUpdate,
} from "@/core/types/schema/sub-mission";
import type { TypeSubMissionService } from "@/core/types/services";
import { SubMissionsRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({
  SubMissionRepo,
}: {
  SubMissionRepo: TypeSubMissionRepository;
}) {
  return {
    create(
      data: TypeSubMissionCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return SubMissionRepo.create(data).pipe(
        Effect.catchTags({
          CreateSubMissionError: error =>
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
          SubMissionRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllSubMissionError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          SubMissionRepo.count(param.where).pipe(
            Effect.catchTags({
              CountSubMissionError: error =>
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
      return SubMissionRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneSubMissionError: error =>
            Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    getOneById(
      id: SubMissionId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return SubMissionRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneSubMissionError: error =>
            Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(id: SubMissionId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => SubMissionRepo.remove(id)),
        Effect.catchTags({
          RemoveSubMissionError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: SubMissionId,
      data: TypeSubMissionUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => SubMissionRepo.update(id, data)),
        Effect.catchTags({
          UpdateSubMissionError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeSubMissionService;
}
export class SubMissionServiceContext extends Context.Tag(
  "service-sub-mission",
)<SubMissionServiceContext, TypeSubMissionService>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      SubMissionRepo: SubMissionsRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
