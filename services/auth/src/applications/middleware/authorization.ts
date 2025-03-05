import type { TypeAppBindings } from "@/core/types/index.js";
import { ServicesRuntime } from "@/core/runtime";
import { JwtServiceContext } from "@/core/services/jwt";
import { AccessToken, RefreshToken } from "@/core/types/index.js";
import { Effect } from "effect";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

export const authorizationMiddleware = createMiddleware<TypeAppBindings>(
  async (c, next) => {
    const [access_token, refresh_token] = [
      getCookie(c, "access_token"),
      getCookie(c, "refresh_token"),
    ];
    if (!access_token || !refresh_token)
      return c.json({ data: "unauthorization" }, { status: 401 });
    const program = JwtServiceContext.pipe(
      Effect.flatMap((service) =>
        service.verifyTokenAndReturnJwtObject({
          access_token: AccessToken(access_token),
          refresh_token: RefreshToken(refresh_token),
        }),
      ),
      Effect.tap((data) => c.set("user", data)),
      Effect.flatMap(() => Effect.succeed(true)),
      Effect.catchAll((error) =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    if (typeof result === "boolean") {
      if (result === true) await next();
      return c.json({ data: "unauthorization" }, { status: 401 });
    } else {
      return result;
    }
  },
);
