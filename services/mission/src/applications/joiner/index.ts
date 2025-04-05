import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";
import userJoinMission from "./user-join-mission";

export function setupJoinerHandler() {
  const app: TypeApplication = createApplication();
  const handlers = [userJoinMission];
  handlers.forEach(handler => handler(app));
  return app;
}
