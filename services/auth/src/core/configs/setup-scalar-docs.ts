import type { TypeApplication } from "./create-application";
import { apiReference } from "@scalar/hono-api-reference";
import packageJson from "../../../package.json" with { type: "json" };

export function setupScalarDocs(app: TypeApplication) {
  app.get(
    "/docs",
    apiReference({
      darkMode: true,
      favicon: "https://cdn-icons-png.flaticon.com/512/2164/2164832.png",
      layout: "modern", // "classic" | "modern" (default)
      pageTitle: packageJson.name,
      spec: {
        url: "/openapi.json",
      },
      theme: "deepSpace",
    }),
  );
  return app;
}
