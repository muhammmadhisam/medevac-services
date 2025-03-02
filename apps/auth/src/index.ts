import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { GetEnv } from "@medevac/configs";
import { createApplication, setUpCors } from "@medevac/core";

import { config } from "dotenv";

import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import setupApplication from "./applications/index.js";
import { setupOpenApi } from "./configs/setup-openapi.js";
import { setupScalarDocs } from "./configs/setup-scalar-docs.js";

config();

const app = createApplication();

const env = GetEnv();
setupOpenApi(app);
setUpCors(app);
app.use(logger());
app.use("/uploads/*", serveStatic({ root: "./" }));

app.route("/v1/docs", setupScalarDocs(app));
app.route("/v1", setupApplication());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/healthz", (c) => {
  return c.json({ status: "ok" }, 200);
});

const port = env.PORT;
console.table(env);
console.log(`Server is running on http://localhost:${port}`);
console.log(`Server is running docs on http://localhost:${port}/v1/docs`);
showRoutes(app);
serve({
  fetch: app.fetch,
  port,
});
