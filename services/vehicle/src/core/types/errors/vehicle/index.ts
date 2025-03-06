import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class CreateError extends Data.TaggedError(
  "CreateVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetByIdError extends Data.TaggedError(
  "GetByIdVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}

export class GetAllError extends Data.TaggedError(
  "GetAllVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetOneError extends Data.TaggedError(
  "GetOneVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class UpdateError extends Data.TaggedError(
  "UpdateVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class RemoveError extends Data.TaggedError(
  "RemoveVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class CountError extends Data.TaggedError(
  "CountVehicleError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
