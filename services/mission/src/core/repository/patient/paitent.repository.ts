import type { JoinerMissionId } from "@/core/types";
import type { TypePatientRepository } from "@/core/types/repositories";
import type {
  TypeGetAllParam,
  TypeGetOneParam,
  TypePatientCreate,
  TypePatientUpdate,
  TypeReturnItem,
} from "@/core/types/schema/patient";
import type { PrismaClient } from "@prisma/client";
import type { NoSuchElementException } from "effect/Cause";

import { DatabaseLayer } from "@/core/databases";
import * as Errors from "@/core/types/errors/joiner";
import { PatientItemSchema } from "@/core/types/schema/patient";
import { Context, Effect, Layer } from "effect";

function init(db: PrismaClient) {
  return {
    count(param): Effect.Effect<number, Errors.CountError> {
      return Effect.tryPromise({
        catch: Errors.CountError.new("Get patient count error"),
        try: async () => await db.patient.count({ where: param }),
      });
    },
    create(
      data: TypePatientCreate,
    ): Effect.Effect<TypeReturnItem, Errors.CreateError> {
      return Effect.tryPromise({
        catch: Errors.CreateError.new("Create patient error"),
        try: async () => await db.patient.create({ data }),
      }).pipe(Effect.andThen(PatientItemSchema.parse));
    },
    getAll(
      param: TypeGetAllParam,
    ): Effect.Effect<TypeReturnItem[], Errors.GetAllError> {
      const { orderBy, pagination, where } = param;
      return Effect.tryPromise({
        catch: Errors.GetAllError.new("get  patient all error"),
        try: async () =>
          await db.patient.findMany({
            orderBy,
            skip: pagination.page * pagination.limit,
            take: pagination.limit,
            where: { ...where },
          }),
      }).pipe(Effect.andThen(PatientItemSchema.array().parse));
    },
    getOne(
      where: TypeGetOneParam,
    ): Effect.Effect<
        TypeReturnItem,
      Errors.GetOneError | NoSuchElementException
      > {
      return Effect.tryPromise({
        catch: Errors.GetOneError.new("get  patient one error"),
        try: async () =>
          await db.patient.findFirst({
            where: { ...where },
          }),
      }).pipe(
        Effect.andThen(Effect.fromNullable),
        Effect.andThen(PatientItemSchema.parse),
      );
    },
    remove(
      id: JoinerMissionId,
    ): Effect.Effect<TypeReturnItem, Errors.RemoveError> {
      return Effect.tryPromise({
        catch: Errors.RemoveError.new("delete patient error"),
        try: async () =>
          await db.patient.delete({
            where: { id },
          }),
      }).pipe(Effect.andThen(PatientItemSchema.parse));
    },
    update(
      id: JoinerMissionId,
      data: TypePatientUpdate,
    ): Effect.Effect<TypeReturnItem, Errors.UpdateError> {
      return Effect.tryPromise({
        catch: Errors.UpdateError.new("update patient error"),
        try: async () =>
          await db.patient.update({
            data,
            where: { id },
          }),
      }).pipe(Effect.andThen(PatientItemSchema.parse));
    },
  } satisfies TypePatientRepository;
}
export class PatientRepositoryContext extends Context.Tag("repository-patient")<
  PatientRepositoryContext,
  TypePatientRepository
>() {
  static Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const prismaClient = yield* DatabaseLayer;
      return init(prismaClient);
    }),
  );
}
