import type {
  JoinerMissionId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { TypeJoinerRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeJoinerCreate,
  TypeJoinerUpdate,
  TypeReturnItem,
} from "@/core/types/schema/joiner";
import type { TypeJoinerService } from "@/core/types/services";
import { JoinerRepositoryContext } from "@/core/repository";
import { MissionId, TypeFailResponseError, UsersId } from "@/core/types";
import { Context, Effect, Layer } from "effect";
import tapDuplicateUserJoinMission from "../tap/tap-duplicate-user-join-mission";
import tapNotfountByMissionId from "../tap/tap-notfount-by-mission-id";

function init({ JoinerRepo }: { JoinerRepo: TypeJoinerRepository }) {
  return {
    create(
      data: TypeJoinerCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() =>
          tapNotfountByMissionId(
            MissionId(data.Mission.connect?.id as unknown as string),
          ),
        ),
        Effect.tap(() =>
          tapDuplicateUserJoinMission({
            mission_id: MissionId(
              data.Mission.connect?.id as unknown as string,
            ),
            user_id: UsersId(data.user_id),
          }),
        ),
        Effect.andThen(() =>
          JoinerRepo.create(data).pipe(
            Effect.catchTags({
              CreateJoinerError: error =>
                Effect.fail(
                  TypeFailResponseError.new("เพิ่มข้อมูลล้มเหลว")(error),
                ),
            }),
          ),
        ),
      );
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeGetAllData<TypeReturnItem>, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("data", () =>
          JoinerRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllJoinerError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          JoinerRepo.count(param.where).pipe(
            Effect.catchTags({
              CountJoinerError: error =>
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
      return JoinerRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneJoinerError: error =>
            Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    getOneById(
      id: JoinerMissionId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return JoinerRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneJoinerError: error =>
            Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(
      id: JoinerMissionId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => JoinerRepo.remove(id)),
        Effect.catchTags({
          RemoveJoinerError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: JoinerMissionId,
      data: TypeJoinerUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => JoinerRepo.update(id, data)),
        Effect.catchTags({
          UpdateJoinerError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeJoinerService;
}
export class JoinerServiceContext extends Context.Tag("service-joinner")<
  JoinerServiceContext,
  TypeJoinerService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      JoinerRepo: JoinerRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
