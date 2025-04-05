import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";
import update from "./update";

export function setupUsersHandler() {
  const app: TypeApplication = createApplication();
  const handlers = [update];
  handlers.forEach(handler => handler(app));
  return app;
}
