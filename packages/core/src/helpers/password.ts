/* eslint-disable node/prefer-global/buffer */
import * as Errors from "@/core/types/errors/password";
import { GetEnv } from "@medevac/configs";
import { hash, verify } from "@node-rs/argon2";
import { Effect } from "effect";

export function hashPassword(password: string) {
  return Effect.tryPromise({
    catch: Errors.HashPasswordError.new("hashpassword fail"),
    try: () => hash(password, { secret: Buffer.from(GetEnv().SECRET_TOKEN) }),
  });
}
export function verifyPassword(hash_password: string) {
  return (password: string) => {
    return Effect.tryPromise({
      catch: Errors.HashPasswordError.new("hashpassword fail"),
      try: () =>
        verify(hash_password, password, {
          secret: Buffer.from(GetEnv().SECRET_TOKEN),
        }),
    });
  };
}
