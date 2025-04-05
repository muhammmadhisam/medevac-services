import { z } from "zod";
import { PaginationSchema } from "../../global";
import {
  StationPatientCreateInputSchema,
  StationPatientOrderByWithAggregationInputSchema,
  StationPatientSchema,
  StationPatientUpdateInputSchema,
  StationPatientWhereInputSchema,
} from "../prisma";

export const StationPatientItemSchema = StationPatientSchema;
export const StationPatientCreateSchema = StationPatientCreateInputSchema;
export const StationPatientUpdateSchema = StationPatientUpdateInputSchema;
export const StationPatientGetOneParamSchema = StationPatientWhereInputSchema;
export const StationPatientGetAllParamSchema = z.object({
  orderBy: StationPatientOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: StationPatientGetOneParamSchema.optional(),
});
export type TypeStationPatientCreate = z.infer<
  typeof StationPatientCreateSchema
>;
export type TypeStationPatientUpdate = z.infer<
  typeof StationPatientUpdateSchema
>;
export type TypeReturnItem = z.infer<typeof StationPatientItemSchema>;
export type TypeGetAllParam = z.infer<typeof StationPatientGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof StationPatientGetOneParamSchema>;
