import type { UsersId } from "@medevac/core";
import { Effect } from "effect";
import { DatabaseLayer } from "../../databases/index.js";
import { UsersRepositoryContext } from "../../repository/index.js";

export default (id: UsersId) =>
  Effect.all([UsersRepositoryContext]).pipe(
    Effect.flatMap(([repo]) => repo.getOne({ id: id as unknown as string })),
    Effect.provide(UsersRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
