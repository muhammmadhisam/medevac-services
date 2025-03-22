import { Brand } from "effect";

export type SubMissionTagId = string & Brand.Brand<"SubMissionTagId">;
export const SubMissionTagId = Brand.refined<SubMissionTagId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string SubMissionTagId`),
);
