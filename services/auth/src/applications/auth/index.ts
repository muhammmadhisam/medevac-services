import type { TypeApplication } from "@/core/configs/create-application.js";
import { createApplication } from "@/core/configs/create-application.js";
import me from "./me.js";
import refreshToken from "./refresh-token.js";
import signIn from "./sign-in.js";
import signOut from "./sign-out.js";
import signUp from "./sign-up.js";

export function setupAuthHandler() {
  const app: TypeApplication = createApplication();
  const handlers = [signIn, signUp, me, refreshToken, signOut];
  handlers.forEach(handler => handler(app));
  return app;
}
