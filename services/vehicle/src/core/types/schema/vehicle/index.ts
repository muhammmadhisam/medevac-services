import { PaginationSchema } from "@/core/types";

import { z } from "zod";
import {
  VehicleCreateInputSchema,
  VehicleOrderByWithAggregationInputSchema,
  VehicleSchema,
  VehicleUpdateInputSchema,
  VehicleWhereInputSchema,
} from "../prisma";

export const VehicleItemSchema = VehicleSchema;
export const VehicleCreateSchema = VehicleCreateInputSchema;
export const VehicleUpdateSchema = VehicleUpdateInputSchema;
export const VehicleGetOneParamSchema = VehicleWhereInputSchema;
export const VehicleGetAllParamSchema = z.object({
  orderBy: VehicleOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: VehicleGetOneParamSchema.optional(),
});
export type TypeVehicleCreate = z.infer<typeof VehicleCreateSchema>;
export type TypeVehicleUpdate = z.infer<typeof VehicleUpdateSchema>;
export type TypeReturnItem = z.infer<typeof VehicleItemSchema>;
export type TypeGetAllParam = z.infer<typeof VehicleGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof VehicleGetOneParamSchema>;
