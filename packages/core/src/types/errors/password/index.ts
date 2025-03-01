import type { ErrorMsg } from "../base.js"
import { createErrorFactory } from "@/core/helpers/index.js"
import { Data } from "effect"

export class HashPasswordError extends Data.TaggedError(
  "HashPasswordError",
)<ErrorMsg> {
  static new = createErrorFactory(this)
}
export class VerifyPassewordError extends Data.TaggedError(
  "VerifyPassewordError",
)<ErrorMsg> {
  static new = createErrorFactory(this)
}
