import type { TypeFailResponse } from "@/core/types";
import type {
  TypeHistoryRepository,
  TypePatientRepository,
} from "@/core/types/repositories";
import type { TypeEocTriageView } from "@/core/types/schema/eoc";
import type { TypeEocService } from "@/core/types/services/eoc";
import {
  HistoryRepositoryContext,
  PatientsRepositoryContext,
} from "@/core/repository";
import { TypeFailResponseError } from "@/core/types";

import { endOfDay, startOfDay } from "date-fns";
import { Context, Effect, Layer } from "effect";

function init({
  HistoryRepo,
}: {
  HistoryRepo: TypeHistoryRepository;
  PatinetRepo: TypePatientRepository;
}) {
  return {
    TriageView(date: Date): Effect.Effect<TypeEocTriageView, TypeFailResponse> {
      return Effect.Do.pipe(
        Effect.bind("patient_triage_data", () =>
          Effect.Do.pipe(
            Effect.flatMap(() =>
              HistoryRepo.getAll({
                where: {
                  OR: [
                    { create_date: { gte: startOfDay(date) } },
                    { create_date: { lt: endOfDay(date) } },
                  ],
                  triage: { not: null },
                },
              }),
            ),
          )),
        Effect.flatMap(() =>
          Effect.succeed({
            dc_count: 0,
            non_dc_count: 0,
            non_triage_count: 0,
            patient_dc_data: [],
            patient_died: [],
            patient_go_home: [],
            patient_go_lost: [],
            patient_go_refer: [],
            patient_non_dc_data: [],
            patient_non_triage_data: [],
            patient_triage_data: [],
            total: 0,
            triage_count: 0,
          } satisfies TypeEocTriageView),
        ),
        Effect.catchAll(() =>
          Effect.fail(TypeFailResponseError.new("เพิ่มข้อมูลล้มเหลว")(null)),
        ),
      );
    },
  } satisfies TypeEocService;
}
export class EocServiceContext extends Context.Tag("service-history")<
  EocServiceContext,
  TypeEocService
>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      HistoryRepo: HistoryRepositoryContext,
      PatinetRepo: PatientsRepositoryContext,
    }).pipe(Effect.andThen(init)),
  );
}
