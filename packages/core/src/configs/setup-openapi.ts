import type { OpenApiSpecsOptions } from "hono-openapi"
import type { TypeApplication } from "./create-application.js"
import { openAPISpecs } from "hono-openapi"

export function setupOpenApi(
  app: TypeApplication,
  options: OpenApiSpecsOptions,
) {
  app.get("/openapi.json", openAPISpecs(app, options))
  return app
}
