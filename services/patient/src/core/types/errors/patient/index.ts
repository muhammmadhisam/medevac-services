import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class CreateError extends Data.TaggedError(
  "CreatePatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetByIdError extends Data.TaggedError(
  "GetByIdPatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}

export class GetAllError extends Data.TaggedError(
  "GetAllPatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetOneError extends Data.TaggedError(
  "GetOnePatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class UpdateError extends Data.TaggedError(
  "UpdatePatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class RemoveError extends Data.TaggedError(
  "RemovePatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class CountError extends Data.TaggedError(
  "CountPatientError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
