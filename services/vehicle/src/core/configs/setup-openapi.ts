import type { TypeApplication } from "./create-application";
import { config } from "dotenv";
import { openAPISpecs } from "hono-openapi";
import packageJson from "../../../package.json" with { type: "json" };
import { GetEnv } from "../env";

config();

const env = GetEnv();

export function setupOpenApi(app: TypeApplication) {
  app.get(
    "/openapi.json",
    openAPISpecs(app, {
      documentation: {
        info: {
          description: "Medevac Paient Api",
          title: "API",
          version: packageJson.version,
        },
        servers: [
          {
            description: "Local server",
            url: `http://localhost:${env.PORT}`,
          },
          {
            description: "Local Cotainer server",
            url: "https://api.localhost",
          },
        ],
      },
    }),
  );
  return app;
}
