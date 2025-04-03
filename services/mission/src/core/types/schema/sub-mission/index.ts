import { PaginationSchema } from "@/core/types";

import { z } from "zod";
import {
  SubMissionCreateInputSchema,
  SubMissionOrderByWithAggregationInputSchema,
  SubMissionSchema,
  SubMissionUpdateInputSchema,
  SubMissionWhereInputSchema,
} from "../prisma";

export const SubMissionItemSchema = SubMissionSchema;
export const SubMissionCreateSchema = SubMissionCreateInputSchema;
export const SubMissionUpdateSchema = SubMissionUpdateInputSchema;
export const SubMissionGetOneParamSchema = SubMissionWhereInputSchema;
export const SubMissionGetAllParamSchema = z.object({
  orderBy: SubMissionOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: SubMissionGetOneParamSchema.optional(),
});
export type TypeSubMissionCreate = z.infer<typeof SubMissionCreateSchema>;
export type TypeSubMissionUpdate = z.infer<typeof SubMissionUpdateSchema>;
export type TypeReturnItem = z.infer<typeof SubMissionItemSchema>;
export type TypeGetAllParam = z.infer<typeof SubMissionGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof SubMissionGetOneParamSchema>;
