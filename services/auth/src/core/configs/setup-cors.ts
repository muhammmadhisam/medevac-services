import type { TypeApplication } from "./create-application";
import { cors } from "hono/cors";
import { GetEnv } from "../env";

export function setUpCors(app: TypeApplication) {
  app.use(
    cors({
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      origin: GetEnv().CORS_ORIGIN,
    }),
  );
}
