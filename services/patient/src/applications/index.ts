import { createApplication } from "@/core/configs/create-application.js";
import { setupExamHandler } from "./exam";
import { setupHistoryHandler } from "./history";
import { setupPatientHandler } from "./patient";
import { setupStationPatientHandler } from "./station";

export default () => {
  const app = createApplication();
  app.route("/", setupPatientHandler());
  app.route("/:patient_id/exam/", setupExamHandler());
  app.route("/:patient_id/station/", setupStationPatientHandler());
  app.route("/:patient_id/history/", setupHistoryHandler());

  return app;
};
