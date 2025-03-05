import { createApplication } from "@/core/configs/create-application.js";
import { setupMissionHandler } from "./mission";

export default () => {
  const app = createApplication();
  app.route("/mission", setupMissionHandler());

  return app;
};
