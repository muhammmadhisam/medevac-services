import { z } from "zod";
import { PaginationSchema } from "../../global";
import {
  HistoryCreateInputSchema,
  HistoryOrderByWithAggregationInputSchema,
  HistorySchema,
  HistoryUpdateInputSchema,
  HistoryWhereInputSchema,
} from "../prisma";

export const HistoryItemSchema = HistorySchema;
export const HistoryCreateSchema = HistoryCreateInputSchema;
export const HistoryUpdateSchema = HistoryUpdateInputSchema;
export const HistoryGetOneParamSchema = HistoryWhereInputSchema;
export const HistoryGetAllParamSchema = z.object({
  orderBy: HistoryOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: HistoryGetOneParamSchema.optional(),
});
export type TypeHistoryCreate = z.infer<typeof HistoryCreateSchema>;
export type TypeHistoryUpdate = z.infer<typeof HistoryUpdateSchema>;
export type TypeReturnItem = z.infer<typeof HistoryItemSchema>;
export type TypeGetAllParam = z.infer<typeof HistoryGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof HistoryGetOneParamSchema>;
