import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class CreateError extends Data.TaggedError("CreateExamError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetByIdError extends Data.TaggedError(
  "GetByIdExamError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}

export class GetAllError extends Data.TaggedError("GetAllExamError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetOneError extends Data.TaggedError("GetOneExamError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class UpdateError extends Data.TaggedError("UpdateExamError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class RemoveError extends Data.TaggedError("RemoveExamError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class CountError extends Data.TaggedError("CountExamError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
