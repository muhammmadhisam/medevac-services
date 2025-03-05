import { Brand } from "effect";

export type RefreshToken = string & Brand.Brand<"RefreshToken">;
export const RefreshToken = Brand.refined<RefreshToken>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string RefreshToken`),
);
export type RefreshTokenId = string & Brand.Brand<"RefreshTokenId">;
export const RefreshTokenId = Brand.refined<RefreshTokenId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string RefreshTokenId`),
);
