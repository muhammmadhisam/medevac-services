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

const app = createApplication();
setUpCors(app);
setupOpenApi(app);
setupScalarDocs(app);
app.use(logger());

app.route("/v1", setupApplication());

const port = env.PORT;
console.table(env);
console.log(`Server is running on http://localhost:${port}`);
console.log(`Server is running docs on http://localhost:${port}/docs`);
showRoutes(app);
export default {
  fetch: app.fetch,
  port: env.PORT,
};
