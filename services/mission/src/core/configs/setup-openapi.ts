import type { TypeApplication } from "./create-application";
import { config } from "dotenv";
import { openAPISpecs } from "hono-openapi";
import { GetEnv } from "../env";
import packageJson from "./../../../package.json" with { type: "json" };

config();

const env = GetEnv();

export function setupOpenApi(app: TypeApplication) {
  app.get(
    "/openapi.json",
    openAPISpecs(app, {
      documentation: {
        info: {
          description: "Medevac Mission Api",
          title: "API",
          version: packageJson.version,
        },
        servers: [
          {
            description: "Local server",
            url: `http://localhost:${env.PORT}`,
          },
        ],
      },
    }),
  );
  return app;
}
