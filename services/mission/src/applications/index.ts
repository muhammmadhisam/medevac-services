import { createApplication } from "@/core/configs/create-application.js";
import { setupJoinerHandler } from "./joiner";
import { setupMissionHandler } from "./mission";
import { setupSubMissionHandler } from "./sub-mission";
import { setupSubMissionTagHandler } from "./sub-mission-tag";

export default () => {
  const app = createApplication();
  app.route("/", setupMissionHandler());
  app.route("/:mission_id", setupJoinerHandler());
  app.route("/:mission_id/sub-mission", setupSubMissionHandler());
  app.route("sub-mission/:sub_mission_id/tag", setupSubMissionTagHandler());

  return app;
};
