import type { TypeApplication } from "@medevac/core";
import { apiReference } from "@scalar/hono-api-reference";

export function setupScalarDocs(app: TypeApplication) {
  app.get(
    "/",
    apiReference({
      darkMode: true,
      favicon: "https://cdn-icons-png.flaticon.com/512/2164/2164832.png",
      layout: "modern", // "classic" | "modern" (default)
      pageTitle: "GHG API Reference",
      spec: {
        url: "/openapi.json",
      },
      theme: "deepSpace",
    }),
  );
  return app;
}
