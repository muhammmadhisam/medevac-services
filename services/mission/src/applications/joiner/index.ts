import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";
import patientJoinMission from "./patient-join-mission";
import patientUnjoinMission from "./patient-unjoin-mission";
import userJoinMission from "./user-join-mission";

export function setupJoinerHandler() {
  const app: TypeApplication = createApplication();
  const handlers = [userJoinMission, patientJoinMission, patientUnjoinMission];
  handlers.forEach(handler => handler(app));
  return app;
}
