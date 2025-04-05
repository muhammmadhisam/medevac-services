import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";
import create from "./create.js";
import currentPatient from "./current-patient.js";
import current from "./current.js";
import getAll from "./get-all.js";
import getById from "./get-by-id.js";
import patient from "./patient.js";
import remove from "./remove.js";
import update from "./update.js";
import userUnJoinMission from "./user-un-join-mission.js";

export function setupMissionHandler() {
  const app: TypeApplication = createApplication();
  const handlers = [
    create,
    getAll,
    current,
    patient,
    currentPatient,
    userUnJoinMission,
    remove,
    update,
    getById,
  ];
  handlers.forEach(handler => handler(app));
  return app;
}
