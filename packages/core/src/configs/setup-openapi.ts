import type { TypeApplication } from "./create-application.js"
import { GetEnv } from "@medevac/configs"
import { openAPISpecs } from "hono-openapi"
import packageJson from "../../package.json" with { type: "json" }

const env = GetEnv()

export function setupOpenApi(app: TypeApplication) {
  app.get(
    "/openapi.json",
    openAPISpecs(app, {
      documentation: {
        info: {
          description: "API for GHG application api",
          title: "API",
          version: packageJson.version,
        },
        servers: [
          {
            description: "Local server",
            url: `http://localhost:${env.PORT}`,
          },
          {
            description: "Prod server",
            url: "https://tgo.api-reduction.promptdev.info",
          },
        ],
      },
    }),
  )
  return app
}
