import { Brand } from "effect";

export type VehicleId = string & Brand.Brand<"VehicleId">;
export const VehicleId = Brand.refined<VehicleId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string VehicleId`),
);
