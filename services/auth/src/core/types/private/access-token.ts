import { Brand } from "effect";

export type AccessToken = string & Brand.Brand<"AccessToken">;
export const AccessToken = Brand.refined<AccessToken>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string AccessToken`),
);
