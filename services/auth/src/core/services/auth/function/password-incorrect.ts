import { TypeFailResponseError } from "@/core/types";
import { Effect } from "effect";

export function passwordIncorrect() {
  return Effect.fail(
    TypeFailResponseError.new("username or password incorrect")(null, 401),
  );
}
