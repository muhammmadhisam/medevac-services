import type { MissionId } from "@/core/types/index.js";
import type { PatientId } from "@/core/types/private/paitnet.js";

import { TypeFailResponseError } from "@/core/types/index.js";
import { Effect } from "effect";

import { DatabaseLayer } from "../../databases/index.js";
import { PatientRepositoryContext } from "../../repository/index.js";

type Param = {
  patient_id: PatientId;
  mission_id: MissionId;
};
export default (item: Param) =>
  Effect.all([PatientRepositoryContext]).pipe(
    Effect.flatMap(([repo]) => repo.getOne({ ...item })),
    Effect.flatMap(Effect.fromNullable),
    Effect.flatMap(() =>
      Effect.fail(
        TypeFailResponseError.new(
          "เกิดข้อผิดพลาดเนื่องจากมีผู้ป่วยนี้แล้วในภารกิจโปรดลองใหม่อีกครั้ง",
        )(null, 400),
      ),
    ),
    Effect.catchTags({
      GetOneJoinerError: () =>
        Effect.fail(
          TypeFailResponseError.new(
            "เกิดข้อผิดพลาดในการ เชื่อมต่อฐานข้อทมูลโปรดลองใหม่อีกครั้ง",
          )(null, 500),
        ),
      NoSuchElementException: () => Effect.void,
    }),
    Effect.provide(PatientRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
