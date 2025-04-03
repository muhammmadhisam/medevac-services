import { z } from "zod";
import { PaginationSchema } from "../../global";
import {
  PatientCreateInputSchema,
  PatientOrderByWithAggregationInputSchema,
  PatientSchema,
  PatientUpdateInputSchema,
  PatientWhereInputSchema,
} from "../prisma";

export const PatientItemSchema = PatientSchema;
export const PatientCreateSchema = PatientCreateInputSchema;
export const PatientUpdateSchema = PatientUpdateInputSchema;
export const PatientGetOneParamSchema = PatientWhereInputSchema;
export const PatientGetAllParamSchema = z.object({
  orderBy: PatientOrderByWithAggregationInputSchema.optional(),
  pagination: PaginationSchema,
  where: PatientGetOneParamSchema.optional(),
});
export type TypePatientCreate = z.infer<typeof PatientCreateSchema>;
export type TypePatientUpdate = z.infer<typeof PatientUpdateSchema>;
export type TypeReturnItem = z.infer<typeof PatientItemSchema>;
export type TypeGetAllParam = z.infer<typeof PatientGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof PatientGetOneParamSchema>;
