import { createApplication } from "@/core/configs/create-application.js";
import { setupAuthHandler } from "./auth";

export default () => {
  const app = createApplication();
  app.route("/", setupAuthHandler());

  return app;
};
