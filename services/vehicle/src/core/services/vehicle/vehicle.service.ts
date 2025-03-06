import type { TypeFailResponse, TypeGetAllData, VehicleId } from "@/core/types";
import type { TypeVehicleRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
  TypeVehicleCreate,
  TypeVehicleUpdate,
} from "@/core/types/schema/vehicle";
import type { TypeVehicleService } from "@/core/types/services";
import { VehiclesRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({ VehicleRepo }: { VehicleRepo: TypeVehicleRepository }) {
  return {
    create(
      data: TypeVehicleCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return VehicleRepo.create(data).pipe(
        Effect.catchTags({
          CreateVehicleError: error =>
            Effect.fail(TypeFailResponseError.new("เพิ่มข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeGetAllData<TypeReturnItem>, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("data", () =>
          VehicleRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllVehicleError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมูลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          VehicleRepo.count(param.where).pipe(
            Effect.catchTags({
              CountVehicleError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return VehicleRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneVehicleError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(
              TypeFailResponseError.new("ไม่พบข้อมุลยานภหนะ")(error, 404),
            ),
        }),
      );
    },
    getOneById(id: VehicleId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return VehicleRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneVehicleError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(
              TypeFailResponseError.new("ไม่พบข้อมุล ภารกิจ")(error, 404),
            ),
        }),
      );
    },
    remove(id: VehicleId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => VehicleRepo.remove(id)),
        Effect.catchTags({
          RemoveVehicleError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: VehicleId,
      data: TypeVehicleUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => VehicleRepo.update(id, data)),
        Effect.catchTags({
          UpdateVehicleError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeVehicleService;
}
export class VehicleServiceContext extends Context.Tag("service-Vehicle")<
  VehicleServiceContext,
  TypeVehicleService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      VehicleRepo: VehiclesRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
