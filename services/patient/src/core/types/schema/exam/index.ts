import {
  ExamCreateInputSchema,
  ExamOrderByWithAggregationInputSchema,
  ExamSchema,
  ExamUpdateInputSchema,
  ExamWhereInputSchema,
} from "@schema/index";
import { z } from "zod";
import { PaginationSchema } from "../../global";

export const ExamItemSchema = ExamSchema;
export const ExamCreateSchema = ExamCreateInputSchema;
export const ExamUpdateSchema = ExamUpdateInputSchema;
export const ExamGetOneParamSchema = ExamWhereInputSchema;
export const ExamGetAllParamSchema = z.object({
  orderBy: ExamOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: ExamGetOneParamSchema.optional(),
});
export type TypeExamCreate = z.infer<typeof ExamCreateSchema>;
export type TypeExamUpdate = z.infer<typeof ExamUpdateSchema>;
export type TypeReturnItem = z.infer<typeof ExamItemSchema>;
export type TypeGetAllParam = z.infer<typeof ExamGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof ExamGetOneParamSchema>;
