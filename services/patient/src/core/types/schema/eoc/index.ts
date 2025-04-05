import { z } from "zod";
import { PatientOptionalDefaultsSchema } from "../prisma";

const TempPatientSchema = PatientOptionalDefaultsSchema.omit({
  delete_date: true,
});
export const EocTriageViewSchema = z.object({
  dc_count: z.number(),
  non_dc_count: z.number(),
  non_triage_count: z.number(),
  patient_dc_data: TempPatientSchema.array(),
  patient_died: TempPatientSchema.array(),
  patient_go_home: TempPatientSchema.array(),
  patient_go_lost: TempPatientSchema.array(),
  patient_go_refer: TempPatientSchema.array(),
  patient_non_dc_data: TempPatientSchema.array(),
  patient_non_triage_data: TempPatientSchema.array(),
  patient_triage_data: TempPatientSchema.array(),
  total: z.number(),
  triage_count: z.number(),
});
export type TypeEocTriageView = z.infer<typeof EocTriageViewSchema>;
