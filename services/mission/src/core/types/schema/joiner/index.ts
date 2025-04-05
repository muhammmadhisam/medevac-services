import { PaginationSchema } from "@/core/types";

import { z } from "zod";
import {
  JoinerCreateInputSchema,
  JoinerOrderByWithAggregationInputSchema,
  JoinerSchema,
  JoinerUpdateInputSchema,
  JoinerWhereInputSchema,
} from "../prisma";

export const JoinerItemSchema = JoinerSchema;
export const JoinerCreateSchema = JoinerCreateInputSchema;
export const JoinerUpdateSchema = JoinerUpdateInputSchema;
export const JoinerGetOneParamSchema = JoinerWhereInputSchema;
export const JoinerGetAllParamSchema = z.object({
  orderBy: JoinerOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: JoinerGetOneParamSchema.optional(),
});
export type TypeJoinerCreate = z.infer<typeof JoinerCreateSchema>;
export type TypeJoinerUpdate = z.infer<typeof JoinerUpdateSchema>;
export type TypeReturnItem = z.infer<typeof JoinerItemSchema>;
export type TypeGetAllParam = z.infer<typeof JoinerGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof JoinerGetOneParamSchema>;
