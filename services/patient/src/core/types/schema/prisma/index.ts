import type { Prisma } from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const PatientScalarFieldEnumSchema = z.enum([
  "id",
  "gender",
  "first_name",
  "last_name",
  "qr_number",
  "age",
  "birthday",
  "id_card",
  "tel",
  "address",
  "group_blood",
  "image",
  "image_id_card",
  "allergy_drug",
  "allergy_food",
  "congenital_disease",
  "create_by",
  "update_by",
  "date_time_died",
  "date_time_go_home",
  "date_time_lost",
  "date_time_refer",
  "create_date",
  "update_date",
  "delete_date",
]);

export const HistoryScalarFieldEnumSchema = z.enum([
  "id",
  "symptom_details",
  "create_date",
  "update_date",
  "patient_id",
  "chief_complaint",
  "present_illness",
  "teatment",
  "create_by",
  "update_by",
  "physical_status",
  "triage_lavel",
]);

export const ExamScalarFieldEnumSchema = z.enum([
  "id",
  "element_id",
  "text",
  "image",
  "create_date",
  "update_date",
  "create_by",
  "update_by",
  "patient_id",
]);

export const StationPatientScalarFieldEnumSchema = z.enum([
  "id",
  "station",
  "description",
  "patient_id",
  "in_date",
  "out_date",
  "create_date",
  "update_date",
]);

export const TeatmentScalarFieldEnumSchema = z.enum([
  "id",
  "description",
  "chief_complaint",
  "present_illness",
  "physical_status",
  "triage_lavel",
  "patient_id",
  "create_by",
  "update_by",
  "create_date",
  "update_date",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const GroupBloodSchema = z.enum(["A", "B", "AB", "O"]);

export type GroupBloodType = `${z.infer<typeof GroupBloodSchema>}`;

export const GenderSchema = z.enum(["Male", "Female"]);

export type GenderType = `${z.infer<typeof GenderSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PATIENT SCHEMA
/////////////////////////////////////////

export const PatientSchema = z.object({
  address: z.string().nullish(),
  age: z.number().int().nullish(),
  allergy_drug: z.string().nullish(),
  allergy_food: z.string().nullish(),
  birthday: z.string().nullish(),
  congenital_disease: z.string().nullish(),
  create_by: z.string().nullish(),
  create_date: z.coerce.date(),
  date_time_died: z.coerce.date().nullish(),
  date_time_go_home: z.coerce.date().nullish(),
  date_time_lost: z.coerce.date().nullish(),
  date_time_refer: z.coerce.date().nullish(),
  delete_date: z.coerce.date().nullish(),
  first_name: z.string().nullish(),
  gender: GenderSchema,
  group_blood: GroupBloodSchema.nullish(),
  id: z.string().uuid(),
  id_card: z.string().nullish(),
  image: z.string().nullish(),
  image_id_card: z.string().nullish(),
  last_name: z.string().nullish(),
  qr_number: z.string().nullish(),
  tel: z.string().nullish(),
  update_by: z.string().nullish(),
  update_date: z.coerce.date(),
});

export type Patient = z.infer<typeof PatientSchema>;

/////////////////////////////////////////
// PATIENT PARTIAL SCHEMA
/////////////////////////////////////////

export const PatientPartialSchema = PatientSchema.partial();

export type PatientPartial = z.infer<typeof PatientPartialSchema>;

// PATIENT OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const PatientOptionalDefaultsSchema = PatientSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type PatientOptionalDefaults = z.infer<
  typeof PatientOptionalDefaultsSchema
>;

// PATIENT RELATION SCHEMA
// ------------------------------------------------------

export type PatientRelations = {
  History?: HistoryWithRelations | null;
  Exam: ExamWithRelations[];
  StationPatient: StationPatientWithRelations[];
  Teatment?: TeatmentWithRelations | null;
};

export type PatientWithRelations = z.infer<typeof PatientSchema> &
  PatientRelations;

export const PatientWithRelationsSchema: z.ZodType<PatientWithRelations>
  = PatientSchema.merge(
    z.object({
      Exam: z.lazy(() => ExamWithRelationsSchema).array(),
      History: z.lazy(() => HistoryWithRelationsSchema).nullish(),
      StationPatient: z.lazy(() => StationPatientWithRelationsSchema).array(),
      Teatment: z.lazy(() => TeatmentWithRelationsSchema).nullish(),
    }),
  );

// PATIENT OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type PatientOptionalDefaultsRelations = {
  History?: HistoryOptionalDefaultsWithRelations | null;
  Exam: ExamOptionalDefaultsWithRelations[];
  StationPatient: StationPatientOptionalDefaultsWithRelations[];
  Teatment?: TeatmentOptionalDefaultsWithRelations | null;
};

export type PatientOptionalDefaultsWithRelations = z.infer<
  typeof PatientOptionalDefaultsSchema
> &
PatientOptionalDefaultsRelations;

export const PatientOptionalDefaultsWithRelationsSchema: z.ZodType<PatientOptionalDefaultsWithRelations>
  = PatientOptionalDefaultsSchema.merge(
    z.object({
      Exam: z.lazy(() => ExamOptionalDefaultsWithRelationsSchema).array(),
      History: z
        .lazy(() => HistoryOptionalDefaultsWithRelationsSchema)
        .nullish(),
      StationPatient: z
        .lazy(() => StationPatientOptionalDefaultsWithRelationsSchema)
        .array(),
      Teatment: z
        .lazy(() => TeatmentOptionalDefaultsWithRelationsSchema)
        .nullish(),
    }),
  );

// PATIENT PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type PatientPartialRelations = {
  History?: HistoryPartialWithRelations | null;
  Exam?: ExamPartialWithRelations[];
  StationPatient?: StationPatientPartialWithRelations[];
  Teatment?: TeatmentPartialWithRelations | null;
};

export type PatientPartialWithRelations = z.infer<typeof PatientPartialSchema> &
  PatientPartialRelations;

export const PatientPartialWithRelationsSchema: z.ZodType<PatientPartialWithRelations>
  = PatientPartialSchema.merge(
    z.object({
      Exam: z.lazy(() => ExamPartialWithRelationsSchema).array(),
      History: z.lazy(() => HistoryPartialWithRelationsSchema).nullish(),
      StationPatient: z
        .lazy(() => StationPatientPartialWithRelationsSchema)
        .array(),
      Teatment: z.lazy(() => TeatmentPartialWithRelationsSchema).nullish(),
    }),
  ).partial();

export type PatientOptionalDefaultsWithPartialRelations = z.infer<
  typeof PatientOptionalDefaultsSchema
> &
PatientPartialRelations;

export const PatientOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PatientOptionalDefaultsWithPartialRelations>
  = PatientOptionalDefaultsSchema.merge(
    z
      .object({
        Exam: z.lazy(() => ExamPartialWithRelationsSchema).array(),
        History: z.lazy(() => HistoryPartialWithRelationsSchema).nullish(),
        StationPatient: z
          .lazy(() => StationPatientPartialWithRelationsSchema)
          .array(),
        Teatment: z.lazy(() => TeatmentPartialWithRelationsSchema).nullish(),
      })
      .partial(),
  );

export type PatientWithPartialRelations = z.infer<typeof PatientSchema> &
  PatientPartialRelations;

export const PatientWithPartialRelationsSchema: z.ZodType<PatientWithPartialRelations>
  = PatientSchema.merge(
    z
      .object({
        Exam: z.lazy(() => ExamPartialWithRelationsSchema).array(),
        History: z.lazy(() => HistoryPartialWithRelationsSchema).nullish(),
        StationPatient: z
          .lazy(() => StationPatientPartialWithRelationsSchema)
          .array(),
        Teatment: z.lazy(() => TeatmentPartialWithRelationsSchema).nullish(),
      })
      .partial(),
  );

/////////////////////////////////////////
// HISTORY SCHEMA
/////////////////////////////////////////

export const HistorySchema = z.object({
  chief_complaint: z.string(),
  create_by: z.string().nullish(),
  create_date: z.coerce.date(),
  id: z.string().uuid(),
  patient_id: z.string(),
  physical_status: z.string().nullish(),
  present_illness: z.string(),
  symptom_details: z.string(),
  teatment: z.string(),
  triage_lavel: z.string().nullish(),
  update_by: z.string().nullish(),
  update_date: z.coerce.date(),
});

export type History = z.infer<typeof HistorySchema>;

/////////////////////////////////////////
// HISTORY PARTIAL SCHEMA
/////////////////////////////////////////

export const HistoryPartialSchema = HistorySchema.partial();

export type HistoryPartial = z.infer<typeof HistoryPartialSchema>;

// HISTORY OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const HistoryOptionalDefaultsSchema = HistorySchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type HistoryOptionalDefaults = z.infer<
  typeof HistoryOptionalDefaultsSchema
>;

// HISTORY RELATION SCHEMA
// ------------------------------------------------------

export type HistoryRelations = {
  Patient: PatientWithRelations;
};

export type HistoryWithRelations = z.infer<typeof HistorySchema> &
  HistoryRelations;

export const HistoryWithRelationsSchema: z.ZodType<HistoryWithRelations>
  = HistorySchema.merge(
    z.object({
      Patient: z.lazy(() => PatientWithRelationsSchema),
    }),
  );

// HISTORY OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type HistoryOptionalDefaultsRelations = {
  Patient: PatientOptionalDefaultsWithRelations;
};

export type HistoryOptionalDefaultsWithRelations = z.infer<
  typeof HistoryOptionalDefaultsSchema
> &
HistoryOptionalDefaultsRelations;

export const HistoryOptionalDefaultsWithRelationsSchema: z.ZodType<HistoryOptionalDefaultsWithRelations>
  = HistoryOptionalDefaultsSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientOptionalDefaultsWithRelationsSchema),
    }),
  );

// HISTORY PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type HistoryPartialRelations = {
  Patient?: PatientPartialWithRelations;
};

export type HistoryPartialWithRelations = z.infer<typeof HistoryPartialSchema> &
  HistoryPartialRelations;

export const HistoryPartialWithRelationsSchema: z.ZodType<HistoryPartialWithRelations>
  = HistoryPartialSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientPartialWithRelationsSchema),
    }),
  ).partial();

export type HistoryOptionalDefaultsWithPartialRelations = z.infer<
  typeof HistoryOptionalDefaultsSchema
> &
HistoryPartialRelations;

export const HistoryOptionalDefaultsWithPartialRelationsSchema: z.ZodType<HistoryOptionalDefaultsWithPartialRelations>
  = HistoryOptionalDefaultsSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema),
      })
      .partial(),
  );

export type HistoryWithPartialRelations = z.infer<typeof HistorySchema> &
  HistoryPartialRelations;

export const HistoryWithPartialRelationsSchema: z.ZodType<HistoryWithPartialRelations>
  = HistorySchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// EXAM SCHEMA
/////////////////////////////////////////

export const ExamSchema = z.object({
  create_by: z.string().nullish(),
  create_date: z.coerce.date(),
  element_id: z.string(),
  id: z.string().uuid(),
  image: z.string().nullish(),
  patient_id: z.string().nullish(),
  text: z.string(),
  update_by: z.string().nullish(),
  update_date: z.coerce.date(),
});

export type Exam = z.infer<typeof ExamSchema>;

/////////////////////////////////////////
// EXAM PARTIAL SCHEMA
/////////////////////////////////////////

export const ExamPartialSchema = ExamSchema.partial();

export type ExamPartial = z.infer<typeof ExamPartialSchema>;

// EXAM OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const ExamOptionalDefaultsSchema = ExamSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type ExamOptionalDefaults = z.infer<typeof ExamOptionalDefaultsSchema>;

// EXAM RELATION SCHEMA
// ------------------------------------------------------

export type ExamRelations = {
  Patient?: PatientWithRelations | null;
};

export type ExamWithRelations = z.infer<typeof ExamSchema> & ExamRelations;

export const ExamWithRelationsSchema: z.ZodType<ExamWithRelations>
  = ExamSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientWithRelationsSchema).nullish(),
    }),
  );

// EXAM OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type ExamOptionalDefaultsRelations = {
  Patient?: PatientOptionalDefaultsWithRelations | null;
};

export type ExamOptionalDefaultsWithRelations = z.infer<
  typeof ExamOptionalDefaultsSchema
> &
ExamOptionalDefaultsRelations;

export const ExamOptionalDefaultsWithRelationsSchema: z.ZodType<ExamOptionalDefaultsWithRelations>
  = ExamOptionalDefaultsSchema.merge(
    z.object({
      Patient: z
        .lazy(() => PatientOptionalDefaultsWithRelationsSchema)
        .nullish(),
    }),
  );

// EXAM PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type ExamPartialRelations = {
  Patient?: PatientPartialWithRelations | null;
};

export type ExamPartialWithRelations = z.infer<typeof ExamPartialSchema> &
  ExamPartialRelations;

export const ExamPartialWithRelationsSchema: z.ZodType<ExamPartialWithRelations>
  = ExamPartialSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientPartialWithRelationsSchema).nullish(),
    }),
  ).partial();

export type ExamOptionalDefaultsWithPartialRelations = z.infer<
  typeof ExamOptionalDefaultsSchema
> &
ExamPartialRelations;

export const ExamOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ExamOptionalDefaultsWithPartialRelations>
  = ExamOptionalDefaultsSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema).nullish(),
      })
      .partial(),
  );

export type ExamWithPartialRelations = z.infer<typeof ExamSchema> &
  ExamPartialRelations;

export const ExamWithPartialRelationsSchema: z.ZodType<ExamWithPartialRelations>
  = ExamSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema).nullish(),
      })
      .partial(),
  );

/////////////////////////////////////////
// STATION PATIENT SCHEMA
/////////////////////////////////////////

export const StationPatientSchema = z.object({
  create_date: z.coerce.date(),
  description: z.string().nullish(),
  id: z.string().uuid(),
  in_date: z.coerce.date(),
  out_date: z.coerce.date().nullish(),
  patient_id: z.string(),
  station: z.string(),
  update_date: z.coerce.date(),
});

export type StationPatient = z.infer<typeof StationPatientSchema>;

/////////////////////////////////////////
// STATION PATIENT PARTIAL SCHEMA
/////////////////////////////////////////

export const StationPatientPartialSchema = StationPatientSchema.partial();

export type StationPatientPartial = z.infer<typeof StationPatientPartialSchema>;

// STATION PATIENT OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const StationPatientOptionalDefaultsSchema = StationPatientSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    in_date: z.coerce.date().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type StationPatientOptionalDefaults = z.infer<
  typeof StationPatientOptionalDefaultsSchema
>;

// STATION PATIENT RELATION SCHEMA
// ------------------------------------------------------

export type StationPatientRelations = {
  Patient: PatientWithRelations;
};

export type StationPatientWithRelations = z.infer<typeof StationPatientSchema> &
  StationPatientRelations;

export const StationPatientWithRelationsSchema: z.ZodType<StationPatientWithRelations>
  = StationPatientSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientWithRelationsSchema),
    }),
  );

// STATION PATIENT OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type StationPatientOptionalDefaultsRelations = {
  Patient: PatientOptionalDefaultsWithRelations;
};

export type StationPatientOptionalDefaultsWithRelations = z.infer<
  typeof StationPatientOptionalDefaultsSchema
> &
StationPatientOptionalDefaultsRelations;

export const StationPatientOptionalDefaultsWithRelationsSchema: z.ZodType<StationPatientOptionalDefaultsWithRelations>
  = StationPatientOptionalDefaultsSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientOptionalDefaultsWithRelationsSchema),
    }),
  );

// STATION PATIENT PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type StationPatientPartialRelations = {
  Patient?: PatientPartialWithRelations;
};

export type StationPatientPartialWithRelations = z.infer<
  typeof StationPatientPartialSchema
> &
StationPatientPartialRelations;

export const StationPatientPartialWithRelationsSchema: z.ZodType<StationPatientPartialWithRelations>
  = StationPatientPartialSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientPartialWithRelationsSchema),
    }),
  ).partial();

export type StationPatientOptionalDefaultsWithPartialRelations = z.infer<
  typeof StationPatientOptionalDefaultsSchema
> &
StationPatientPartialRelations;

export const StationPatientOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StationPatientOptionalDefaultsWithPartialRelations>
  = StationPatientOptionalDefaultsSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema),
      })
      .partial(),
  );

export type StationPatientWithPartialRelations = z.infer<
  typeof StationPatientSchema
> &
StationPatientPartialRelations;

export const StationPatientWithPartialRelationsSchema: z.ZodType<StationPatientWithPartialRelations>
  = StationPatientSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// TEATMENT SCHEMA
/////////////////////////////////////////

export const TeatmentSchema = z.object({
  chief_complaint: z.string(),
  create_by: z.string().nullish(),
  create_date: z.coerce.date(),
  description: z.string().nullish(),
  id: z.string().uuid(),
  patient_id: z.string(),
  physical_status: z.string().nullish(),
  present_illness: z.string(),
  triage_lavel: z.string().nullish(),
  update_by: z.string().nullish(),
  update_date: z.coerce.date(),
});

export type Teatment = z.infer<typeof TeatmentSchema>;

/////////////////////////////////////////
// TEATMENT PARTIAL SCHEMA
/////////////////////////////////////////

export const TeatmentPartialSchema = TeatmentSchema.partial();

export type TeatmentPartial = z.infer<typeof TeatmentPartialSchema>;

// TEATMENT OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const TeatmentOptionalDefaultsSchema = TeatmentSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type TeatmentOptionalDefaults = z.infer<
  typeof TeatmentOptionalDefaultsSchema
>;

// TEATMENT RELATION SCHEMA
// ------------------------------------------------------

export type TeatmentRelations = {
  Patient: PatientWithRelations;
};

export type TeatmentWithRelations = z.infer<typeof TeatmentSchema> &
  TeatmentRelations;

export const TeatmentWithRelationsSchema: z.ZodType<TeatmentWithRelations>
  = TeatmentSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientWithRelationsSchema),
    }),
  );

// TEATMENT OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type TeatmentOptionalDefaultsRelations = {
  Patient: PatientOptionalDefaultsWithRelations;
};

export type TeatmentOptionalDefaultsWithRelations = z.infer<
  typeof TeatmentOptionalDefaultsSchema
> &
TeatmentOptionalDefaultsRelations;

export const TeatmentOptionalDefaultsWithRelationsSchema: z.ZodType<TeatmentOptionalDefaultsWithRelations>
  = TeatmentOptionalDefaultsSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientOptionalDefaultsWithRelationsSchema),
    }),
  );

// TEATMENT PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type TeatmentPartialRelations = {
  Patient?: PatientPartialWithRelations;
};

export type TeatmentPartialWithRelations = z.infer<
  typeof TeatmentPartialSchema
> &
TeatmentPartialRelations;

export const TeatmentPartialWithRelationsSchema: z.ZodType<TeatmentPartialWithRelations>
  = TeatmentPartialSchema.merge(
    z.object({
      Patient: z.lazy(() => PatientPartialWithRelationsSchema),
    }),
  ).partial();

export type TeatmentOptionalDefaultsWithPartialRelations = z.infer<
  typeof TeatmentOptionalDefaultsSchema
> &
TeatmentPartialRelations;

export const TeatmentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TeatmentOptionalDefaultsWithPartialRelations>
  = TeatmentOptionalDefaultsSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema),
      })
      .partial(),
  );

export type TeatmentWithPartialRelations = z.infer<typeof TeatmentSchema> &
  TeatmentPartialRelations;

export const TeatmentWithPartialRelationsSchema: z.ZodType<TeatmentWithPartialRelations>
  = TeatmentSchema.merge(
    z
      .object({
        Patient: z.lazy(() => PatientPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PATIENT
// ------------------------------------------------------

export const PatientIncludeSchema: z.ZodType<Prisma.PatientInclude> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => PatientCountOutputTypeArgsSchema)])
      .optional(),
    Exam: z
      .union([z.boolean(), z.lazy(() => ExamFindManyArgsSchema)])
      .optional(),
    History: z.union([z.boolean(), z.lazy(() => HistoryArgsSchema)]).optional(),
    StationPatient: z
      .union([z.boolean(), z.lazy(() => StationPatientFindManyArgsSchema)])
      .optional(),
    Teatment: z
      .union([z.boolean(), z.lazy(() => TeatmentArgsSchema)])
      .optional(),
  })
  .strict();

export const PatientArgsSchema: z.ZodType<Prisma.PatientDefaultArgs> = z
  .object({
    include: z.lazy(() => PatientIncludeSchema).optional(),
    select: z.lazy(() => PatientSelectSchema).optional(),
  })
  .strict();

export const PatientCountOutputTypeArgsSchema: z.ZodType<Prisma.PatientCountOutputTypeDefaultArgs>
  = z
    .object({
      select: z.lazy(() => PatientCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const PatientCountOutputTypeSelectSchema: z.ZodType<Prisma.PatientCountOutputTypeSelect>
  = z
    .object({
      Exam: z.boolean().optional(),
      StationPatient: z.boolean().optional(),
    })
    .strict();

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => PatientCountOutputTypeArgsSchema)])
      .optional(),
    address: z.boolean().optional(),
    age: z.boolean().optional(),
    allergy_drug: z.boolean().optional(),
    allergy_food: z.boolean().optional(),
    birthday: z.boolean().optional(),
    congenital_disease: z.boolean().optional(),
    create_by: z.boolean().optional(),
    create_date: z.boolean().optional(),
    date_time_died: z.boolean().optional(),
    date_time_go_home: z.boolean().optional(),
    date_time_lost: z.boolean().optional(),
    date_time_refer: z.boolean().optional(),
    delete_date: z.boolean().optional(),
    Exam: z
      .union([z.boolean(), z.lazy(() => ExamFindManyArgsSchema)])
      .optional(),
    first_name: z.boolean().optional(),
    gender: z.boolean().optional(),
    group_blood: z.boolean().optional(),
    History: z.union([z.boolean(), z.lazy(() => HistoryArgsSchema)]).optional(),
    id: z.boolean().optional(),
    id_card: z.boolean().optional(),
    image: z.boolean().optional(),
    image_id_card: z.boolean().optional(),
    last_name: z.boolean().optional(),
    qr_number: z.boolean().optional(),
    StationPatient: z
      .union([z.boolean(), z.lazy(() => StationPatientFindManyArgsSchema)])
      .optional(),
    Teatment: z
      .union([z.boolean(), z.lazy(() => TeatmentArgsSchema)])
      .optional(),
    tel: z.boolean().optional(),
    update_by: z.boolean().optional(),
    update_date: z.boolean().optional(),
  })
  .strict();

// HISTORY
// ------------------------------------------------------

export const HistoryIncludeSchema: z.ZodType<Prisma.HistoryInclude> = z
  .object({
    Patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
  })
  .strict();

export const HistoryArgsSchema: z.ZodType<Prisma.HistoryDefaultArgs> = z
  .object({
    include: z.lazy(() => HistoryIncludeSchema).optional(),
    select: z.lazy(() => HistorySelectSchema).optional(),
  })
  .strict();

export const HistorySelectSchema: z.ZodType<Prisma.HistorySelect> = z
  .object({
    chief_complaint: z.boolean().optional(),
    create_by: z.boolean().optional(),
    create_date: z.boolean().optional(),
    id: z.boolean().optional(),
    Patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
    patient_id: z.boolean().optional(),
    physical_status: z.boolean().optional(),
    present_illness: z.boolean().optional(),
    symptom_details: z.boolean().optional(),
    teatment: z.boolean().optional(),
    triage_lavel: z.boolean().optional(),
    update_by: z.boolean().optional(),
    update_date: z.boolean().optional(),
  })
  .strict();

// EXAM
// ------------------------------------------------------

export const ExamIncludeSchema: z.ZodType<Prisma.ExamInclude> = z
  .object({
    Patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
  })
  .strict();

export const ExamArgsSchema: z.ZodType<Prisma.ExamDefaultArgs> = z
  .object({
    include: z.lazy(() => ExamIncludeSchema).optional(),
    select: z.lazy(() => ExamSelectSchema).optional(),
  })
  .strict();

export const ExamSelectSchema: z.ZodType<Prisma.ExamSelect> = z
  .object({
    create_by: z.boolean().optional(),
    create_date: z.boolean().optional(),
    element_id: z.boolean().optional(),
    id: z.boolean().optional(),
    image: z.boolean().optional(),
    Patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
    patient_id: z.boolean().optional(),
    text: z.boolean().optional(),
    update_by: z.boolean().optional(),
    update_date: z.boolean().optional(),
  })
  .strict();

// STATION PATIENT
// ------------------------------------------------------

export const StationPatientIncludeSchema: z.ZodType<Prisma.StationPatientInclude>
  = z
    .object({
      Patient: z
        .union([z.boolean(), z.lazy(() => PatientArgsSchema)])
        .optional(),
    })
    .strict();

export const StationPatientArgsSchema: z.ZodType<Prisma.StationPatientDefaultArgs>
  = z
    .object({
      include: z.lazy(() => StationPatientIncludeSchema).optional(),
      select: z.lazy(() => StationPatientSelectSchema).optional(),
    })
    .strict();

export const StationPatientSelectSchema: z.ZodType<Prisma.StationPatientSelect>
  = z
    .object({
      create_date: z.boolean().optional(),
      description: z.boolean().optional(),
      id: z.boolean().optional(),
      in_date: z.boolean().optional(),
      out_date: z.boolean().optional(),
      Patient: z
        .union([z.boolean(), z.lazy(() => PatientArgsSchema)])
        .optional(),
      patient_id: z.boolean().optional(),
      station: z.boolean().optional(),
      update_date: z.boolean().optional(),
    })
    .strict();

// TEATMENT
// ------------------------------------------------------

export const TeatmentIncludeSchema: z.ZodType<Prisma.TeatmentInclude> = z
  .object({
    Patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
  })
  .strict();

export const TeatmentArgsSchema: z.ZodType<Prisma.TeatmentDefaultArgs> = z
  .object({
    include: z.lazy(() => TeatmentIncludeSchema).optional(),
    select: z.lazy(() => TeatmentSelectSchema).optional(),
  })
  .strict();

export const TeatmentSelectSchema: z.ZodType<Prisma.TeatmentSelect> = z
  .object({
    chief_complaint: z.boolean().optional(),
    create_by: z.boolean().optional(),
    create_date: z.boolean().optional(),
    description: z.boolean().optional(),
    id: z.boolean().optional(),
    Patient: z.union([z.boolean(), z.lazy(() => PatientArgsSchema)]).optional(),
    patient_id: z.boolean().optional(),
    physical_status: z.boolean().optional(),
    present_illness: z.boolean().optional(),
    triage_lavel: z.boolean().optional(),
    update_by: z.boolean().optional(),
    update_date: z.boolean().optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PatientWhereInputSchema: z.ZodType<Prisma.PatientWhereInput> = z
  .object({
    address: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    age: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    allergy_drug: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    allergy_food: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    AND: z
      .union([
        z.lazy(() => PatientWhereInputSchema),
        z.lazy(() => PatientWhereInputSchema).array(),
      ])
      .optional(),
    birthday: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    congenital_disease: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    create_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    date_time_died: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    date_time_go_home: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    date_time_lost: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    date_time_refer: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    delete_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    Exam: z.lazy(() => ExamListRelationFilterSchema).optional(),
    first_name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    gender: z
      .union([z.lazy(() => EnumGenderFilterSchema), z.lazy(() => GenderSchema)])
      .optional(),
    group_blood: z
      .union([
        z.lazy(() => EnumGroupBloodNullableFilterSchema),
        z.lazy(() => GroupBloodSchema),
      ])
      .optional()
      .nullable(),
    History: z
      .union([
        z.lazy(() => HistoryNullableScalarRelationFilterSchema),
        z.lazy(() => HistoryWhereInputSchema),
      ])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    id_card: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    image_id_card: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    last_name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => PatientWhereInputSchema),
        z.lazy(() => PatientWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PatientWhereInputSchema)
      .array()
      .optional(),
    qr_number: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    StationPatient: z
      .lazy(() => StationPatientListRelationFilterSchema)
      .optional(),
    Teatment: z
      .union([
        z.lazy(() => TeatmentNullableScalarRelationFilterSchema),
        z.lazy(() => TeatmentWhereInputSchema),
      ])
      .optional()
      .nullable(),
    tel: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput>
  = z
    .object({
      address: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      age: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      allergy_drug: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      allergy_food: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      birthday: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      congenital_disease: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_died: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_go_home: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_lost: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_refer: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      delete_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      Exam: z.lazy(() => ExamOrderByRelationAggregateInputSchema).optional(),
      first_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      gender: z.lazy(() => SortOrderSchema).optional(),
      group_blood: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      History: z.lazy(() => HistoryOrderByWithRelationInputSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image_id_card: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      last_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      qr_number: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      StationPatient: z
        .lazy(() => StationPatientOrderByRelationAggregateInputSchema)
        .optional(),
      Teatment: z.lazy(() => TeatmentOrderByWithRelationInputSchema).optional(),
      tel: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientWhereUniqueInputSchema: z.ZodType<Prisma.PatientWhereUniqueInput>
  = z
    .object({
      id: z.string().uuid(),
    })
    .and(
      z
        .object({
          address: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          age: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          allergy_drug: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          allergy_food: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          AND: z
            .union([
              z.lazy(() => PatientWhereInputSchema),
              z.lazy(() => PatientWhereInputSchema).array(),
            ])
            .optional(),
          birthday: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          congenital_disease: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          create_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          date_time_died: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          date_time_go_home: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          date_time_lost: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          date_time_refer: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          delete_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          Exam: z.lazy(() => ExamListRelationFilterSchema).optional(),
          first_name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          gender: z
            .union([
              z.lazy(() => EnumGenderFilterSchema),
              z.lazy(() => GenderSchema),
            ])
            .optional(),
          group_blood: z
            .union([
              z.lazy(() => EnumGroupBloodNullableFilterSchema),
              z.lazy(() => GroupBloodSchema),
            ])
            .optional()
            .nullable(),
          History: z
            .union([
              z.lazy(() => HistoryNullableScalarRelationFilterSchema),
              z.lazy(() => HistoryWhereInputSchema),
            ])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          id_card: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          image_id_card: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          last_name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          NOT: z
            .union([
              z.lazy(() => PatientWhereInputSchema),
              z.lazy(() => PatientWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PatientWhereInputSchema)
            .array()
            .optional(),
          qr_number: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          StationPatient: z
            .lazy(() => StationPatientListRelationFilterSchema)
            .optional(),
          Teatment: z
            .union([
              z.lazy(() => TeatmentNullableScalarRelationFilterSchema),
              z.lazy(() => TeatmentWhereInputSchema),
            ])
            .optional()
            .nullable(),
          tel: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const PatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput>
  = z
    .object({
      _avg: z.lazy(() => PatientAvgOrderByAggregateInputSchema).optional(),
      _count: z.lazy(() => PatientCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PatientMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PatientMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => PatientSumOrderByAggregateInputSchema).optional(),
      address: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      age: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      allergy_drug: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      allergy_food: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      birthday: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      congenital_disease: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_died: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_go_home: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_lost: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time_refer: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      delete_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      first_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      gender: z.lazy(() => SortOrderSchema).optional(),
      group_blood: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image_id_card: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      last_name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      qr_number: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      tel: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput>
  = z
    .object({
      address: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      AND: z
        .union([
          z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      birthday: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => EnumGenderWithAggregatesFilterSchema),
          z.lazy(() => GenderSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => EnumGroupBloodNullableWithAggregatesFilterSchema),
          z.lazy(() => GroupBloodSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      id_card: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      NOT: z
        .union([
          z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PatientScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      qr_number: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      tel: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const HistoryWhereInputSchema: z.ZodType<Prisma.HistoryWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => HistoryWhereInputSchema),
        z.lazy(() => HistoryWhereInputSchema).array(),
      ])
      .optional(),
    chief_complaint: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    create_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => HistoryWhereInputSchema),
        z.lazy(() => HistoryWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => HistoryWhereInputSchema)
      .array()
      .optional(),
    Patient: z
      .union([
        z.lazy(() => PatientScalarRelationFilterSchema),
        z.lazy(() => PatientWhereInputSchema),
      ])
      .optional(),
    patient_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    physical_status: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    present_illness: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    symptom_details: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    teatment: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    triage_lavel: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();

export const HistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.HistoryOrderByWithRelationInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      Patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      symptom_details: z.lazy(() => SortOrderSchema).optional(),
      teatment: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryWhereUniqueInputSchema: z.ZodType<Prisma.HistoryWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        patient_id: z.string(),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        patient_id: z.string(),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => HistoryWhereInputSchema),
              z.lazy(() => HistoryWhereInputSchema).array(),
            ])
            .optional(),
          chief_complaint: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          create_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          NOT: z
            .union([
              z.lazy(() => HistoryWhereInputSchema),
              z.lazy(() => HistoryWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => HistoryWhereInputSchema)
            .array()
            .optional(),
          Patient: z
            .union([
              z.lazy(() => PatientScalarRelationFilterSchema),
              z.lazy(() => PatientWhereInputSchema),
            ])
            .optional(),
          patient_id: z.string().optional(),
          physical_status: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          present_illness: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          symptom_details: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          teatment: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          triage_lavel: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const HistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.HistoryOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => HistoryCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => HistoryMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => HistoryMinOrderByAggregateInputSchema).optional(),
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      symptom_details: z.lazy(() => SortOrderSchema).optional(),
      teatment: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HistoryScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema),
          z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      chief_complaint: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      create_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema),
          z.lazy(() => HistoryScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => HistoryScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      physical_status: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      symptom_details: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      teatment: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      triage_lavel: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamWhereInputSchema: z.ZodType<Prisma.ExamWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ExamWhereInputSchema),
        z.lazy(() => ExamWhereInputSchema).array(),
      ])
      .optional(),
    create_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    element_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => ExamWhereInputSchema),
        z.lazy(() => ExamWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ExamWhereInputSchema)
      .array()
      .optional(),
    Patient: z
      .union([
        z.lazy(() => PatientNullableScalarRelationFilterSchema),
        z.lazy(() => PatientWhereInputSchema),
      ])
      .optional()
      .nullable(),
    patient_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    update_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();

export const ExamOrderByWithRelationInputSchema: z.ZodType<Prisma.ExamOrderByWithRelationInput>
  = z
    .object({
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      element_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      Patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
      patient_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ExamWhereUniqueInputSchema: z.ZodType<Prisma.ExamWhereUniqueInput>
  = z
    .object({
      id: z.string().uuid(),
    })
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => ExamWhereInputSchema),
              z.lazy(() => ExamWhereInputSchema).array(),
            ])
            .optional(),
          create_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          element_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          id: z.string().uuid().optional(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          NOT: z
            .union([
              z.lazy(() => ExamWhereInputSchema),
              z.lazy(() => ExamWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ExamWhereInputSchema)
            .array()
            .optional(),
          Patient: z
            .union([
              z.lazy(() => PatientNullableScalarRelationFilterSchema),
              z.lazy(() => PatientWhereInputSchema),
            ])
            .optional()
            .nullable(),
          patient_id: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          update_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const ExamOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExamOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => ExamCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ExamMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ExamMinOrderByAggregateInputSchema).optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      element_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ExamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExamScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => ExamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ExamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      create_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      NOT: z
        .union([
          z.lazy(() => ExamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ExamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ExamScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientWhereInputSchema: z.ZodType<Prisma.StationPatientWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => StationPatientWhereInputSchema),
          z.lazy(() => StationPatientWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      in_date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StationPatientWhereInputSchema),
          z.lazy(() => StationPatientWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StationPatientWhereInputSchema)
        .array()
        .optional(),
      out_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      Patient: z
        .union([
          z.lazy(() => PatientScalarRelationFilterSchema),
          z.lazy(() => PatientWhereInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      station: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientOrderByWithRelationInputSchema: z.ZodType<Prisma.StationPatientOrderByWithRelationInput>
  = z
    .object({
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      in_date: z.lazy(() => SortOrderSchema).optional(),
      out_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      Patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      station: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StationPatientWhereUniqueInputSchema: z.ZodType<Prisma.StationPatientWhereUniqueInput>
  = z
    .object({
      id: z.string().uuid(),
    })
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => StationPatientWhereInputSchema),
              z.lazy(() => StationPatientWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          in_date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          NOT: z
            .union([
              z.lazy(() => StationPatientWhereInputSchema),
              z.lazy(() => StationPatientWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => StationPatientWhereInputSchema)
            .array()
            .optional(),
          out_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          Patient: z
            .union([
              z.lazy(() => PatientScalarRelationFilterSchema),
              z.lazy(() => PatientWhereInputSchema),
            ])
            .optional(),
          patient_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          station: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const StationPatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.StationPatientOrderByWithAggregationInput>
  = z
    .object({
      _count: z
        .lazy(() => StationPatientCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => StationPatientMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => StationPatientMinOrderByAggregateInputSchema)
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      in_date: z.lazy(() => SortOrderSchema).optional(),
      out_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      station: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StationPatientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StationPatientScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => StationPatientScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => StationPatientScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      in_date: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StationPatientScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => StationPatientScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StationPatientScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      out_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      patient_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      station: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentWhereInputSchema: z.ZodType<Prisma.TeatmentWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TeatmentWhereInputSchema),
        z.lazy(() => TeatmentWhereInputSchema).array(),
      ])
      .optional(),
    chief_complaint: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    create_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => TeatmentWhereInputSchema),
        z.lazy(() => TeatmentWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TeatmentWhereInputSchema)
      .array()
      .optional(),
    Patient: z
      .union([
        z.lazy(() => PatientScalarRelationFilterSchema),
        z.lazy(() => PatientWhereInputSchema),
      ])
      .optional(),
    patient_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    physical_status: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    present_illness: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    triage_lavel: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_by: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();

export const TeatmentOrderByWithRelationInputSchema: z.ZodType<Prisma.TeatmentOrderByWithRelationInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      Patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeatmentWhereUniqueInputSchema: z.ZodType<Prisma.TeatmentWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        patient_id: z.string(),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        patient_id: z.string(),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => TeatmentWhereInputSchema),
              z.lazy(() => TeatmentWhereInputSchema).array(),
            ])
            .optional(),
          chief_complaint: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          create_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          NOT: z
            .union([
              z.lazy(() => TeatmentWhereInputSchema),
              z.lazy(() => TeatmentWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TeatmentWhereInputSchema)
            .array()
            .optional(),
          Patient: z
            .union([
              z.lazy(() => PatientScalarRelationFilterSchema),
              z.lazy(() => PatientWhereInputSchema),
            ])
            .optional(),
          patient_id: z.string().optional(),
          physical_status: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          present_illness: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          triage_lavel: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_by: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const TeatmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeatmentOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => TeatmentCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TeatmentMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TeatmentMinOrderByAggregateInputSchema).optional(),
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeatmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeatmentScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => TeatmentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeatmentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      chief_complaint: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      create_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeatmentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeatmentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeatmentScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      physical_status: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      triage_lavel: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z
  .object({
    address: z.string().optional().nullable(),
    age: z.number().int().optional().nullable(),
    allergy_drug: z.string().optional().nullable(),
    allergy_food: z.string().optional().nullable(),
    birthday: z.string().optional().nullable(),
    congenital_disease: z.string().optional().nullable(),
    create_by: z.string().optional().nullable(),
    create_date: z.coerce.date().optional().nullable(),
    date_time_died: z.coerce.date().optional().nullable(),
    date_time_go_home: z.coerce.date().optional().nullable(),
    date_time_lost: z.coerce.date().optional().nullable(),
    date_time_refer: z.coerce.date().optional().nullable(),
    delete_date: z.coerce.date().optional().nullable(),
    Exam: z
      .lazy(() => ExamCreateNestedManyWithoutPatientInputSchema)
      .optional(),
    first_name: z.string().optional().nullable(),
    gender: z.lazy(() => GenderSchema),
    group_blood: z
      .lazy(() => GroupBloodSchema)
      .optional()
      .nullable(),
    History: z
      .lazy(() => HistoryCreateNestedOneWithoutPatientInputSchema)
      .optional(),
    id: z.string().uuid().optional(),
    id_card: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    image_id_card: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
    qr_number: z.string().optional().nullable(),
    StationPatient: z
      .lazy(() => StationPatientCreateNestedManyWithoutPatientInputSchema)
      .optional(),
    Teatment: z
      .lazy(() => TeatmentCreateNestedOneWithoutPatientInputSchema)
      .optional(),
    tel: z.string().optional().nullable(),
    update_by: z.string().optional().nullable(),
    update_date: z.coerce.date().optional().nullable(),
  })
  .strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamUncheckedCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedCreateNestedManyWithoutPatientInputSchema,
        )
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z
  .object({
    address: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    age: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    allergy_drug: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    allergy_food: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    birthday: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    congenital_disease: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    create_by: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    create_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    date_time_died: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    date_time_go_home: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    date_time_lost: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    date_time_refer: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    delete_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    Exam: z
      .lazy(() => ExamUpdateManyWithoutPatientNestedInputSchema)
      .optional(),
    first_name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    gender: z
      .union([
        z.lazy(() => GenderSchema),
        z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    group_blood: z
      .union([
        z.lazy(() => GroupBloodSchema),
        z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    History: z
      .lazy(() => HistoryUpdateOneWithoutPatientNestedInputSchema)
      .optional(),
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    id_card: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image_id_card: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    last_name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    qr_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    StationPatient: z
      .lazy(() => StationPatientUpdateManyWithoutPatientNestedInputSchema)
      .optional(),
    Teatment: z
      .lazy(() => TeatmentUpdateOneWithoutPatientNestedInputSchema)
      .optional(),
    tel: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    update_by: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    update_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUncheckedUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedUpdateManyWithoutPatientNestedInputSchema,
        )
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientCreateManyInputSchema: z.ZodType<Prisma.PatientCreateManyInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientUpdateManyMutationInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const HistoryCreateInputSchema: z.ZodType<Prisma.HistoryCreateInput> = z
  .object({
    chief_complaint: z.string(),
    create_by: z.string().optional().nullable(),
    create_date: z.coerce.date().optional().nullable(),
    id: z.string().uuid().optional(),
    Patient: z.lazy(() => PatientCreateNestedOneWithoutHistoryInputSchema),
    physical_status: z.string().optional().nullable(),
    present_illness: z.string(),
    symptom_details: z.string(),
    teatment: z.string(),
    triage_lavel: z.string().optional().nullable(),
    update_by: z.string().optional().nullable(),
    update_date: z.coerce.date().optional().nullable(),
  })
  .strict();

export const HistoryUncheckedCreateInputSchema: z.ZodType<Prisma.HistoryUncheckedCreateInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      symptom_details: z.string(),
      teatment: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const HistoryUpdateInputSchema: z.ZodType<Prisma.HistoryUpdateInput> = z
  .object({
    chief_complaint: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    create_by: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    create_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Patient: z
      .lazy(() => PatientUpdateOneRequiredWithoutHistoryNestedInputSchema)
      .optional(),
    physical_status: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    present_illness: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    symptom_details: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    teatment: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    triage_lavel: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    update_by: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    update_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const HistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      symptom_details: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teatment: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const HistoryCreateManyInputSchema: z.ZodType<Prisma.HistoryCreateManyInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      symptom_details: z.string(),
      teatment: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const HistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.HistoryUpdateManyMutationInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      symptom_details: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teatment: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const HistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateManyInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      symptom_details: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teatment: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamCreateInputSchema: z.ZodType<Prisma.ExamCreateInput> = z
  .object({
    create_by: z.string().optional().nullable(),
    create_date: z.coerce.date().optional().nullable(),
    element_id: z.string(),
    id: z.string().uuid().optional(),
    image: z.string().optional().nullable(),
    Patient: z
      .lazy(() => PatientCreateNestedOneWithoutExamInputSchema)
      .optional(),
    text: z.string(),
    update_by: z.string().optional().nullable(),
    update_date: z.coerce.date().optional().nullable(),
  })
  .strict();

export const ExamUncheckedCreateInputSchema: z.ZodType<Prisma.ExamUncheckedCreateInput>
  = z
    .object({
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      element_id: z.string(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      patient_id: z.string().optional().nullable(),
      text: z.string(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const ExamUpdateInputSchema: z.ZodType<Prisma.ExamUpdateInput> = z
  .object({
    create_by: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    create_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    element_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    Patient: z
      .lazy(() => PatientUpdateOneWithoutExamNestedInputSchema)
      .optional(),
    text: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    update_by: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    update_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const ExamUncheckedUpdateInputSchema: z.ZodType<Prisma.ExamUncheckedUpdateInput>
  = z
    .object({
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamCreateManyInputSchema: z.ZodType<Prisma.ExamCreateManyInput>
  = z
    .object({
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      element_id: z.string(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      patient_id: z.string().optional().nullable(),
      text: z.string(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const ExamUpdateManyMutationInputSchema: z.ZodType<Prisma.ExamUpdateManyMutationInput>
  = z
    .object({
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExamUncheckedUpdateManyInput>
  = z
    .object({
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientCreateInputSchema: z.ZodType<Prisma.StationPatientCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      in_date: z.coerce.date().optional(),
      out_date: z.coerce.date().optional().nullable(),
      Patient: z.lazy(
        () => PatientCreateNestedOneWithoutStationPatientInputSchema,
      ),
      station: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const StationPatientUncheckedCreateInputSchema: z.ZodType<Prisma.StationPatientUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      in_date: z.coerce.date().optional(),
      out_date: z.coerce.date().optional().nullable(),
      patient_id: z.string(),
      station: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const StationPatientUpdateInputSchema: z.ZodType<Prisma.StationPatientUpdateInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(
          () => PatientUpdateOneRequiredWithoutStationPatientNestedInputSchema,
        )
        .optional(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientUncheckedUpdateInputSchema: z.ZodType<Prisma.StationPatientUncheckedUpdateInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientCreateManyInputSchema: z.ZodType<Prisma.StationPatientCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      in_date: z.coerce.date().optional(),
      out_date: z.coerce.date().optional().nullable(),
      patient_id: z.string(),
      station: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const StationPatientUpdateManyMutationInputSchema: z.ZodType<Prisma.StationPatientUpdateManyMutationInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StationPatientUncheckedUpdateManyInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentCreateInputSchema: z.ZodType<Prisma.TeatmentCreateInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      Patient: z.lazy(() => PatientCreateNestedOneWithoutTeatmentInputSchema),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const TeatmentUncheckedCreateInputSchema: z.ZodType<Prisma.TeatmentUncheckedCreateInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const TeatmentUpdateInputSchema: z.ZodType<Prisma.TeatmentUpdateInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Patient: z
        .lazy(() => PatientUpdateOneRequiredWithoutTeatmentNestedInputSchema)
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentUncheckedUpdateInputSchema: z.ZodType<Prisma.TeatmentUncheckedUpdateInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentCreateManyInputSchema: z.ZodType<Prisma.TeatmentCreateManyInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const TeatmentUpdateManyMutationInputSchema: z.ZodType<Prisma.TeatmentUpdateManyMutationInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeatmentUncheckedUpdateManyInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  })
  .strict();

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z
  .object({
    equals: z.lazy(() => GenderSchema).optional(),
    in: z
      .lazy(() => GenderSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => GenderSchema),
        z.lazy(() => NestedEnumGenderFilterSchema),
      ])
      .optional(),
    notIn: z
      .lazy(() => GenderSchema)
      .array()
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter>
  = z
    .object({
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional().nullable(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
      notIn: z.string().array().optional().nullable(),
      startsWith: z.string().optional(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
    notIn: z.number().array().optional().nullable(),
  })
  .strict();

export const EnumGroupBloodNullableFilterSchema: z.ZodType<Prisma.EnumGroupBloodNullableFilter>
  = z
    .object({
      equals: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NestedEnumGroupBloodNullableFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
    })
    .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter>
  = z
    .object({
      equals: z.coerce.date().optional().nullable(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
    })
    .strict();

export const HistoryNullableScalarRelationFilterSchema: z.ZodType<Prisma.HistoryNullableScalarRelationFilter>
  = z
    .object({
      is: z
        .lazy(() => HistoryWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => HistoryWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const ExamListRelationFilterSchema: z.ZodType<Prisma.ExamListRelationFilter>
  = z
    .object({
      every: z.lazy(() => ExamWhereInputSchema).optional(),
      none: z.lazy(() => ExamWhereInputSchema).optional(),
      some: z.lazy(() => ExamWhereInputSchema).optional(),
    })
    .strict();

export const StationPatientListRelationFilterSchema: z.ZodType<Prisma.StationPatientListRelationFilter>
  = z
    .object({
      every: z.lazy(() => StationPatientWhereInputSchema).optional(),
      none: z.lazy(() => StationPatientWhereInputSchema).optional(),
      some: z.lazy(() => StationPatientWhereInputSchema).optional(),
    })
    .strict();

export const TeatmentNullableScalarRelationFilterSchema: z.ZodType<Prisma.TeatmentNullableScalarRelationFilter>
  = z
    .object({
      is: z
        .lazy(() => TeatmentWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => TeatmentWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    nulls: z.lazy(() => NullsOrderSchema).optional(),
    sort: z.lazy(() => SortOrderSchema),
  })
  .strict();

export const ExamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExamOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StationPatientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StationPatientOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      age: z.lazy(() => SortOrderSchema).optional(),
      allergy_drug: z.lazy(() => SortOrderSchema).optional(),
      allergy_food: z.lazy(() => SortOrderSchema).optional(),
      birthday: z.lazy(() => SortOrderSchema).optional(),
      congenital_disease: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      date_time_died: z.lazy(() => SortOrderSchema).optional(),
      date_time_go_home: z.lazy(() => SortOrderSchema).optional(),
      date_time_lost: z.lazy(() => SortOrderSchema).optional(),
      date_time_refer: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      gender: z.lazy(() => SortOrderSchema).optional(),
      group_blood: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      image_id_card: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      qr_number: z.lazy(() => SortOrderSchema).optional(),
      tel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatientAvgOrderByAggregateInput>
  = z
    .object({
      age: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      age: z.lazy(() => SortOrderSchema).optional(),
      allergy_drug: z.lazy(() => SortOrderSchema).optional(),
      allergy_food: z.lazy(() => SortOrderSchema).optional(),
      birthday: z.lazy(() => SortOrderSchema).optional(),
      congenital_disease: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      date_time_died: z.lazy(() => SortOrderSchema).optional(),
      date_time_go_home: z.lazy(() => SortOrderSchema).optional(),
      date_time_lost: z.lazy(() => SortOrderSchema).optional(),
      date_time_refer: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      gender: z.lazy(() => SortOrderSchema).optional(),
      group_blood: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      image_id_card: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      qr_number: z.lazy(() => SortOrderSchema).optional(),
      tel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMinOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      age: z.lazy(() => SortOrderSchema).optional(),
      allergy_drug: z.lazy(() => SortOrderSchema).optional(),
      allergy_food: z.lazy(() => SortOrderSchema).optional(),
      birthday: z.lazy(() => SortOrderSchema).optional(),
      congenital_disease: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      date_time_died: z.lazy(() => SortOrderSchema).optional(),
      date_time_go_home: z.lazy(() => SortOrderSchema).optional(),
      date_time_lost: z.lazy(() => SortOrderSchema).optional(),
      date_time_refer: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      gender: z.lazy(() => SortOrderSchema).optional(),
      group_blood: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      image_id_card: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      qr_number: z.lazy(() => SortOrderSchema).optional(),
      tel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatientSumOrderByAggregateInput>
  = z
    .object({
      age: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z.string().array().optional(),
      startsWith: z.string().optional(),
    })
    .strict();

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
      equals: z.lazy(() => GenderSchema).optional(),
      in: z
        .lazy(() => GenderSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => GenderSchema)
        .array()
        .optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional().nullable(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.string().array().optional().nullable(),
      startsWith: z.string().optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter>
  = z
    .object({
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      equals: z.number().optional().nullable(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      in: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.number().array().optional().nullable(),
    })
    .strict();

export const EnumGroupBloodNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGroupBloodNullableWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumGroupBloodNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumGroupBloodNullableFilterSchema).optional(),
      equals: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NestedEnumGroupBloodNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      equals: z.coerce.date().optional().nullable(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
    })
    .strict();

export const PatientScalarRelationFilterSchema: z.ZodType<Prisma.PatientScalarRelationFilter>
  = z
    .object({
      is: z.lazy(() => PatientWhereInputSchema).optional(),
      isNot: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const HistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryCountOrderByAggregateInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z.lazy(() => SortOrderSchema).optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      symptom_details: z.lazy(() => SortOrderSchema).optional(),
      teatment: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryMaxOrderByAggregateInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z.lazy(() => SortOrderSchema).optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      symptom_details: z.lazy(() => SortOrderSchema).optional(),
      teatment: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryMinOrderByAggregateInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z.lazy(() => SortOrderSchema).optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      symptom_details: z.lazy(() => SortOrderSchema).optional(),
      teatment: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientNullableScalarRelationFilterSchema: z.ZodType<Prisma.PatientNullableScalarRelationFilter>
  = z
    .object({
      is: z
        .lazy(() => PatientWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => PatientWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const ExamCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExamCountOrderByAggregateInput>
  = z
    .object({
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      element_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ExamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExamMaxOrderByAggregateInput>
  = z
    .object({
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      element_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ExamMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExamMinOrderByAggregateInput>
  = z
    .object({
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      element_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
    notIn: z.coerce.date().array().optional(),
  })
  .strict();

export const StationPatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.StationPatientCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      in_date: z.lazy(() => SortOrderSchema).optional(),
      out_date: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      station: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StationPatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StationPatientMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      in_date: z.lazy(() => SortOrderSchema).optional(),
      out_date: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      station: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StationPatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.StationPatientMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      in_date: z.lazy(() => SortOrderSchema).optional(),
      out_date: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      station: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      equals: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z.coerce.date().array().optional(),
    })
    .strict();

export const TeatmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeatmentCountOrderByAggregateInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z.lazy(() => SortOrderSchema).optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeatmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeatmentMaxOrderByAggregateInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z.lazy(() => SortOrderSchema).optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeatmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeatmentMinOrderByAggregateInput>
  = z
    .object({
      chief_complaint: z.lazy(() => SortOrderSchema).optional(),
      create_by: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      physical_status: z.lazy(() => SortOrderSchema).optional(),
      present_illness: z.lazy(() => SortOrderSchema).optional(),
      triage_lavel: z.lazy(() => SortOrderSchema).optional(),
      update_by: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.HistoryCreateNestedOneWithoutPatientInput>
  = z
    .object({
      connect: z.lazy(() => HistoryWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => HistoryCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryCreateWithoutPatientInputSchema),
          z.lazy(() => HistoryUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ExamCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.ExamCreateNestedManyWithoutPatientInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema),
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => ExamCreateWithoutPatientInputSchema),
          z.lazy(() => ExamCreateWithoutPatientInputSchema).array(),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExamCreateManyPatientInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const StationPatientCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientCreateNestedManyWithoutPatientInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema),
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema).array(),
          z.lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => StationPatientCreateManyPatientInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const TeatmentCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentCreateNestedOneWithoutPatientInput>
  = z
    .object({
      connect: z.lazy(() => TeatmentWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => TeatmentCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => TeatmentCreateWithoutPatientInputSchema),
          z.lazy(() => TeatmentUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryUncheckedCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.HistoryUncheckedCreateNestedOneWithoutPatientInput>
  = z
    .object({
      connect: z.lazy(() => HistoryWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => HistoryCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryCreateWithoutPatientInputSchema),
          z.lazy(() => HistoryUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ExamUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.ExamUncheckedCreateNestedManyWithoutPatientInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema),
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => ExamCreateWithoutPatientInputSchema),
          z.lazy(() => ExamCreateWithoutPatientInputSchema).array(),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExamCreateManyPatientInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const StationPatientUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUncheckedCreateNestedManyWithoutPatientInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema),
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema).array(),
          z.lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => StationPatientCreateManyPatientInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const TeatmentUncheckedCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentUncheckedCreateNestedOneWithoutPatientInput>
  = z
    .object({
      connect: z.lazy(() => TeatmentWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => TeatmentCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => TeatmentCreateWithoutPatientInputSchema),
          z.lazy(() => TeatmentUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => GenderSchema).optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>
  = z
    .object({
      decrement: z.number().optional(),
      divide: z.number().optional(),
      increment: z.number().optional(),
      multiply: z.number().optional(),
      set: z.number().optional().nullable(),
    })
    .strict();

export const NullableEnumGroupBloodFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumGroupBloodFieldUpdateOperationsInput>
  = z
    .object({
      set: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>
  = z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const HistoryUpdateOneWithoutPatientNestedInputSchema: z.ZodType<Prisma.HistoryUpdateOneWithoutPatientNestedInput>
  = z
    .object({
      connect: z.lazy(() => HistoryWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => HistoryCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryCreateWithoutPatientInputSchema),
          z.lazy(() => HistoryUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => HistoryWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => HistoryWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(() => HistoryUpdateToOneWithWhereWithoutPatientInputSchema),
          z.lazy(() => HistoryUpdateWithoutPatientInputSchema),
          z.lazy(() => HistoryUncheckedUpdateWithoutPatientInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => HistoryUpsertWithoutPatientInputSchema).optional(),
    })
    .strict();

export const ExamUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.ExamUpdateManyWithoutPatientNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema),
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => ExamCreateWithoutPatientInputSchema),
          z.lazy(() => ExamCreateWithoutPatientInputSchema).array(),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExamCreateManyPatientInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ExamScalarWhereInputSchema),
          z.lazy(() => ExamScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ExamUpdateWithWhereUniqueWithoutPatientInputSchema),
          z
            .lazy(() => ExamUpdateWithWhereUniqueWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ExamUpdateManyWithWhereWithoutPatientInputSchema),
          z
            .lazy(() => ExamUpdateManyWithWhereWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ExamUpsertWithWhereUniqueWithoutPatientInputSchema),
          z
            .lazy(() => ExamUpsertWithWhereUniqueWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const StationPatientUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.StationPatientUpdateManyWithoutPatientNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema),
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema).array(),
          z.lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => StationPatientCreateManyPatientInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => StationPatientScalarWhereInputSchema),
          z.lazy(() => StationPatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => StationPatientUpdateWithWhereUniqueWithoutPatientInputSchema,
          ),
          z
            .lazy(
              () =>
                StationPatientUpdateWithWhereUniqueWithoutPatientInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => StationPatientUpdateManyWithWhereWithoutPatientInputSchema,
          ),
          z
            .lazy(
              () => StationPatientUpdateManyWithWhereWithoutPatientInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => StationPatientUpsertWithWhereUniqueWithoutPatientInputSchema,
          ),
          z
            .lazy(
              () =>
                StationPatientUpsertWithWhereUniqueWithoutPatientInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const TeatmentUpdateOneWithoutPatientNestedInputSchema: z.ZodType<Prisma.TeatmentUpdateOneWithoutPatientNestedInput>
  = z
    .object({
      connect: z.lazy(() => TeatmentWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => TeatmentCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => TeatmentCreateWithoutPatientInputSchema),
          z.lazy(() => TeatmentUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => TeatmentWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => TeatmentWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(() => TeatmentUpdateToOneWithWhereWithoutPatientInputSchema),
          z.lazy(() => TeatmentUpdateWithoutPatientInputSchema),
          z.lazy(() => TeatmentUncheckedUpdateWithoutPatientInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => TeatmentUpsertWithoutPatientInputSchema).optional(),
    })
    .strict();

export const HistoryUncheckedUpdateOneWithoutPatientNestedInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateOneWithoutPatientNestedInput>
  = z
    .object({
      connect: z.lazy(() => HistoryWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => HistoryCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryCreateWithoutPatientInputSchema),
          z.lazy(() => HistoryUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => HistoryWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => HistoryWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(() => HistoryUpdateToOneWithWhereWithoutPatientInputSchema),
          z.lazy(() => HistoryUpdateWithoutPatientInputSchema),
          z.lazy(() => HistoryUncheckedUpdateWithoutPatientInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => HistoryUpsertWithoutPatientInputSchema).optional(),
    })
    .strict();

export const ExamUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.ExamUncheckedUpdateManyWithoutPatientNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema),
          z.lazy(() => ExamCreateOrConnectWithoutPatientInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => ExamCreateWithoutPatientInputSchema),
          z.lazy(() => ExamCreateWithoutPatientInputSchema).array(),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema),
          z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExamCreateManyPatientInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ExamScalarWhereInputSchema),
          z.lazy(() => ExamScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ExamWhereUniqueInputSchema),
          z.lazy(() => ExamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ExamUpdateWithWhereUniqueWithoutPatientInputSchema),
          z
            .lazy(() => ExamUpdateWithWhereUniqueWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ExamUpdateManyWithWhereWithoutPatientInputSchema),
          z
            .lazy(() => ExamUpdateManyWithWhereWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ExamUpsertWithWhereUniqueWithoutPatientInputSchema),
          z
            .lazy(() => ExamUpsertWithWhereUniqueWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const StationPatientUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.StationPatientUncheckedUpdateManyWithoutPatientNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientCreateOrConnectWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema),
          z.lazy(() => StationPatientCreateWithoutPatientInputSchema).array(),
          z.lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema),
          z
            .lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => StationPatientCreateManyPatientInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => StationPatientScalarWhereInputSchema),
          z.lazy(() => StationPatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => StationPatientWhereUniqueInputSchema),
          z.lazy(() => StationPatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => StationPatientUpdateWithWhereUniqueWithoutPatientInputSchema,
          ),
          z
            .lazy(
              () =>
                StationPatientUpdateWithWhereUniqueWithoutPatientInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => StationPatientUpdateManyWithWhereWithoutPatientInputSchema,
          ),
          z
            .lazy(
              () => StationPatientUpdateManyWithWhereWithoutPatientInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => StationPatientUpsertWithWhereUniqueWithoutPatientInputSchema,
          ),
          z
            .lazy(
              () =>
                StationPatientUpsertWithWhereUniqueWithoutPatientInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const TeatmentUncheckedUpdateOneWithoutPatientNestedInputSchema: z.ZodType<Prisma.TeatmentUncheckedUpdateOneWithoutPatientNestedInput>
  = z
    .object({
      connect: z.lazy(() => TeatmentWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => TeatmentCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => TeatmentCreateWithoutPatientInputSchema),
          z.lazy(() => TeatmentUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => TeatmentWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => TeatmentWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(() => TeatmentUpdateToOneWithWhereWithoutPatientInputSchema),
          z.lazy(() => TeatmentUpdateWithoutPatientInputSchema),
          z.lazy(() => TeatmentUncheckedUpdateWithoutPatientInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => TeatmentUpsertWithoutPatientInputSchema).optional(),
    })
    .strict();

export const PatientCreateNestedOneWithoutHistoryInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutHistoryInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutHistoryInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutHistoryInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutHistoryInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientUpdateOneRequiredWithoutHistoryNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutHistoryNestedInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutHistoryInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutHistoryInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutHistoryInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PatientUpdateToOneWithWhereWithoutHistoryInputSchema),
          z.lazy(() => PatientUpdateWithoutHistoryInputSchema),
          z.lazy(() => PatientUncheckedUpdateWithoutHistoryInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => PatientUpsertWithoutHistoryInputSchema).optional(),
    })
    .strict();

export const PatientCreateNestedOneWithoutExamInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutExamInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutExamInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutExamInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutExamInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientUpdateOneWithoutExamNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneWithoutExamNestedInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutExamInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutExamInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutExamInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => PatientWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => PatientWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(() => PatientUpdateToOneWithWhereWithoutExamInputSchema),
          z.lazy(() => PatientUpdateWithoutExamInputSchema),
          z.lazy(() => PatientUncheckedUpdateWithoutExamInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => PatientUpsertWithoutExamInputSchema).optional(),
    })
    .strict();

export const PatientCreateNestedOneWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutStationPatientInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutStationPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutStationPatientInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutStationPatientInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>
  = z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const PatientUpdateOneRequiredWithoutStationPatientNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutStationPatientNestedInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutStationPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutStationPatientInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutStationPatientInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => PatientUpdateToOneWithWhereWithoutStationPatientInputSchema,
          ),
          z.lazy(() => PatientUpdateWithoutStationPatientInputSchema),
          z.lazy(() => PatientUncheckedUpdateWithoutStationPatientInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => PatientUpsertWithoutStationPatientInputSchema)
        .optional(),
    })
    .strict();

export const PatientCreateNestedOneWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutTeatmentInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutTeatmentInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutTeatmentInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutTeatmentInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientUpdateOneRequiredWithoutTeatmentNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutTeatmentNestedInput>
  = z
    .object({
      connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => PatientCreateOrConnectWithoutTeatmentInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutTeatmentInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutTeatmentInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PatientUpdateToOneWithWhereWithoutTeatmentInputSchema),
          z.lazy(() => PatientUpdateWithoutTeatmentInputSchema),
          z.lazy(() => PatientUncheckedUpdateWithoutTeatmentInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => PatientUpsertWithoutTeatmentInputSchema).optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  })
  .strict();

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter>
  = z
    .object({
      equals: z.lazy(() => GenderSchema).optional(),
      in: z
        .lazy(() => GenderSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => NestedEnumGenderFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => GenderSchema)
        .array()
        .optional(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter>
  = z
    .object({
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional().nullable(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
      notIn: z.string().array().optional().nullable(),
      startsWith: z.string().optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter>
  = z
    .object({
      equals: z.number().optional().nullable(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      in: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
      notIn: z.number().array().optional().nullable(),
    })
    .strict();

export const NestedEnumGroupBloodNullableFilterSchema: z.ZodType<Prisma.NestedEnumGroupBloodNullableFilter>
  = z
    .object({
      equals: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NestedEnumGroupBloodNullableFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter>
  = z
    .object({
      equals: z.coerce.date().optional().nullable(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z.string().array().optional(),
      startsWith: z.string().optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
    notIn: z.number().array().optional(),
  })
  .strict();

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
      equals: z.lazy(() => GenderSchema).optional(),
      in: z
        .lazy(() => GenderSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => GenderSchema)
        .array()
        .optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional().nullable(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.string().array().optional().nullable(),
      startsWith: z.string().optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter>
  = z
    .object({
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      equals: z.number().optional().nullable(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      in: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.number().array().optional().nullable(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter>
  = z
    .object({
      equals: z.number().optional().nullable(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      in: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
      notIn: z.number().array().optional().nullable(),
    })
    .strict();

export const NestedEnumGroupBloodNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGroupBloodNullableWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumGroupBloodNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumGroupBloodNullableFilterSchema).optional(),
      equals: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NestedEnumGroupBloodNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => GroupBloodSchema)
        .array()
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      equals: z.coerce.date().optional().nullable(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter>
  = z
    .object({
      equals: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
      notIn: z.coerce.date().array().optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      equals: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z.coerce.date().array().optional(),
    })
    .strict();

export const HistoryCreateWithoutPatientInputSchema: z.ZodType<Prisma.HistoryCreateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      symptom_details: z.string(),
      teatment: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const HistoryUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.HistoryUncheckedCreateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      symptom_details: z.string(),
      teatment: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const HistoryCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.HistoryCreateOrConnectWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => HistoryCreateWithoutPatientInputSchema),
        z.lazy(() => HistoryUncheckedCreateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => HistoryWhereUniqueInputSchema),
    })
    .strict();

export const ExamCreateWithoutPatientInputSchema: z.ZodType<Prisma.ExamCreateWithoutPatientInput>
  = z
    .object({
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      element_id: z.string(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      text: z.string(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const ExamUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.ExamUncheckedCreateWithoutPatientInput>
  = z
    .object({
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      element_id: z.string(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      text: z.string(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const ExamCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.ExamCreateOrConnectWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => ExamCreateWithoutPatientInputSchema),
        z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => ExamWhereUniqueInputSchema),
    })
    .strict();

export const ExamCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.ExamCreateManyPatientInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => ExamCreateManyPatientInputSchema),
        z.lazy(() => ExamCreateManyPatientInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StationPatientCreateWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientCreateWithoutPatientInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      in_date: z.coerce.date().optional(),
      out_date: z.coerce.date().optional().nullable(),
      station: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const StationPatientUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUncheckedCreateWithoutPatientInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      in_date: z.coerce.date().optional(),
      out_date: z.coerce.date().optional().nullable(),
      station: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const StationPatientCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientCreateOrConnectWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => StationPatientCreateWithoutPatientInputSchema),
        z.lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => StationPatientWhereUniqueInputSchema),
    })
    .strict();

export const StationPatientCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.StationPatientCreateManyPatientInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => StationPatientCreateManyPatientInputSchema),
        z.lazy(() => StationPatientCreateManyPatientInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TeatmentCreateWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentCreateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const TeatmentUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentUncheckedCreateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z.string(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      physical_status: z.string().optional().nullable(),
      present_illness: z.string(),
      triage_lavel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const TeatmentCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentCreateOrConnectWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => TeatmentCreateWithoutPatientInputSchema),
        z.lazy(() => TeatmentUncheckedCreateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => TeatmentWhereUniqueInputSchema),
    })
    .strict();

export const HistoryUpsertWithoutPatientInputSchema: z.ZodType<Prisma.HistoryUpsertWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => HistoryCreateWithoutPatientInputSchema),
        z.lazy(() => HistoryUncheckedCreateWithoutPatientInputSchema),
      ]),
      update: z.union([
        z.lazy(() => HistoryUpdateWithoutPatientInputSchema),
        z.lazy(() => HistoryUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => HistoryWhereInputSchema).optional(),
    })
    .strict();

export const HistoryUpdateToOneWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.HistoryUpdateToOneWithWhereWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => HistoryUpdateWithoutPatientInputSchema),
        z.lazy(() => HistoryUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => HistoryWhereInputSchema).optional(),
    })
    .strict();

export const HistoryUpdateWithoutPatientInputSchema: z.ZodType<Prisma.HistoryUpdateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      symptom_details: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teatment: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const HistoryUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.HistoryUncheckedUpdateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      symptom_details: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teatment: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.ExamUpsertWithWhereUniqueWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => ExamCreateWithoutPatientInputSchema),
        z.lazy(() => ExamUncheckedCreateWithoutPatientInputSchema),
      ]),
      update: z.union([
        z.lazy(() => ExamUpdateWithoutPatientInputSchema),
        z.lazy(() => ExamUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => ExamWhereUniqueInputSchema),
    })
    .strict();

export const ExamUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.ExamUpdateWithWhereUniqueWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => ExamUpdateWithoutPatientInputSchema),
        z.lazy(() => ExamUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => ExamWhereUniqueInputSchema),
    })
    .strict();

export const ExamUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.ExamUpdateManyWithWhereWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => ExamUpdateManyMutationInputSchema),
        z.lazy(() => ExamUncheckedUpdateManyWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => ExamScalarWhereInputSchema),
    })
    .strict();

export const ExamScalarWhereInputSchema: z.ZodType<Prisma.ExamScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => ExamScalarWhereInputSchema),
          z.lazy(() => ExamScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_by: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      element_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      image: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      NOT: z
        .union([
          z.lazy(() => ExamScalarWhereInputSchema),
          z.lazy(() => ExamScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ExamScalarWhereInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      update_by: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUpsertWithWhereUniqueWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => StationPatientCreateWithoutPatientInputSchema),
        z.lazy(() => StationPatientUncheckedCreateWithoutPatientInputSchema),
      ]),
      update: z.union([
        z.lazy(() => StationPatientUpdateWithoutPatientInputSchema),
        z.lazy(() => StationPatientUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => StationPatientWhereUniqueInputSchema),
    })
    .strict();

export const StationPatientUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUpdateWithWhereUniqueWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => StationPatientUpdateWithoutPatientInputSchema),
        z.lazy(() => StationPatientUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => StationPatientWhereUniqueInputSchema),
    })
    .strict();

export const StationPatientUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUpdateManyWithWhereWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => StationPatientUpdateManyMutationInputSchema),
        z.lazy(
          () => StationPatientUncheckedUpdateManyWithoutPatientInputSchema,
        ),
      ]),
      where: z.lazy(() => StationPatientScalarWhereInputSchema),
    })
    .strict();

export const StationPatientScalarWhereInputSchema: z.ZodType<Prisma.StationPatientScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => StationPatientScalarWhereInputSchema),
          z.lazy(() => StationPatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      in_date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StationPatientScalarWhereInputSchema),
          z.lazy(() => StationPatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StationPatientScalarWhereInputSchema)
        .array()
        .optional(),
      out_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      patient_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      station: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentUpsertWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentUpsertWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => TeatmentCreateWithoutPatientInputSchema),
        z.lazy(() => TeatmentUncheckedCreateWithoutPatientInputSchema),
      ]),
      update: z.union([
        z.lazy(() => TeatmentUpdateWithoutPatientInputSchema),
        z.lazy(() => TeatmentUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => TeatmentWhereInputSchema).optional(),
    })
    .strict();

export const TeatmentUpdateToOneWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentUpdateToOneWithWhereWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => TeatmentUpdateWithoutPatientInputSchema),
        z.lazy(() => TeatmentUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => TeatmentWhereInputSchema).optional(),
    })
    .strict();

export const TeatmentUpdateWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentUpdateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const TeatmentUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.TeatmentUncheckedUpdateWithoutPatientInput>
  = z
    .object({
      chief_complaint: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      physical_status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      present_illness: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      triage_lavel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientCreateWithoutHistoryInputSchema: z.ZodType<Prisma.PatientCreateWithoutHistoryInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(() => StationPatientCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      Teatment: z
        .lazy(() => TeatmentCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUncheckedCreateWithoutHistoryInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutHistoryInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamUncheckedCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedCreateNestedManyWithoutPatientInputSchema,
        )
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientCreateOrConnectWithoutHistoryInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutHistoryInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutHistoryInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutHistoryInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientUpsertWithoutHistoryInputSchema: z.ZodType<Prisma.PatientUpsertWithoutHistoryInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutHistoryInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutHistoryInputSchema),
      ]),
      update: z.union([
        z.lazy(() => PatientUpdateWithoutHistoryInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutHistoryInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateToOneWithWhereWithoutHistoryInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutHistoryInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientUpdateWithoutHistoryInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutHistoryInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateWithoutHistoryInputSchema: z.ZodType<Prisma.PatientUpdateWithoutHistoryInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(() => StationPatientUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateWithoutHistoryInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutHistoryInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUncheckedUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedUpdateManyWithoutPatientNestedInputSchema,
        )
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientCreateWithoutExamInputSchema: z.ZodType<Prisma.PatientCreateWithoutExamInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(() => StationPatientCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      Teatment: z
        .lazy(() => TeatmentCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUncheckedCreateWithoutExamInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutExamInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedCreateNestedManyWithoutPatientInputSchema,
        )
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientCreateOrConnectWithoutExamInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutExamInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutExamInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutExamInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientUpsertWithoutExamInputSchema: z.ZodType<Prisma.PatientUpsertWithoutExamInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutExamInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutExamInputSchema),
      ]),
      update: z.union([
        z.lazy(() => PatientUpdateWithoutExamInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutExamInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateToOneWithWhereWithoutExamInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutExamInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientUpdateWithoutExamInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutExamInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateWithoutExamInputSchema: z.ZodType<Prisma.PatientUpdateWithoutExamInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(() => StationPatientUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateWithoutExamInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutExamInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedUpdateManyWithoutPatientNestedInputSchema,
        )
        .optional(),
      Teatment: z
        .lazy(() => TeatmentUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientCreateWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientCreateWithoutStationPatientInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      Teatment: z
        .lazy(() => TeatmentCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUncheckedCreateWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutStationPatientInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamUncheckedCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      Teatment: z
        .lazy(() => TeatmentUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientCreateOrConnectWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutStationPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutStationPatientInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutStationPatientInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientUpsertWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientUpsertWithoutStationPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutStationPatientInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutStationPatientInputSchema),
      ]),
      update: z.union([
        z.lazy(() => PatientUpdateWithoutStationPatientInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutStationPatientInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateToOneWithWhereWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutStationPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientUpdateWithoutStationPatientInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutStationPatientInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientUpdateWithoutStationPatientInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Teatment: z
        .lazy(() => TeatmentUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateWithoutStationPatientInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutStationPatientInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUncheckedUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Teatment: z
        .lazy(() => TeatmentUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientCreateWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientCreateWithoutTeatmentInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(() => StationPatientCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUncheckedCreateWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutTeatmentInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      age: z.number().int().optional().nullable(),
      allergy_drug: z.string().optional().nullable(),
      allergy_food: z.string().optional().nullable(),
      birthday: z.string().optional().nullable(),
      congenital_disease: z.string().optional().nullable(),
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      date_time_died: z.coerce.date().optional().nullable(),
      date_time_go_home: z.coerce.date().optional().nullable(),
      date_time_lost: z.coerce.date().optional().nullable(),
      date_time_refer: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      Exam: z
        .lazy(() => ExamUncheckedCreateNestedManyWithoutPatientInputSchema)
        .optional(),
      first_name: z.string().optional().nullable(),
      gender: z.lazy(() => GenderSchema),
      group_blood: z
        .lazy(() => GroupBloodSchema)
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedCreateNestedOneWithoutPatientInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      image_id_card: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
      qr_number: z.string().optional().nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedCreateNestedManyWithoutPatientInputSchema,
        )
        .optional(),
      tel: z.string().optional().nullable(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientCreateOrConnectWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutTeatmentInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutTeatmentInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutTeatmentInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientUpsertWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientUpsertWithoutTeatmentInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutTeatmentInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutTeatmentInputSchema),
      ]),
      update: z.union([
        z.lazy(() => PatientUpdateWithoutTeatmentInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutTeatmentInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateToOneWithWhereWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutTeatmentInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientUpdateWithoutTeatmentInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutTeatmentInputSchema),
      ]),
      where: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const PatientUpdateWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientUpdateWithoutTeatmentInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(() => StationPatientUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateWithoutTeatmentInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutTeatmentInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      age: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_drug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      allergy_food: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      congenital_disease: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_died: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_go_home: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_lost: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time_refer: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      delete_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Exam: z
        .lazy(() => ExamUncheckedUpdateManyWithoutPatientNestedInputSchema)
        .optional(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gender: z
        .union([
          z.lazy(() => GenderSchema),
          z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group_blood: z
        .union([
          z.lazy(() => GroupBloodSchema),
          z.lazy(() => NullableEnumGroupBloodFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      History: z
        .lazy(() => HistoryUncheckedUpdateOneWithoutPatientNestedInputSchema)
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image_id_card: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      last_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      qr_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      StationPatient: z
        .lazy(
          () =>
            StationPatientUncheckedUpdateManyWithoutPatientNestedInputSchema,
        )
        .optional(),
      tel: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamCreateManyPatientInputSchema: z.ZodType<Prisma.ExamCreateManyPatientInput>
  = z
    .object({
      create_by: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      element_id: z.string(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      text: z.string(),
      update_by: z.string().optional().nullable(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const StationPatientCreateManyPatientInputSchema: z.ZodType<Prisma.StationPatientCreateManyPatientInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      in_date: z.coerce.date().optional(),
      out_date: z.coerce.date().optional().nullable(),
      station: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const ExamUpdateWithoutPatientInputSchema: z.ZodType<Prisma.ExamUpdateWithoutPatientInput>
  = z
    .object({
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.ExamUncheckedUpdateWithoutPatientInput>
  = z
    .object({
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ExamUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.ExamUncheckedUpdateManyWithoutPatientInput>
  = z
    .object({
      create_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      element_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_by: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientUpdateWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUpdateWithoutPatientInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUncheckedUpdateWithoutPatientInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const StationPatientUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.StationPatientUncheckedUpdateManyWithoutPatientInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      in_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      out_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      station: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PatientFindFirstArgsSchema: z.ZodType<Prisma.PatientFindFirstArgs>
  = z
    .object({
      cursor: PatientWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          PatientScalarFieldEnumSchema,
          PatientScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: PatientIncludeSchema.optional(),
      orderBy: z
        .union([
          PatientOrderByWithRelationInputSchema.array(),
          PatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PatientSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const PatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientFindFirstOrThrowArgs>
  = z
    .object({
      cursor: PatientWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          PatientScalarFieldEnumSchema,
          PatientScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: PatientIncludeSchema.optional(),
      orderBy: z
        .union([
          PatientOrderByWithRelationInputSchema.array(),
          PatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PatientSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const PatientFindManyArgsSchema: z.ZodType<Prisma.PatientFindManyArgs>
  = z
    .object({
      cursor: PatientWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          PatientScalarFieldEnumSchema,
          PatientScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: PatientIncludeSchema.optional(),
      orderBy: z
        .union([
          PatientOrderByWithRelationInputSchema.array(),
          PatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: PatientSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const PatientAggregateArgsSchema: z.ZodType<Prisma.PatientAggregateArgs>
  = z
    .object({
      cursor: PatientWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          PatientOrderByWithRelationInputSchema.array(),
          PatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const PatientGroupByArgsSchema: z.ZodType<Prisma.PatientGroupByArgs> = z
  .object({
    by: PatientScalarFieldEnumSchema.array(),
    having: PatientScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        PatientOrderByWithAggregationInputSchema.array(),
        PatientOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: PatientWhereInputSchema.optional(),
  })
  .strict();

export const PatientFindUniqueArgsSchema: z.ZodType<Prisma.PatientFindUniqueArgs>
  = z
    .object({
      include: PatientIncludeSchema.optional(),
      select: PatientSelectSchema.optional(),
      where: PatientWhereUniqueInputSchema,
    })
    .strict();

export const PatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs>
  = z
    .object({
      include: PatientIncludeSchema.optional(),
      select: PatientSelectSchema.optional(),
      where: PatientWhereUniqueInputSchema,
    })
    .strict();

export const HistoryFindFirstArgsSchema: z.ZodType<Prisma.HistoryFindFirstArgs>
  = z
    .object({
      cursor: HistoryWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          HistoryScalarFieldEnumSchema,
          HistoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: HistoryIncludeSchema.optional(),
      orderBy: z
        .union([
          HistoryOrderByWithRelationInputSchema.array(),
          HistoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: HistorySelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const HistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HistoryFindFirstOrThrowArgs>
  = z
    .object({
      cursor: HistoryWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          HistoryScalarFieldEnumSchema,
          HistoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: HistoryIncludeSchema.optional(),
      orderBy: z
        .union([
          HistoryOrderByWithRelationInputSchema.array(),
          HistoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: HistorySelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const HistoryFindManyArgsSchema: z.ZodType<Prisma.HistoryFindManyArgs>
  = z
    .object({
      cursor: HistoryWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          HistoryScalarFieldEnumSchema,
          HistoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: HistoryIncludeSchema.optional(),
      orderBy: z
        .union([
          HistoryOrderByWithRelationInputSchema.array(),
          HistoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: HistorySelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const HistoryAggregateArgsSchema: z.ZodType<Prisma.HistoryAggregateArgs>
  = z
    .object({
      cursor: HistoryWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          HistoryOrderByWithRelationInputSchema.array(),
          HistoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const HistoryGroupByArgsSchema: z.ZodType<Prisma.HistoryGroupByArgs> = z
  .object({
    by: HistoryScalarFieldEnumSchema.array(),
    having: HistoryScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        HistoryOrderByWithAggregationInputSchema.array(),
        HistoryOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: HistoryWhereInputSchema.optional(),
  })
  .strict();

export const HistoryFindUniqueArgsSchema: z.ZodType<Prisma.HistoryFindUniqueArgs>
  = z
    .object({
      include: HistoryIncludeSchema.optional(),
      select: HistorySelectSchema.optional(),
      where: HistoryWhereUniqueInputSchema,
    })
    .strict();

export const HistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HistoryFindUniqueOrThrowArgs>
  = z
    .object({
      include: HistoryIncludeSchema.optional(),
      select: HistorySelectSchema.optional(),
      where: HistoryWhereUniqueInputSchema,
    })
    .strict();

export const ExamFindFirstArgsSchema: z.ZodType<Prisma.ExamFindFirstArgs> = z
  .object({
    cursor: ExamWhereUniqueInputSchema.optional(),
    distinct: z
      .union([ExamScalarFieldEnumSchema, ExamScalarFieldEnumSchema.array()])
      .optional(),
    include: ExamIncludeSchema.optional(),
    orderBy: z
      .union([
        ExamOrderByWithRelationInputSchema.array(),
        ExamOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: ExamSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ExamWhereInputSchema.optional(),
  })
  .strict();

export const ExamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExamFindFirstOrThrowArgs>
  = z
    .object({
      cursor: ExamWhereUniqueInputSchema.optional(),
      distinct: z
        .union([ExamScalarFieldEnumSchema, ExamScalarFieldEnumSchema.array()])
        .optional(),
      include: ExamIncludeSchema.optional(),
      orderBy: z
        .union([
          ExamOrderByWithRelationInputSchema.array(),
          ExamOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: ExamSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: ExamWhereInputSchema.optional(),
    })
    .strict();

export const ExamFindManyArgsSchema: z.ZodType<Prisma.ExamFindManyArgs> = z
  .object({
    cursor: ExamWhereUniqueInputSchema.optional(),
    distinct: z
      .union([ExamScalarFieldEnumSchema, ExamScalarFieldEnumSchema.array()])
      .optional(),
    include: ExamIncludeSchema.optional(),
    orderBy: z
      .union([
        ExamOrderByWithRelationInputSchema.array(),
        ExamOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: ExamSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ExamWhereInputSchema.optional(),
  })
  .strict();

export const ExamAggregateArgsSchema: z.ZodType<Prisma.ExamAggregateArgs> = z
  .object({
    cursor: ExamWhereUniqueInputSchema.optional(),
    orderBy: z
      .union([
        ExamOrderByWithRelationInputSchema.array(),
        ExamOrderByWithRelationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ExamWhereInputSchema.optional(),
  })
  .strict();

export const ExamGroupByArgsSchema: z.ZodType<Prisma.ExamGroupByArgs> = z
  .object({
    by: ExamScalarFieldEnumSchema.array(),
    having: ExamScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        ExamOrderByWithAggregationInputSchema.array(),
        ExamOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ExamWhereInputSchema.optional(),
  })
  .strict();

export const ExamFindUniqueArgsSchema: z.ZodType<Prisma.ExamFindUniqueArgs> = z
  .object({
    include: ExamIncludeSchema.optional(),
    select: ExamSelectSchema.optional(),
    where: ExamWhereUniqueInputSchema,
  })
  .strict();

export const ExamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExamFindUniqueOrThrowArgs>
  = z
    .object({
      include: ExamIncludeSchema.optional(),
      select: ExamSelectSchema.optional(),
      where: ExamWhereUniqueInputSchema,
    })
    .strict();

export const StationPatientFindFirstArgsSchema: z.ZodType<Prisma.StationPatientFindFirstArgs>
  = z
    .object({
      cursor: StationPatientWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          StationPatientScalarFieldEnumSchema,
          StationPatientScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: StationPatientIncludeSchema.optional(),
      orderBy: z
        .union([
          StationPatientOrderByWithRelationInputSchema.array(),
          StationPatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: StationPatientSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StationPatientFindFirstOrThrowArgs>
  = z
    .object({
      cursor: StationPatientWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          StationPatientScalarFieldEnumSchema,
          StationPatientScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: StationPatientIncludeSchema.optional(),
      orderBy: z
        .union([
          StationPatientOrderByWithRelationInputSchema.array(),
          StationPatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: StationPatientSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientFindManyArgsSchema: z.ZodType<Prisma.StationPatientFindManyArgs>
  = z
    .object({
      cursor: StationPatientWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          StationPatientScalarFieldEnumSchema,
          StationPatientScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: StationPatientIncludeSchema.optional(),
      orderBy: z
        .union([
          StationPatientOrderByWithRelationInputSchema.array(),
          StationPatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: StationPatientSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientAggregateArgsSchema: z.ZodType<Prisma.StationPatientAggregateArgs>
  = z
    .object({
      cursor: StationPatientWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          StationPatientOrderByWithRelationInputSchema.array(),
          StationPatientOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientGroupByArgsSchema: z.ZodType<Prisma.StationPatientGroupByArgs>
  = z
    .object({
      by: StationPatientScalarFieldEnumSchema.array(),
      having: StationPatientScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          StationPatientOrderByWithAggregationInputSchema.array(),
          StationPatientOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientFindUniqueArgsSchema: z.ZodType<Prisma.StationPatientFindUniqueArgs>
  = z
    .object({
      include: StationPatientIncludeSchema.optional(),
      select: StationPatientSelectSchema.optional(),
      where: StationPatientWhereUniqueInputSchema,
    })
    .strict();

export const StationPatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StationPatientFindUniqueOrThrowArgs>
  = z
    .object({
      include: StationPatientIncludeSchema.optional(),
      select: StationPatientSelectSchema.optional(),
      where: StationPatientWhereUniqueInputSchema,
    })
    .strict();

export const TeatmentFindFirstArgsSchema: z.ZodType<Prisma.TeatmentFindFirstArgs>
  = z
    .object({
      cursor: TeatmentWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          TeatmentScalarFieldEnumSchema,
          TeatmentScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: TeatmentIncludeSchema.optional(),
      orderBy: z
        .union([
          TeatmentOrderByWithRelationInputSchema.array(),
          TeatmentOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: TeatmentSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeatmentFindFirstOrThrowArgs>
  = z
    .object({
      cursor: TeatmentWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          TeatmentScalarFieldEnumSchema,
          TeatmentScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: TeatmentIncludeSchema.optional(),
      orderBy: z
        .union([
          TeatmentOrderByWithRelationInputSchema.array(),
          TeatmentOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: TeatmentSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentFindManyArgsSchema: z.ZodType<Prisma.TeatmentFindManyArgs>
  = z
    .object({
      cursor: TeatmentWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          TeatmentScalarFieldEnumSchema,
          TeatmentScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: TeatmentIncludeSchema.optional(),
      orderBy: z
        .union([
          TeatmentOrderByWithRelationInputSchema.array(),
          TeatmentOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: TeatmentSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentAggregateArgsSchema: z.ZodType<Prisma.TeatmentAggregateArgs>
  = z
    .object({
      cursor: TeatmentWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          TeatmentOrderByWithRelationInputSchema.array(),
          TeatmentOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentGroupByArgsSchema: z.ZodType<Prisma.TeatmentGroupByArgs>
  = z
    .object({
      by: TeatmentScalarFieldEnumSchema.array(),
      having: TeatmentScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          TeatmentOrderByWithAggregationInputSchema.array(),
          TeatmentOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentFindUniqueArgsSchema: z.ZodType<Prisma.TeatmentFindUniqueArgs>
  = z
    .object({
      include: TeatmentIncludeSchema.optional(),
      select: TeatmentSelectSchema.optional(),
      where: TeatmentWhereUniqueInputSchema,
    })
    .strict();

export const TeatmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeatmentFindUniqueOrThrowArgs>
  = z
    .object({
      include: TeatmentIncludeSchema.optional(),
      select: TeatmentSelectSchema.optional(),
      where: TeatmentWhereUniqueInputSchema,
    })
    .strict();

export const PatientCreateArgsSchema: z.ZodType<Prisma.PatientCreateArgs> = z
  .object({
    data: z.union([
      PatientCreateInputSchema,
      PatientUncheckedCreateInputSchema,
    ]),
    include: PatientIncludeSchema.optional(),
    select: PatientSelectSchema.optional(),
  })
  .strict();

export const PatientUpsertArgsSchema: z.ZodType<Prisma.PatientUpsertArgs> = z
  .object({
    create: z.union([
      PatientCreateInputSchema,
      PatientUncheckedCreateInputSchema,
    ]),
    include: PatientIncludeSchema.optional(),
    select: PatientSelectSchema.optional(),
    update: z.union([
      PatientUpdateInputSchema,
      PatientUncheckedUpdateInputSchema,
    ]),
    where: PatientWhereUniqueInputSchema,
  })
  .strict();

export const PatientCreateManyArgsSchema: z.ZodType<Prisma.PatientCreateManyArgs>
  = z
    .object({
      data: z.union([
        PatientCreateManyInputSchema,
        PatientCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PatientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        PatientCreateManyInputSchema,
        PatientCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PatientDeleteArgsSchema: z.ZodType<Prisma.PatientDeleteArgs> = z
  .object({
    include: PatientIncludeSchema.optional(),
    select: PatientSelectSchema.optional(),
    where: PatientWhereUniqueInputSchema,
  })
  .strict();

export const PatientUpdateArgsSchema: z.ZodType<Prisma.PatientUpdateArgs> = z
  .object({
    data: z.union([
      PatientUpdateInputSchema,
      PatientUncheckedUpdateInputSchema,
    ]),
    include: PatientIncludeSchema.optional(),
    select: PatientSelectSchema.optional(),
    where: PatientWhereUniqueInputSchema,
  })
  .strict();

export const PatientUpdateManyArgsSchema: z.ZodType<Prisma.PatientUpdateManyArgs>
  = z
    .object({
      data: z.union([
        PatientUpdateManyMutationInputSchema,
        PatientUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const PatientUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        PatientUpdateManyMutationInputSchema,
        PatientUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const PatientDeleteManyArgsSchema: z.ZodType<Prisma.PatientDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: PatientWhereInputSchema.optional(),
    })
    .strict();

export const HistoryCreateArgsSchema: z.ZodType<Prisma.HistoryCreateArgs> = z
  .object({
    data: z.union([
      HistoryCreateInputSchema,
      HistoryUncheckedCreateInputSchema,
    ]),
    include: HistoryIncludeSchema.optional(),
    select: HistorySelectSchema.optional(),
  })
  .strict();

export const HistoryUpsertArgsSchema: z.ZodType<Prisma.HistoryUpsertArgs> = z
  .object({
    create: z.union([
      HistoryCreateInputSchema,
      HistoryUncheckedCreateInputSchema,
    ]),
    include: HistoryIncludeSchema.optional(),
    select: HistorySelectSchema.optional(),
    update: z.union([
      HistoryUpdateInputSchema,
      HistoryUncheckedUpdateInputSchema,
    ]),
    where: HistoryWhereUniqueInputSchema,
  })
  .strict();

export const HistoryCreateManyArgsSchema: z.ZodType<Prisma.HistoryCreateManyArgs>
  = z
    .object({
      data: z.union([
        HistoryCreateManyInputSchema,
        HistoryCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const HistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HistoryCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        HistoryCreateManyInputSchema,
        HistoryCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const HistoryDeleteArgsSchema: z.ZodType<Prisma.HistoryDeleteArgs> = z
  .object({
    include: HistoryIncludeSchema.optional(),
    select: HistorySelectSchema.optional(),
    where: HistoryWhereUniqueInputSchema,
  })
  .strict();

export const HistoryUpdateArgsSchema: z.ZodType<Prisma.HistoryUpdateArgs> = z
  .object({
    data: z.union([
      HistoryUpdateInputSchema,
      HistoryUncheckedUpdateInputSchema,
    ]),
    include: HistoryIncludeSchema.optional(),
    select: HistorySelectSchema.optional(),
    where: HistoryWhereUniqueInputSchema,
  })
  .strict();

export const HistoryUpdateManyArgsSchema: z.ZodType<Prisma.HistoryUpdateManyArgs>
  = z
    .object({
      data: z.union([
        HistoryUpdateManyMutationInputSchema,
        HistoryUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const HistoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HistoryUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        HistoryUpdateManyMutationInputSchema,
        HistoryUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const HistoryDeleteManyArgsSchema: z.ZodType<Prisma.HistoryDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: HistoryWhereInputSchema.optional(),
    })
    .strict();

export const ExamCreateArgsSchema: z.ZodType<Prisma.ExamCreateArgs> = z
  .object({
    data: z.union([ExamCreateInputSchema, ExamUncheckedCreateInputSchema]),
    include: ExamIncludeSchema.optional(),
    select: ExamSelectSchema.optional(),
  })
  .strict();

export const ExamUpsertArgsSchema: z.ZodType<Prisma.ExamUpsertArgs> = z
  .object({
    create: z.union([ExamCreateInputSchema, ExamUncheckedCreateInputSchema]),
    include: ExamIncludeSchema.optional(),
    select: ExamSelectSchema.optional(),
    update: z.union([ExamUpdateInputSchema, ExamUncheckedUpdateInputSchema]),
    where: ExamWhereUniqueInputSchema,
  })
  .strict();

export const ExamCreateManyArgsSchema: z.ZodType<Prisma.ExamCreateManyArgs> = z
  .object({
    data: z.union([
      ExamCreateManyInputSchema,
      ExamCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ExamCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ExamCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        ExamCreateManyInputSchema,
        ExamCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ExamDeleteArgsSchema: z.ZodType<Prisma.ExamDeleteArgs> = z
  .object({
    include: ExamIncludeSchema.optional(),
    select: ExamSelectSchema.optional(),
    where: ExamWhereUniqueInputSchema,
  })
  .strict();

export const ExamUpdateArgsSchema: z.ZodType<Prisma.ExamUpdateArgs> = z
  .object({
    data: z.union([ExamUpdateInputSchema, ExamUncheckedUpdateInputSchema]),
    include: ExamIncludeSchema.optional(),
    select: ExamSelectSchema.optional(),
    where: ExamWhereUniqueInputSchema,
  })
  .strict();

export const ExamUpdateManyArgsSchema: z.ZodType<Prisma.ExamUpdateManyArgs> = z
  .object({
    data: z.union([
      ExamUpdateManyMutationInputSchema,
      ExamUncheckedUpdateManyInputSchema,
    ]),
    limit: z.number().optional(),
    where: ExamWhereInputSchema.optional(),
  })
  .strict();

export const ExamUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ExamUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        ExamUpdateManyMutationInputSchema,
        ExamUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: ExamWhereInputSchema.optional(),
    })
    .strict();

export const ExamDeleteManyArgsSchema: z.ZodType<Prisma.ExamDeleteManyArgs> = z
  .object({
    limit: z.number().optional(),
    where: ExamWhereInputSchema.optional(),
  })
  .strict();

export const StationPatientCreateArgsSchema: z.ZodType<Prisma.StationPatientCreateArgs>
  = z
    .object({
      data: z.union([
        StationPatientCreateInputSchema,
        StationPatientUncheckedCreateInputSchema,
      ]),
      include: StationPatientIncludeSchema.optional(),
      select: StationPatientSelectSchema.optional(),
    })
    .strict();

export const StationPatientUpsertArgsSchema: z.ZodType<Prisma.StationPatientUpsertArgs>
  = z
    .object({
      create: z.union([
        StationPatientCreateInputSchema,
        StationPatientUncheckedCreateInputSchema,
      ]),
      include: StationPatientIncludeSchema.optional(),
      select: StationPatientSelectSchema.optional(),
      update: z.union([
        StationPatientUpdateInputSchema,
        StationPatientUncheckedUpdateInputSchema,
      ]),
      where: StationPatientWhereUniqueInputSchema,
    })
    .strict();

export const StationPatientCreateManyArgsSchema: z.ZodType<Prisma.StationPatientCreateManyArgs>
  = z
    .object({
      data: z.union([
        StationPatientCreateManyInputSchema,
        StationPatientCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StationPatientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StationPatientCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        StationPatientCreateManyInputSchema,
        StationPatientCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StationPatientDeleteArgsSchema: z.ZodType<Prisma.StationPatientDeleteArgs>
  = z
    .object({
      include: StationPatientIncludeSchema.optional(),
      select: StationPatientSelectSchema.optional(),
      where: StationPatientWhereUniqueInputSchema,
    })
    .strict();

export const StationPatientUpdateArgsSchema: z.ZodType<Prisma.StationPatientUpdateArgs>
  = z
    .object({
      data: z.union([
        StationPatientUpdateInputSchema,
        StationPatientUncheckedUpdateInputSchema,
      ]),
      include: StationPatientIncludeSchema.optional(),
      select: StationPatientSelectSchema.optional(),
      where: StationPatientWhereUniqueInputSchema,
    })
    .strict();

export const StationPatientUpdateManyArgsSchema: z.ZodType<Prisma.StationPatientUpdateManyArgs>
  = z
    .object({
      data: z.union([
        StationPatientUpdateManyMutationInputSchema,
        StationPatientUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StationPatientUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        StationPatientUpdateManyMutationInputSchema,
        StationPatientUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const StationPatientDeleteManyArgsSchema: z.ZodType<Prisma.StationPatientDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: StationPatientWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentCreateArgsSchema: z.ZodType<Prisma.TeatmentCreateArgs> = z
  .object({
    data: z.union([
      TeatmentCreateInputSchema,
      TeatmentUncheckedCreateInputSchema,
    ]),
    include: TeatmentIncludeSchema.optional(),
    select: TeatmentSelectSchema.optional(),
  })
  .strict();

export const TeatmentUpsertArgsSchema: z.ZodType<Prisma.TeatmentUpsertArgs> = z
  .object({
    create: z.union([
      TeatmentCreateInputSchema,
      TeatmentUncheckedCreateInputSchema,
    ]),
    include: TeatmentIncludeSchema.optional(),
    select: TeatmentSelectSchema.optional(),
    update: z.union([
      TeatmentUpdateInputSchema,
      TeatmentUncheckedUpdateInputSchema,
    ]),
    where: TeatmentWhereUniqueInputSchema,
  })
  .strict();

export const TeatmentCreateManyArgsSchema: z.ZodType<Prisma.TeatmentCreateManyArgs>
  = z
    .object({
      data: z.union([
        TeatmentCreateManyInputSchema,
        TeatmentCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TeatmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TeatmentCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        TeatmentCreateManyInputSchema,
        TeatmentCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TeatmentDeleteArgsSchema: z.ZodType<Prisma.TeatmentDeleteArgs> = z
  .object({
    include: TeatmentIncludeSchema.optional(),
    select: TeatmentSelectSchema.optional(),
    where: TeatmentWhereUniqueInputSchema,
  })
  .strict();

export const TeatmentUpdateArgsSchema: z.ZodType<Prisma.TeatmentUpdateArgs> = z
  .object({
    data: z.union([
      TeatmentUpdateInputSchema,
      TeatmentUncheckedUpdateInputSchema,
    ]),
    include: TeatmentIncludeSchema.optional(),
    select: TeatmentSelectSchema.optional(),
    where: TeatmentWhereUniqueInputSchema,
  })
  .strict();

export const TeatmentUpdateManyArgsSchema: z.ZodType<Prisma.TeatmentUpdateManyArgs>
  = z
    .object({
      data: z.union([
        TeatmentUpdateManyMutationInputSchema,
        TeatmentUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TeatmentUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        TeatmentUpdateManyMutationInputSchema,
        TeatmentUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();

export const TeatmentDeleteManyArgsSchema: z.ZodType<Prisma.TeatmentDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: TeatmentWhereInputSchema.optional(),
    })
    .strict();
