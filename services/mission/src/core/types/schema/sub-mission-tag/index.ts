import { PaginationSchema } from "@/core/types";

import {
  SubMissionTagCreateInputSchema,
  SubMissionTagOrderByWithAggregationInputSchema,
  SubMissionTagSchema,
  SubMissionTagUpdateInputSchema,
  SubMissionTagWhereInputSchema,
} from "@schema/index";
import { z } from "zod";

export const SubMissionTagItemSchema = SubMissionTagSchema;
export const SubMissionTagCreateSchema = SubMissionTagCreateInputSchema;
export const SubMissionTagUpdateSchema = SubMissionTagUpdateInputSchema;
export const SubMissionTagGetOneParamSchema = SubMissionTagWhereInputSchema;
export const SubMissionTagGetAllParamSchema = z.object({
  orderBy: SubMissionTagOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: SubMissionTagGetOneParamSchema.optional(),
});
export type TypeSubMissionTagCreate = z.infer<typeof SubMissionTagCreateSchema>;
export type TypeSubMissionTagUpdate = z.infer<typeof SubMissionTagUpdateSchema>;
export type TypeReturnItem = z.infer<typeof SubMissionTagItemSchema>;
export type TypeGetAllParam = z.infer<typeof SubMissionTagGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof SubMissionTagGetOneParamSchema>;
