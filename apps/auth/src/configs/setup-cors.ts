import type { TypeApplication } from "@medevac/core";
import { cors } from "hono/cors";

export function setUpCors(app: TypeApplication) {
  app.use(
    cors({
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      origin: "*",
    }),
  );
}
