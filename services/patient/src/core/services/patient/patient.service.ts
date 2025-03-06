import type { PatientId, TypeFailResponse, TypeGetAllData } from "@/core/types";
import type { TypePatientRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypePatientCreate,
  TypePatientUpdate,
  TypeReturnItem,
} from "@/core/types/schema/patient";
import type { TypePatientService } from "@/core/types/services";
import { PatientsRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({ PatientRepo }: { PatientRepo: TypePatientRepository }) {
  return {
    create(
      data: TypePatientCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return PatientRepo.create(data).pipe(
        Effect.catchTags({
          CreatePatientError: error =>
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
          PatientRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllPatientError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมุล ภารกิจ ล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          PatientRepo.count(param.where).pipe(
            Effect.catchTags({
              CountPatientError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return PatientRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOnePatientError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(
              TypeFailResponseError.new("ไม่พบข้อมุล ภารกิจ")(error, 404),
            ),
        }),
      );
    },
    getOneById(id: PatientId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return PatientRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOnePatientError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(id: PatientId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => PatientRepo.remove(id)),
        Effect.catchTags({
          RemovePatientError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: PatientId,
      data: TypePatientUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => PatientRepo.update(id, data)),
        Effect.catchTags({
          UpdatePatientError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypePatientService;
}
export class PatientServiceContext extends Context.Tag("service-Patient")<
  PatientServiceContext,
  TypePatientService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      PatientRepo: PatientsRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
