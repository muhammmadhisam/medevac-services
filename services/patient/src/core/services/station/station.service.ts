import type {
  StationPatientId,
  TypeFailResponse,
  TypeGetAllData,
} from "@/core/types";
import type { TypeStationPatientRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeStationPatientCreate,
  TypeStationPatientUpdate,
} from "@/core/types/schema/station";
import type { TypeStationPatientService } from "@/core/types/services";
import { StationPatientRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";
import tapNotfountByPatientId from "../tap/tap-notfount-by-patient-id";

function init({
  StationPatientRepo,
}: {
  StationPatientRepo: TypeStationPatientRepository;
}) {
  return {
    create(
      data: TypeStationPatientCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() =>
          tapNotfountByPatientId(data.Patient.connect?.id as unknown as string),
        ),
        Effect.andThen(() =>
          StationPatientRepo.create(data).pipe(
            Effect.catchTags({
              CreateStationPatientError: error =>
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
          StationPatientRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllStationPatientError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมูลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          StationPatientRepo.count(param.where).pipe(
            Effect.catchTags({
              CountStationPatientError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return StationPatientRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneStationPatientError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมูล")(error, 404)),
        }),
      );
    },
    getOneById(
      id: StationPatientId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return StationPatientRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneStationPatientError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(
      id: StationPatientId,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => StationPatientRepo.remove(id)),
        Effect.catchTags({
          RemoveStationPatientError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: StationPatientId,
      data: TypeStationPatientUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => StationPatientRepo.update(id, data)),
        Effect.catchTags({
          UpdateStationPatientError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeStationPatientService;
}
export class StationPatientServiceContext extends Context.Tag(
  "service-StationPatient",
)<StationPatientServiceContext, TypeStationPatientService>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      StationPatientRepo: StationPatientRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
