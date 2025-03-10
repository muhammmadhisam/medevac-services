import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";
import create from "./create.js";
import getAll from "./get-all.js";
import getById from "./get-by-id.js";
import remove from "./remove.js";

export function setupSubMissionHandler() {
  const app: TypeApplication = createApplication();
  const handlers = [create, getAll, remove, getById];
  handlers.forEach(handler => handler(app));
  return app;
}
