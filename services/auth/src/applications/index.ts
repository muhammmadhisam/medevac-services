import { createApplication } from "@/core/configs/create-application.js";
import { setupAuthHandler } from "./auth";
import { setupUsersHandler } from "./users";

export default () => {
  const app = createApplication();
  app.route("/", setupAuthHandler());
  app.route("/users", setupUsersHandler());

  return app;
};
