import { PaginationSchema } from "@/core/types";

import {
  MissionCreateInputSchema,
  MissionOrderByWithAggregationInputSchema,
  MissionSchema,
  MissionUpdateInputSchema,
  MissionWhereInputSchema,
} from "@schema/index";
import { z } from "zod";

export const MissionItemSchema = MissionSchema;
export const MissionCreateSchema = MissionCreateInputSchema;
export const MissionUpdateSchema = MissionUpdateInputSchema;
export const MissionGetOneParamSchema = MissionWhereInputSchema;
export const MissionGetAllParamSchema = z.object({
  orderBy: MissionOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: MissionGetOneParamSchema.optional(),
});
export type TypeMissionCreate = z.infer<typeof MissionCreateSchema>;
export type TypeMissionUpdate = z.infer<typeof MissionUpdateSchema>;
export type TypeReturnItem = z.infer<typeof MissionItemSchema>;
export type TypeGetAllParam = z.infer<typeof MissionGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof MissionGetOneParamSchema>;
