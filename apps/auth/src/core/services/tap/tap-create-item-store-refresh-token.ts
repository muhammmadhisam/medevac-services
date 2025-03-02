import type { RefreshToken, UsersId } from "@medevac/core";
import { RefreshTokenId } from "@medevac/core";
import { Effect } from "effect";
import { DatabaseLayer } from "../../databases/index.js";
import { StoreRefreshTokensRepositoryContext } from "../../repository/index.js";

export default (id: UsersId, refresh_token: RefreshToken) =>
  Effect.all([StoreRefreshTokensRepositoryContext]).pipe(
    Effect.tap(() => console.log("create", { id, refresh_token })),
    Effect.tap(([service]) =>
      service.getOne({ user_id: id as unknown as string }).pipe(
        Effect.tap(({ id }) => service.remove(RefreshTokenId(id || ""))),
        Effect.catchTag("NoSuchElementException", () => Effect.void),
      ),
    ),
    Effect.flatMap(([service]) =>
      service.create({
        refresh_token,
        user: { connect: { id: id as unknown as string } },
      }),
    ),
    Effect.provide(StoreRefreshTokensRepositoryContext.Live),
    Effect.provide(DatabaseLayer.Live),
  );
