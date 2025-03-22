import { Brand } from "effect";

export type HistoryId = string & Brand.Brand<"HistoryId">;
export const HistoryId = Brand.refined<HistoryId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string HistoryId`),
);
