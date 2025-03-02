import type { TypeApplication } from "@/core/configs/create-application.js"
import type { ApiReferenceConfiguration } from "@scalar/hono-api-reference"
import { apiReference } from "@scalar/hono-api-reference"

export function setupScalarDocs(
  app: TypeApplication,
  options: ApiReferenceConfiguration,
) {
  return app.get("/", apiReference(options))
}
