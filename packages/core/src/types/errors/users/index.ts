import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class CreateError extends Data.TaggedError(
  "CreateUsersError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetByIdError extends Data.TaggedError(
  "GetByIdUsersError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}

export class GetAllError extends Data.TaggedError(
  "GetAllUsersError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GetOneError extends Data.TaggedError(
  "GetOneUsersError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class UpdateError extends Data.TaggedError(
  "UpdateUsersError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class RemoveError extends Data.TaggedError(
  "RemoveUsersError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class CountError extends Data.TaggedError("CountUsersError")<ErrorMsg> {
  static new = createErrorFactory(this);
}
