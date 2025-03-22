import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class CreateError extends Data.TaggedError(
  "CreateHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetByIdError extends Data.TaggedError(
  "GetByIdHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}

export class GetAllError extends Data.TaggedError(
  "GetAllHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetOneError extends Data.TaggedError(
  "GetOneHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class UpdateError extends Data.TaggedError(
  "UpdateHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class RemoveError extends Data.TaggedError(
  "RemoveHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class CountError extends Data.TaggedError(
  "CountHistoryError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
