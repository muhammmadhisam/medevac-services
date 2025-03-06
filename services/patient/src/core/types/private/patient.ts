import { Brand } from "effect";

export type PatientId = string & Brand.Brand<"PatientId">;
export const PatientId = Brand.refined<PatientId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string PatientId`),
);
