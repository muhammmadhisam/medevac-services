import type { ExamId, TypeFailResponse, TypeGetAllData } from "@/core/types";
import type { TypeExamRepository } from "@/core/types/repositories";
import type {
  TypeExamCreate,
  TypeExamUpdate,
  TypeGetAllParam,
  TypeGetOneParam,
  TypeReturnItem,
} from "@/core/types/schema/exam";
import type { TypeExamService } from "@/core/types/services";
import { ExamRepositoryContext } from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";
import { Context, Effect, Layer } from "effect";

function init({ ExamRepo }: { ExamRepo: TypeExamRepository }) {
  return {
    create(
      data: TypeExamCreate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return ExamRepo.create(data).pipe(
        Effect.catchTags({
          CreateExamError: error =>
            Effect.fail(TypeFailResponseError.new("เพิ่มข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeGetAllData<TypeReturnItem>, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("data", () =>
          ExamRepo.getAll(param).pipe(
            Effect.catchTags({
              GetAllExamError: error =>
                Effect.fail(
                  TypeFailResponseError.new("ขอข้อมูลล้มเหลว")(error),
                ),
            }),
          )),
        Effect.bind("total", () =>
          ExamRepo.count(param.where).pipe(
            Effect.catchTags({
              CountExamError: error =>
                Effect.fail(TypeFailResponseError.new("get data fail")(error)),
            }),
          )),
      );
    },
    getOne(
      param: TypeGetOneParam,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return ExamRepo.getOne(param).pipe(
        Effect.catchTags({
          GetOneExamError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมูล")(error, 404)),
        }),
      );
    },
    getOneById(id: ExamId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return ExamRepo.getOne({ id }).pipe(
        Effect.catchTags({
          GetOneExamError: error =>
            Effect.fail(TypeFailResponseError.new("get data fail")(error)),
          NoSuchElementException: error =>
            Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุล")(error, 404)),
        }),
      );
    },
    remove(id: ExamId): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => ExamRepo.remove(id)),
        Effect.catchTags({
          RemoveExamError: error =>
            Effect.fail(TypeFailResponseError.new("ลบข้อมูลล้มเหลว")(error)),
        }),
      );
    },
    update(
      id: ExamId,
      data: TypeExamUpdate,
    ): Effect.Effect<TypeReturnItem, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.tap(() => this.getOneById(id)),
        Effect.flatMap(() => ExamRepo.update(id, data)),
        Effect.catchTags({
          UpdateExamError: error =>
            Effect.fail(TypeFailResponseError.new("แก้ไขข้อมูลล้มเหลว")(error)),
        }),
      );
    },
  } satisfies TypeExamService;
}
export class ExamServiceContext extends Context.Tag("service-exam")<
  ExamServiceContext,
  TypeExamService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      ExamRepo: ExamRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
