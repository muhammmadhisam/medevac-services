import { Brand } from "effect";

export type ExamId = string & Brand.Brand<"ExamId">;
export const ExamId = Brand.refined<ExamId>(
  n => typeof n === "string",
  n => Brand.error(`Expected ${n} to be a string ExamId`),
);
