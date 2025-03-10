import { createApplication } from "@/core/configs/create-application.js";
import { setupMissionHandler } from "./mission";
import { setupSubMissionHandler } from "./sub-mission";

export default () => {
  const app = createApplication();
  app.route("/", setupMissionHandler());
  app.route("/:mission_id/sub-mission", setupSubMissionHandler());

  return app;
};
