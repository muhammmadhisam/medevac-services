import { Brand } from "effect";

export type StationPatientId = string & Brand.Brand<"StationPatientId">;
export const StationPatientId = Brand.refined<StationPatientId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string StationPatientId`),
);
