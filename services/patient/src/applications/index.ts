import { createApplication } from "@/core/configs/create-application.js";
import { setupExamHandler } from "./exam";
import { setupPatientHandler } from "./patient";

export default () => {
  const app = createApplication();
  app.route("/", setupPatientHandler());
  app.route("/:patiend_id/exam", setupExamHandler());

  return app;
};
