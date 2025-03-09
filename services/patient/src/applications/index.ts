import { createApplication } from "@/core/configs/create-application.js";
import { setupPatientHandler } from "./patient";

export default () => {
  const app = createApplication();
  app.route("/", setupPatientHandler());

  return app;
};
