import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";

export function setupExamHandler() {
  const app: TypeApplication = createApplication();
  // const handlers = [create, getAll, remove, getById, update];
  // handlers.forEach(handler => handler(app));
  return app;
}
