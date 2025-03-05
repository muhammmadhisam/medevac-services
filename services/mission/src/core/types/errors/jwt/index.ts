import type { ErrorMsg } from "../base.js";
import { createErrorFactory } from "@/core/helpers/index.js";
import { Data } from "effect";

export class GenAccessTokenError extends Data.TaggedError(
  "GenAccessTokenError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class VerifyAccessTokenError extends Data.TaggedError(
  "VerifyAccessTokenError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class GenRefreshTokenError extends Data.TaggedError(
  "GenRefreshTokenError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
export class VerifyRefreshTokenError extends Data.TaggedError(
  "VerifyRefreshTokenError",
)<ErrorMsg> {
  static new = createErrorFactory(this);
}
