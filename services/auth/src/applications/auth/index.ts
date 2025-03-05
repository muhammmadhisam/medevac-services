import { createApplication } from "@/core/configs/create-application.js";
import me from "./me.js";
import signIn from "./sign-in.js";
import signUp from "./sign-up.js";

export function setupAuthHandler() {
  const app = createApplication();
  signUp(app);
  me(app);
  signIn(app);

  return app;
}
