import type { MissionId, UsersId } from "@/core/types/index.js";
import { TypeFailResponseError } from "@/core/types/index.js";

import { Effect } from "effect";
import { DatabaseLayer } from "../../databases/index.js";

import { JoinerRepositoryContext } from "../../repository/index.js";

type Param = {
  user_id: UsersId;
  mission_id: MissionId;
};
export default (item: Param) =>
  Effect.all([JoinerRepositoryContext]).pipe(
    Effect.flatMap(([repo]) => repo.getOne({ ...item })),
    Effect.flatMap(Effect.fromNullable),
    Effect.flatMap(() =>
      Effect.fail(
        TypeFailResponseError.new(
          "เกิดข้อผิดพลาดเนื่องจากมีชื่อผู้ใช้นี้แล้วในภารกิจโปรดลองใหม่อีกครั้ง",
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
    Effect.provide(JoinerRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
