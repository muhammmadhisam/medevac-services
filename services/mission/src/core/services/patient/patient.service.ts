import type {
  JoinerMissionId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { TypePatientRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypePatientCreate,
  TypePatientUpdate,
  TypeReturnItem,
} from "@/core/types/schema/patient";
import type { TypePatientService } from "@/core/types/services";

import { PatientRepositoryContext } from "@/core/repository";
import { MissionId, TypeFailResponseError } from "@/core/types";

import { PatientId } from "@/core/types/private/paitnet";
import { Context, Effect, Layer } from "effect";
import tapDuplicatePatientJoinMission from "../tap/tap-duplicate-patient-join-mission";
import tapNotfountByMissionId from "../tap/tap-notfount-by-mission-id";

function init({ PatientRepo }: { PatientRepo: TypePatientRepository }) {
  return {
    create(
      data: TypePatientCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() =>
          tapNotfountByMissionId(
            MissionId(data.Mission.connect?.id as unknown as string),
          ),
        ),
        Effect.tap(() =>
          tapDuplicatePatientJoinMission({
            mission_id: MissionId(
              data.Mission.connect?.id as unknown as string,
            ),
            patient_id: PatientId(data.patient_id),
          }),
        ),
        Effect.andThen(() =>
          PatientRepo.create(data).pipe(
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
          PatientRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllJoinerError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          PatientRepo.count(param.where).pipe(
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
      return PatientRepo.getOne(param).pipe(
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
      return PatientRepo.getOne({ id }).pipe(
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
        Effect.flatMap(() => PatientRepo.remove(id)),
        Effect.catchTags({
          RemoveJoinerError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: JoinerMissionId,
      data: TypePatientUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => PatientRepo.update(id, data)),
        Effect.catchTags({
          UpdateJoinerError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypePatientService;
}
export class PatientServiceContext extends Context.Tag("service-paitent")<
  PatientServiceContext,
  TypePatientService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      PatientRepo: PatientRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
