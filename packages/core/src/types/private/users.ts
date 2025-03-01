import { Brand } from "effect"

export type UsersId = number & Brand.Brand<"UsersId">
export const UsersId = Brand.refined<UsersId>(
  n => typeof n === "number",
  n => Brand.error(`Expected ${n} to be a number`),
)
