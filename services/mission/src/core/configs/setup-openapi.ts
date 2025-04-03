import type { TypeApplication } from "./create-application";
import { config } from "dotenv";
import { openAPISpecs } from "hono-openapi";
import { GetEnv } from "../env";
import packageJson from "./../../../package.json" with { type: "json" };

config();

const env = GetEnv();
let servers = [
  {
    description: "Local server",
    url: `http://localhost:${env.PORT}`,
  },
  {
    description: "Local Cotainer server",
    url: "https://api.localhost",
  },
  {
    description: "Host publics server",
    url: "https://api.m-mert.com",
  },
];
if (env.NODE_ENV === "production") {
  servers = [
    {
      description: "Host publics server",
      url: "https://api.m-mert.com",
    },
  ];
}
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
        servers,
      },
    }),
  );
  return app;
}
