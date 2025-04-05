import { TypeFailResponseError } from "@/core/types/index.js";
import { Effect } from "effect";
import { DatabaseLayer } from "../../databases/index.js";

import { PatientsRepositoryContext } from "../../repository/index.js";

export default (id: string) =>
  Effect.all([PatientsRepositoryContext]).pipe(
    Effect.flatMap(([repo]) => repo.getOne({ id })),
    Effect.catchTags({
      GetOnePatientError: error =>
        Effect.fail(
          TypeFailResponseError.new("เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง")(
            error,
            500,
          ),
        ),
      NoSuchElementException: error =>
        Effect.fail(
          TypeFailResponseError.new("ไม่พบข้อมุลผู้ป่วย")(error, 404),
        ),
    }),
    Effect.provide(PatientsRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
