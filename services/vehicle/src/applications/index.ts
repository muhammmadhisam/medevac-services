import { createApplication } from "@/core/configs/create-application.js";
import { setupVehicleHandler } from "./vehicle";

export default () => {
  const app = createApplication();
  app.route("/vehicle", setupVehicleHandler());

  return app;
};
