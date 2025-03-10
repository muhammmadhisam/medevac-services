import { Brand } from "effect";

export type SubMissionId = string & Brand.Brand<"SubMissionId">;
export const SubMissionId = Brand.refined<SubMissionId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string SubMissionId`),
);
