import { createApplication } from "@medevac/core";
import me from "./me.js";
import signIn from "./sign-in.js";
import signUp from "./sign-up.js";

export function setupAuthHandler() {
  const app = createApplication();
  app.route("/", signIn(app));
  app.route("/", signUp(app));
  app.route("/", me(app));
  return app;
}
