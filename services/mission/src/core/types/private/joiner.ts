import { Brand } from "effect";

export type JoinerMissionId = string & Brand.Brand<"JoinerMissionId">;
export const JoinerMissionId = Brand.refined<JoinerMissionId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string JoinerMissionId`),
);
