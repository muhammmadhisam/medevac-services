import { createApplication } from "@medevac/core";
import { setupAuthHandler } from "./auth/index.js";

export default () => createApplication().route("/auth", setupAuthHandler());
