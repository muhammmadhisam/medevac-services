import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import setupApplication from "./applications/index.js";
import { createApplication } from "./core/configs/create-application.js";
import { setUpCors } from "./core/configs/setup-cors.js";
import { setupOpenApi } from "./core/configs/setup-openapi.js";
import { setupScalarDocs } from "./core/configs/setup-scalar-docs.js";
import { GetEnv } from "./core/env/index.js";

config();
const env = GetEnv();

const app = createApplication().basePath("/auth");
setUpCors(app);
setupOpenApi(app);
setupScalarDocs(app);
app.use(logger());
app.get("healtz", c => c.json("ok"));
app.route("/v1", setupApplication());

const port = env.PORT;
console.table(env);

showRoutes(app);
serve(
  {
    fetch: app.fetch,
    port,
  },
  (i) => {
    console.log(`Server is running on http://localhost:${i.port}`);
    console.log(
      `Server is running docs on http://localhost:${i.port}/auth/docs`,
    );
    console.log();
  },
);
