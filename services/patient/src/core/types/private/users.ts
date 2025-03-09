import { Brand } from "effect";

export type UsersId = string & Brand.Brand<"UsersId">;
export const UsersId = Brand.refined<UsersId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string UsersId`),
);
