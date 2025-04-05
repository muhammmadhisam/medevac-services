import type { MissionId } from "@/core/types/index.js";
import { TypeFailResponseError } from "@/core/types/index.js";

import { Effect } from "effect";
import { DatabaseLayer } from "../../databases/index.js";

import { MissionsRepositoryContext } from "../../repository/index.js";

export default (id: MissionId) =>
  Effect.all([MissionsRepositoryContext]).pipe(
    Effect.flatMap(([repo]) => repo.getOne({ id })),
    Effect.catchTags({
      GetOneMissionError: error =>
        Effect.fail(TypeFailResponseError.new("ขอข้อมุลล้มเหลว")(error)),
      NoSuchElementException: error =>
        Effect.fail(TypeFailResponseError.new("ไม่พบข้อมุลภารกิจ")(error, 404)),
    }),
    Effect.provide(MissionsRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
