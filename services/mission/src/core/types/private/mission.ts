import { Brand } from "effect";

export type MissionId = string & Brand.Brand<"MissionId">;
export const MissionId = Brand.refined<MissionId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string MissionId`),
);
