import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class CreateError extends Data.TaggedError(
  "CreateSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetByIdError extends Data.TaggedError(
  "GetByIdSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}

export class GetAllError extends Data.TaggedError(
  "GetAllSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetOneError extends Data.TaggedError(
  "GetOneSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class UpdateError extends Data.TaggedError(
  "UpdateSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class RemoveError extends Data.TaggedError(
  "RemoveSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class CountError extends Data.TaggedError(
  "CountSubMissionError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
