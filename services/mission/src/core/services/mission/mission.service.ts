import type { MissionId, TypeFailResponse, TypeGetAllData } from "@/core/types";
import type { TypeMissionRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeMissionCreate,
  TypeMissionUpdate,
  TypeReturnItem,
} from "@/core/types/schema/mission";
import type { TypeMissionService } from "@/core/types/services";
import { MissionsRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({ MissionRepo }: { MissionRepo: TypeMissionRepository }) {
  return {
    create(
      data: TypeMissionCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return MissionRepo.create(data).pipe(
        Effect.catchTags({
          CreateMissionError: error =>
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
          MissionRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllMissionError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุล ภารกิจ ล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          MissionRepo.count(param.where).pipe(
            Effect.catchTags({
              CountMissionError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return MissionRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneMissionError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(
              TypeFailResponseError.new("ไม่พบข้อมุล ภารกิจ")(error, 404),
            ),
        }),
      );
    },
    getOneById(id: MissionId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return MissionRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneMissionError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(
              TypeFailResponseError.new("ไม่พบข้อมุล ภารกิจ")(error, 404),
            ),
        }),
      );
    },
    remove(id: MissionId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => MissionRepo.remove(id)),
        Effect.catchTags({
          RemoveMissionError: error =>
            Effect.fail(
              TypeFailResponseError.new("ลบข้อมุล ภารกิจ ล้มเหลว")(error),
            ),
        }),
      );
    },
    update(
      id: MissionId,
      data: TypeMissionUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => MissionRepo.update(id, data)),
        Effect.catchTags({
          UpdateMissionError: error =>
            Effect.fail(
              TypeFailResponseError.new("แก้ไขข้อมุล ภารกิจ ล้มเหลว")(error),
            ),
        }),
      );
    },
  } satisfies TypeMissionService;
}
export class MissionServiceContext extends Context.Tag("service-mission")<
  MissionServiceContext,
  TypeMissionService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      MissionRepo: MissionsRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
