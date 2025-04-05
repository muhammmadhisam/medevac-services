import { TypeFailResponseError } from "@/core/types/index.js";

import { Effect } from "effect";
import { DatabaseLayer } from "../../databases/index.js";

import { UsersRepositoryContext } from "../../repository/index.js";

export default (username: string) =>
  Effect.all([UsersRepositoryContext]).pipe(
    Effect.flatMap(([repo]) => repo.getOne({ username })),
    Effect.flatMap(Effect.fromNullable),
    Effect.flatMap(() =>
      Effect.fail(
        TypeFailResponseError.new(
          "เกิดข้อผิดพลาเนื่องจากมีชื่อผู้ใช้นี้แล้วในระบบ โปรดลองใหม่อีกครั้ง",
        )(null, 400),
      ),
    ),
    Effect.catchTags({
      GetOneUsersError: () =>
        Effect.fail(
          TypeFailResponseError.new(
            "เกิดข้อผิดพลาดในการ เชื่อมต่อฐานข้อทมูลโปรดลองใหม่อีกครั้ง",
          )(null, 500),
        ),
      NoSuchElementException: () => Effect.void,
    }),
    Effect.provide(UsersRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
