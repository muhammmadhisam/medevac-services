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

export const MissionScalarFieldEnumSchema = z.enum([
  "id",
  "status",
  "title",
  "case_number",
  "description",
  "end_date",
  "address",
  "image",
  "lat",
  "long",
  "utm",
  "mgrs",
  "create_date",
  "update_date",
  "delete_date",
]);

export const JoinerScalarFieldEnumSchema = z.enum([
  "id",
  "mission_id",
  "user_id",
  "create_date",
  "update_date",
]);

export const PatientScalarFieldEnumSchema = z.enum([
  "id",
  "mission_id",
  "patient_id",
  "create_date",
  "update_date",
]);

export const HistoryJoinerScalarFieldEnumSchema = z.enum([
  "id",
  "mission_id",
  "user_id",
  "create_date",
  "update_date",
]);

export const SubMissionScalarFieldEnumSchema = z.enum([
  "id",
  "mission_id",
  "vehicle_id",
  "patient_id",
  "create_date",
  "update_date",
  "delete_date",
]);

export const SubMissionTagScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "sub_mission_id",
  "date_time",
  "create_date",
  "update_date",
  "delete_date",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const MissionStatusSchema = z.enum([
  "Pending",
  "Progress",
  "Completed",
  "Close",
  "Cancel",
]);

export type MissionStatusType = `${z.infer<typeof MissionStatusSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// MISSION SCHEMA
/////////////////////////////////////////

export const MissionSchema = z.object({
  address: z.string().nullish(),
  case_number: z.string().nullish(),
  create_date: z.coerce.date(),
  delete_date: z.coerce.date().nullish(),
  description: z.string().nullish(),
  end_date: z.coerce.date().nullish(),
  id: z.string().uuid(),
  image: z.string().nullish(),
  lat: z.string().nullish(),
  long: z.string().nullish(),
  mgrs: z.string().nullish(),
  status: MissionStatusSchema,
  title: z.string(),
  update_date: z.coerce.date(),
  utm: z.string().nullish(),
});

export type Mission = z.infer<typeof MissionSchema>;

/////////////////////////////////////////
// MISSION PARTIAL SCHEMA
/////////////////////////////////////////

export const MissionPartialSchema = MissionSchema.partial();

export type MissionPartial = z.infer<typeof MissionPartialSchema>;

// MISSION OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const MissionOptionalDefaultsSchema = MissionSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    status: MissionStatusSchema.optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type MissionOptionalDefaults = z.infer<
  typeof MissionOptionalDefaultsSchema
>;

// MISSION RELATION SCHEMA
// ------------------------------------------------------

export type MissionRelations = {
  SubMission: SubMissionWithRelations[];
  Joiners: JoinerWithRelations[];
  HistoryJoiner: HistoryJoinerWithRelations[];
  Patient: PatientWithRelations[];
};

export type MissionWithRelations = z.infer<typeof MissionSchema> &
  MissionRelations;

export const MissionWithRelationsSchema: z.ZodType<MissionWithRelations>
  = MissionSchema.merge(
    z.object({
      HistoryJoiner: z.lazy(() => HistoryJoinerWithRelationsSchema).array(),
      Joiners: z.lazy(() => JoinerWithRelationsSchema).array(),
      Patient: z.lazy(() => PatientWithRelationsSchema).array(),
      SubMission: z.lazy(() => SubMissionWithRelationsSchema).array(),
    }),
  );

// MISSION OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type MissionOptionalDefaultsRelations = {
  SubMission: SubMissionOptionalDefaultsWithRelations[];
  Joiners: JoinerOptionalDefaultsWithRelations[];
  HistoryJoiner: HistoryJoinerOptionalDefaultsWithRelations[];
  Patient: PatientOptionalDefaultsWithRelations[];
};

export type MissionOptionalDefaultsWithRelations = z.infer<
  typeof MissionOptionalDefaultsSchema
> &
MissionOptionalDefaultsRelations;

export const MissionOptionalDefaultsWithRelationsSchema: z.ZodType<MissionOptionalDefaultsWithRelations>
  = MissionOptionalDefaultsSchema.merge(
    z.object({
      HistoryJoiner: z
        .lazy(() => HistoryJoinerOptionalDefaultsWithRelationsSchema)
        .array(),
      Joiners: z.lazy(() => JoinerOptionalDefaultsWithRelationsSchema).array(),
      Patient: z.lazy(() => PatientOptionalDefaultsWithRelationsSchema).array(),
      SubMission: z
        .lazy(() => SubMissionOptionalDefaultsWithRelationsSchema)
        .array(),
    }),
  );

// MISSION PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type MissionPartialRelations = {
  SubMission?: SubMissionPartialWithRelations[];
  Joiners?: JoinerPartialWithRelations[];
  HistoryJoiner?: HistoryJoinerPartialWithRelations[];
  Patient?: PatientPartialWithRelations[];
};

export type MissionPartialWithRelations = z.infer<typeof MissionPartialSchema> &
  MissionPartialRelations;

export const MissionPartialWithRelationsSchema: z.ZodType<MissionPartialWithRelations>
  = MissionPartialSchema.merge(
    z.object({
      HistoryJoiner: z
        .lazy(() => HistoryJoinerPartialWithRelationsSchema)
        .array(),
      Joiners: z.lazy(() => JoinerPartialWithRelationsSchema).array(),
      Patient: z.lazy(() => PatientPartialWithRelationsSchema).array(),
      SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema).array(),
    }),
  ).partial();

export type MissionOptionalDefaultsWithPartialRelations = z.infer<
  typeof MissionOptionalDefaultsSchema
> &
MissionPartialRelations;

export const MissionOptionalDefaultsWithPartialRelationsSchema: z.ZodType<MissionOptionalDefaultsWithPartialRelations>
  = MissionOptionalDefaultsSchema.merge(
    z
      .object({
        HistoryJoiner: z
          .lazy(() => HistoryJoinerPartialWithRelationsSchema)
          .array(),
        Joiners: z.lazy(() => JoinerPartialWithRelationsSchema).array(),
        Patient: z.lazy(() => PatientPartialWithRelationsSchema).array(),
        SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema).array(),
      })
      .partial(),
  );

export type MissionWithPartialRelations = z.infer<typeof MissionSchema> &
  MissionPartialRelations;

export const MissionWithPartialRelationsSchema: z.ZodType<MissionWithPartialRelations>
  = MissionSchema.merge(
    z
      .object({
        HistoryJoiner: z
          .lazy(() => HistoryJoinerPartialWithRelationsSchema)
          .array(),
        Joiners: z.lazy(() => JoinerPartialWithRelationsSchema).array(),
        Patient: z.lazy(() => PatientPartialWithRelationsSchema).array(),
        SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema).array(),
      })
      .partial(),
  );

/////////////////////////////////////////
// JOINER SCHEMA
/////////////////////////////////////////

export const JoinerSchema = z.object({
  create_date: z.coerce.date(),
  id: z.string().uuid(),
  mission_id: z.string(),
  update_date: z.coerce.date(),
  user_id: z.string(),
});

export type Joiner = z.infer<typeof JoinerSchema>;

/////////////////////////////////////////
// JOINER PARTIAL SCHEMA
/////////////////////////////////////////

export const JoinerPartialSchema = JoinerSchema.partial();

export type JoinerPartial = z.infer<typeof JoinerPartialSchema>;

// JOINER OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const JoinerOptionalDefaultsSchema = JoinerSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type JoinerOptionalDefaults = z.infer<
  typeof JoinerOptionalDefaultsSchema
>;

// JOINER RELATION SCHEMA
// ------------------------------------------------------

export type JoinerRelations = {
  Mission: MissionWithRelations;
};

export type JoinerWithRelations = z.infer<typeof JoinerSchema> &
  JoinerRelations;

export const JoinerWithRelationsSchema: z.ZodType<JoinerWithRelations>
  = JoinerSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionWithRelationsSchema),
    }),
  );

// JOINER OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type JoinerOptionalDefaultsRelations = {
  Mission: MissionOptionalDefaultsWithRelations;
};

export type JoinerOptionalDefaultsWithRelations = z.infer<
  typeof JoinerOptionalDefaultsSchema
> &
JoinerOptionalDefaultsRelations;

export const JoinerOptionalDefaultsWithRelationsSchema: z.ZodType<JoinerOptionalDefaultsWithRelations>
  = JoinerOptionalDefaultsSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionOptionalDefaultsWithRelationsSchema),
    }),
  );

// JOINER PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type JoinerPartialRelations = {
  Mission?: MissionPartialWithRelations;
};

export type JoinerPartialWithRelations = z.infer<typeof JoinerPartialSchema> &
  JoinerPartialRelations;

export const JoinerPartialWithRelationsSchema: z.ZodType<JoinerPartialWithRelations>
  = JoinerPartialSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionPartialWithRelationsSchema),
    }),
  ).partial();

export type JoinerOptionalDefaultsWithPartialRelations = z.infer<
  typeof JoinerOptionalDefaultsSchema
> &
JoinerPartialRelations;

export const JoinerOptionalDefaultsWithPartialRelationsSchema: z.ZodType<JoinerOptionalDefaultsWithPartialRelations>
  = JoinerOptionalDefaultsSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      })
      .partial(),
  );

export type JoinerWithPartialRelations = z.infer<typeof JoinerSchema> &
  JoinerPartialRelations;

export const JoinerWithPartialRelationsSchema: z.ZodType<JoinerWithPartialRelations>
  = JoinerSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// PATIENT SCHEMA
/////////////////////////////////////////

export const PatientSchema = z.object({
  create_date: z.coerce.date(),
  id: z.string().uuid(),
  mission_id: z.string(),
  patient_id: z.string(),
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
  Mission: MissionWithRelations;
};

export type PatientWithRelations = z.infer<typeof PatientSchema> &
  PatientRelations;

export const PatientWithRelationsSchema: z.ZodType<PatientWithRelations>
  = PatientSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionWithRelationsSchema),
    }),
  );

// PATIENT OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type PatientOptionalDefaultsRelations = {
  Mission: MissionOptionalDefaultsWithRelations;
};

export type PatientOptionalDefaultsWithRelations = z.infer<
  typeof PatientOptionalDefaultsSchema
> &
PatientOptionalDefaultsRelations;

export const PatientOptionalDefaultsWithRelationsSchema: z.ZodType<PatientOptionalDefaultsWithRelations>
  = PatientOptionalDefaultsSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionOptionalDefaultsWithRelationsSchema),
    }),
  );

// PATIENT PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type PatientPartialRelations = {
  Mission?: MissionPartialWithRelations;
};

export type PatientPartialWithRelations = z.infer<typeof PatientPartialSchema> &
  PatientPartialRelations;

export const PatientPartialWithRelationsSchema: z.ZodType<PatientPartialWithRelations>
  = PatientPartialSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionPartialWithRelationsSchema),
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
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      })
      .partial(),
  );

export type PatientWithPartialRelations = z.infer<typeof PatientSchema> &
  PatientPartialRelations;

export const PatientWithPartialRelationsSchema: z.ZodType<PatientWithPartialRelations>
  = PatientSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// HISTORY JOINER SCHEMA
/////////////////////////////////////////

export const HistoryJoinerSchema = z.object({
  create_date: z.coerce.date(),
  id: z.string().uuid(),
  mission_id: z.string(),
  update_date: z.coerce.date(),
  user_id: z.string(),
});

export type HistoryJoiner = z.infer<typeof HistoryJoinerSchema>;

/////////////////////////////////////////
// HISTORY JOINER PARTIAL SCHEMA
/////////////////////////////////////////

export const HistoryJoinerPartialSchema = HistoryJoinerSchema.partial();

export type HistoryJoinerPartial = z.infer<typeof HistoryJoinerPartialSchema>;

// HISTORY JOINER OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const HistoryJoinerOptionalDefaultsSchema = HistoryJoinerSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type HistoryJoinerOptionalDefaults = z.infer<
  typeof HistoryJoinerOptionalDefaultsSchema
>;

// HISTORY JOINER RELATION SCHEMA
// ------------------------------------------------------

export type HistoryJoinerRelations = {
  Mission: MissionWithRelations;
};

export type HistoryJoinerWithRelations = z.infer<typeof HistoryJoinerSchema> &
  HistoryJoinerRelations;

export const HistoryJoinerWithRelationsSchema: z.ZodType<HistoryJoinerWithRelations>
  = HistoryJoinerSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionWithRelationsSchema),
    }),
  );

// HISTORY JOINER OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type HistoryJoinerOptionalDefaultsRelations = {
  Mission: MissionOptionalDefaultsWithRelations;
};

export type HistoryJoinerOptionalDefaultsWithRelations = z.infer<
  typeof HistoryJoinerOptionalDefaultsSchema
> &
HistoryJoinerOptionalDefaultsRelations;

export const HistoryJoinerOptionalDefaultsWithRelationsSchema: z.ZodType<HistoryJoinerOptionalDefaultsWithRelations>
  = HistoryJoinerOptionalDefaultsSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionOptionalDefaultsWithRelationsSchema),
    }),
  );

// HISTORY JOINER PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type HistoryJoinerPartialRelations = {
  Mission?: MissionPartialWithRelations;
};

export type HistoryJoinerPartialWithRelations = z.infer<
  typeof HistoryJoinerPartialSchema
> &
HistoryJoinerPartialRelations;

export const HistoryJoinerPartialWithRelationsSchema: z.ZodType<HistoryJoinerPartialWithRelations>
  = HistoryJoinerPartialSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionPartialWithRelationsSchema),
    }),
  ).partial();

export type HistoryJoinerOptionalDefaultsWithPartialRelations = z.infer<
  typeof HistoryJoinerOptionalDefaultsSchema
> &
HistoryJoinerPartialRelations;

export const HistoryJoinerOptionalDefaultsWithPartialRelationsSchema: z.ZodType<HistoryJoinerOptionalDefaultsWithPartialRelations>
  = HistoryJoinerOptionalDefaultsSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      })
      .partial(),
  );

export type HistoryJoinerWithPartialRelations = z.infer<
  typeof HistoryJoinerSchema
> &
HistoryJoinerPartialRelations;

export const HistoryJoinerWithPartialRelationsSchema: z.ZodType<HistoryJoinerWithPartialRelations>
  = HistoryJoinerSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// SUB MISSION SCHEMA
/////////////////////////////////////////

export const SubMissionSchema = z.object({
  create_date: z.coerce.date(),
  delete_date: z.coerce.date().nullish(),
  id: z.string().uuid(),
  mission_id: z.string(),
  patient_id: z.string(),
  update_date: z.coerce.date(),
  vehicle_id: z.string(),
});

export type SubMission = z.infer<typeof SubMissionSchema>;

/////////////////////////////////////////
// SUB MISSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SubMissionPartialSchema = SubMissionSchema.partial();

export type SubMissionPartial = z.infer<typeof SubMissionPartialSchema>;

// SUB MISSION OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const SubMissionOptionalDefaultsSchema = SubMissionSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type SubMissionOptionalDefaults = z.infer<
  typeof SubMissionOptionalDefaultsSchema
>;

// SUB MISSION RELATION SCHEMA
// ------------------------------------------------------

export type SubMissionRelations = {
  Mission: MissionWithRelations;
  SubMissioTag: SubMissionTagWithRelations[];
};

export type SubMissionWithRelations = z.infer<typeof SubMissionSchema> &
  SubMissionRelations;

export const SubMissionWithRelationsSchema: z.ZodType<SubMissionWithRelations>
  = SubMissionSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionWithRelationsSchema),
      SubMissioTag: z.lazy(() => SubMissionTagWithRelationsSchema).array(),
    }),
  );

// SUB MISSION OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type SubMissionOptionalDefaultsRelations = {
  Mission: MissionOptionalDefaultsWithRelations;
  SubMissioTag: SubMissionTagOptionalDefaultsWithRelations[];
};

export type SubMissionOptionalDefaultsWithRelations = z.infer<
  typeof SubMissionOptionalDefaultsSchema
> &
SubMissionOptionalDefaultsRelations;

export const SubMissionOptionalDefaultsWithRelationsSchema: z.ZodType<SubMissionOptionalDefaultsWithRelations>
  = SubMissionOptionalDefaultsSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionOptionalDefaultsWithRelationsSchema),
      SubMissioTag: z
        .lazy(() => SubMissionTagOptionalDefaultsWithRelationsSchema)
        .array(),
    }),
  );

// SUB MISSION PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type SubMissionPartialRelations = {
  Mission?: MissionPartialWithRelations;
  SubMissioTag?: SubMissionTagPartialWithRelations[];
};

export type SubMissionPartialWithRelations = z.infer<
  typeof SubMissionPartialSchema
> &
SubMissionPartialRelations;

export const SubMissionPartialWithRelationsSchema: z.ZodType<SubMissionPartialWithRelations>
  = SubMissionPartialSchema.merge(
    z.object({
      Mission: z.lazy(() => MissionPartialWithRelationsSchema),
      SubMissioTag: z
        .lazy(() => SubMissionTagPartialWithRelationsSchema)
        .array(),
    }),
  ).partial();

export type SubMissionOptionalDefaultsWithPartialRelations = z.infer<
  typeof SubMissionOptionalDefaultsSchema
> &
SubMissionPartialRelations;

export const SubMissionOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SubMissionOptionalDefaultsWithPartialRelations>
  = SubMissionOptionalDefaultsSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
        SubMissioTag: z
          .lazy(() => SubMissionTagPartialWithRelationsSchema)
          .array(),
      })
      .partial(),
  );

export type SubMissionWithPartialRelations = z.infer<typeof SubMissionSchema> &
  SubMissionPartialRelations;

export const SubMissionWithPartialRelationsSchema: z.ZodType<SubMissionWithPartialRelations>
  = SubMissionSchema.merge(
    z
      .object({
        Mission: z.lazy(() => MissionPartialWithRelationsSchema),
        SubMissioTag: z
          .lazy(() => SubMissionTagPartialWithRelationsSchema)
          .array(),
      })
      .partial(),
  );

/////////////////////////////////////////
// SUB MISSION TAG SCHEMA
/////////////////////////////////////////

export const SubMissionTagSchema = z.object({
  create_date: z.coerce.date(),
  date_time: z.coerce.date(),
  delete_date: z.coerce.date().nullish(),
  id: z.string().uuid(),
  sub_mission_id: z.string(),
  title: z.string(),
  update_date: z.coerce.date(),
});

export type SubMissionTag = z.infer<typeof SubMissionTagSchema>;

/////////////////////////////////////////
// SUB MISSION TAG PARTIAL SCHEMA
/////////////////////////////////////////

export const SubMissionTagPartialSchema = SubMissionTagSchema.partial();

export type SubMissionTagPartial = z.infer<typeof SubMissionTagPartialSchema>;

// SUB MISSION TAG OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const SubMissionTagOptionalDefaultsSchema = SubMissionTagSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    date_time: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type SubMissionTagOptionalDefaults = z.infer<
  typeof SubMissionTagOptionalDefaultsSchema
>;

// SUB MISSION TAG RELATION SCHEMA
// ------------------------------------------------------

export type SubMissionTagRelations = {
  SubMission: SubMissionWithRelations;
};

export type SubMissionTagWithRelations = z.infer<typeof SubMissionTagSchema> &
  SubMissionTagRelations;

export const SubMissionTagWithRelationsSchema: z.ZodType<SubMissionTagWithRelations>
  = SubMissionTagSchema.merge(
    z.object({
      SubMission: z.lazy(() => SubMissionWithRelationsSchema),
    }),
  );

// SUB MISSION TAG OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type SubMissionTagOptionalDefaultsRelations = {
  SubMission: SubMissionOptionalDefaultsWithRelations;
};

export type SubMissionTagOptionalDefaultsWithRelations = z.infer<
  typeof SubMissionTagOptionalDefaultsSchema
> &
SubMissionTagOptionalDefaultsRelations;

export const SubMissionTagOptionalDefaultsWithRelationsSchema: z.ZodType<SubMissionTagOptionalDefaultsWithRelations>
  = SubMissionTagOptionalDefaultsSchema.merge(
    z.object({
      SubMission: z.lazy(() => SubMissionOptionalDefaultsWithRelationsSchema),
    }),
  );

// SUB MISSION TAG PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type SubMissionTagPartialRelations = {
  SubMission?: SubMissionPartialWithRelations;
};

export type SubMissionTagPartialWithRelations = z.infer<
  typeof SubMissionTagPartialSchema
> &
SubMissionTagPartialRelations;

export const SubMissionTagPartialWithRelationsSchema: z.ZodType<SubMissionTagPartialWithRelations>
  = SubMissionTagPartialSchema.merge(
    z.object({
      SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema),
    }),
  ).partial();

export type SubMissionTagOptionalDefaultsWithPartialRelations = z.infer<
  typeof SubMissionTagOptionalDefaultsSchema
> &
SubMissionTagPartialRelations;

export const SubMissionTagOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SubMissionTagOptionalDefaultsWithPartialRelations>
  = SubMissionTagOptionalDefaultsSchema.merge(
    z
      .object({
        SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema),
      })
      .partial(),
  );

export type SubMissionTagWithPartialRelations = z.infer<
  typeof SubMissionTagSchema
> &
SubMissionTagPartialRelations;

export const SubMissionTagWithPartialRelationsSchema: z.ZodType<SubMissionTagWithPartialRelations>
  = SubMissionTagSchema.merge(
    z
      .object({
        SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MISSION
// ------------------------------------------------------

export const MissionIncludeSchema: z.ZodType<Prisma.MissionInclude> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => MissionCountOutputTypeArgsSchema)])
      .optional(),
    HistoryJoiner: z
      .union([z.boolean(), z.lazy(() => HistoryJoinerFindManyArgsSchema)])
      .optional(),
    Joiners: z
      .union([z.boolean(), z.lazy(() => JoinerFindManyArgsSchema)])
      .optional(),
    Patient: z
      .union([z.boolean(), z.lazy(() => PatientFindManyArgsSchema)])
      .optional(),
    SubMission: z
      .union([z.boolean(), z.lazy(() => SubMissionFindManyArgsSchema)])
      .optional(),
  })
  .strict();

export const MissionArgsSchema: z.ZodType<Prisma.MissionDefaultArgs> = z
  .object({
    include: z.lazy(() => MissionIncludeSchema).optional(),
    select: z.lazy(() => MissionSelectSchema).optional(),
  })
  .strict();

export const MissionCountOutputTypeArgsSchema: z.ZodType<Prisma.MissionCountOutputTypeDefaultArgs>
  = z
    .object({
      select: z.lazy(() => MissionCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const MissionCountOutputTypeSelectSchema: z.ZodType<Prisma.MissionCountOutputTypeSelect>
  = z
    .object({
      HistoryJoiner: z.boolean().optional(),
      Joiners: z.boolean().optional(),
      Patient: z.boolean().optional(),
      SubMission: z.boolean().optional(),
    })
    .strict();

export const MissionSelectSchema: z.ZodType<Prisma.MissionSelect> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => MissionCountOutputTypeArgsSchema)])
      .optional(),
    address: z.boolean().optional(),
    case_number: z.boolean().optional(),
    create_date: z.boolean().optional(),
    delete_date: z.boolean().optional(),
    description: z.boolean().optional(),
    end_date: z.boolean().optional(),
    HistoryJoiner: z
      .union([z.boolean(), z.lazy(() => HistoryJoinerFindManyArgsSchema)])
      .optional(),
    id: z.boolean().optional(),
    image: z.boolean().optional(),
    Joiners: z
      .union([z.boolean(), z.lazy(() => JoinerFindManyArgsSchema)])
      .optional(),
    lat: z.boolean().optional(),
    long: z.boolean().optional(),
    mgrs: z.boolean().optional(),
    Patient: z
      .union([z.boolean(), z.lazy(() => PatientFindManyArgsSchema)])
      .optional(),
    status: z.boolean().optional(),
    SubMission: z
      .union([z.boolean(), z.lazy(() => SubMissionFindManyArgsSchema)])
      .optional(),
    title: z.boolean().optional(),
    update_date: z.boolean().optional(),
    utm: z.boolean().optional(),
  })
  .strict();

// JOINER
// ------------------------------------------------------

export const JoinerIncludeSchema: z.ZodType<Prisma.JoinerInclude> = z
  .object({
    Mission: z.union([z.boolean(), z.lazy(() => MissionArgsSchema)]).optional(),
  })
  .strict();

export const JoinerArgsSchema: z.ZodType<Prisma.JoinerDefaultArgs> = z
  .object({
    include: z.lazy(() => JoinerIncludeSchema).optional(),
    select: z.lazy(() => JoinerSelectSchema).optional(),
  })
  .strict();

export const JoinerSelectSchema: z.ZodType<Prisma.JoinerSelect> = z
  .object({
    create_date: z.boolean().optional(),
    id: z.boolean().optional(),
    Mission: z.union([z.boolean(), z.lazy(() => MissionArgsSchema)]).optional(),
    mission_id: z.boolean().optional(),
    update_date: z.boolean().optional(),
    user_id: z.boolean().optional(),
  })
  .strict();

// PATIENT
// ------------------------------------------------------

export const PatientIncludeSchema: z.ZodType<Prisma.PatientInclude> = z
  .object({
    Mission: z.union([z.boolean(), z.lazy(() => MissionArgsSchema)]).optional(),
  })
  .strict();

export const PatientArgsSchema: z.ZodType<Prisma.PatientDefaultArgs> = z
  .object({
    include: z.lazy(() => PatientIncludeSchema).optional(),
    select: z.lazy(() => PatientSelectSchema).optional(),
  })
  .strict();

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z
  .object({
    create_date: z.boolean().optional(),
    id: z.boolean().optional(),
    Mission: z.union([z.boolean(), z.lazy(() => MissionArgsSchema)]).optional(),
    mission_id: z.boolean().optional(),
    patient_id: z.boolean().optional(),
    update_date: z.boolean().optional(),
  })
  .strict();

// HISTORY JOINER
// ------------------------------------------------------

export const HistoryJoinerIncludeSchema: z.ZodType<Prisma.HistoryJoinerInclude>
  = z
    .object({
      Mission: z
        .union([z.boolean(), z.lazy(() => MissionArgsSchema)])
        .optional(),
    })
    .strict();

export const HistoryJoinerArgsSchema: z.ZodType<Prisma.HistoryJoinerDefaultArgs>
  = z
    .object({
      include: z.lazy(() => HistoryJoinerIncludeSchema).optional(),
      select: z.lazy(() => HistoryJoinerSelectSchema).optional(),
    })
    .strict();

export const HistoryJoinerSelectSchema: z.ZodType<Prisma.HistoryJoinerSelect>
  = z
    .object({
      create_date: z.boolean().optional(),
      id: z.boolean().optional(),
      Mission: z
        .union([z.boolean(), z.lazy(() => MissionArgsSchema)])
        .optional(),
      mission_id: z.boolean().optional(),
      update_date: z.boolean().optional(),
      user_id: z.boolean().optional(),
    })
    .strict();

// SUB MISSION
// ------------------------------------------------------

export const SubMissionIncludeSchema: z.ZodType<Prisma.SubMissionInclude> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => SubMissionCountOutputTypeArgsSchema)])
      .optional(),
    Mission: z.union([z.boolean(), z.lazy(() => MissionArgsSchema)]).optional(),
    SubMissioTag: z
      .union([z.boolean(), z.lazy(() => SubMissionTagFindManyArgsSchema)])
      .optional(),
  })
  .strict();

export const SubMissionArgsSchema: z.ZodType<Prisma.SubMissionDefaultArgs> = z
  .object({
    include: z.lazy(() => SubMissionIncludeSchema).optional(),
    select: z.lazy(() => SubMissionSelectSchema).optional(),
  })
  .strict();

export const SubMissionCountOutputTypeArgsSchema: z.ZodType<Prisma.SubMissionCountOutputTypeDefaultArgs>
  = z
    .object({
      select: z.lazy(() => SubMissionCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const SubMissionCountOutputTypeSelectSchema: z.ZodType<Prisma.SubMissionCountOutputTypeSelect>
  = z
    .object({
      SubMissioTag: z.boolean().optional(),
    })
    .strict();

export const SubMissionSelectSchema: z.ZodType<Prisma.SubMissionSelect> = z
  .object({
    _count: z
      .union([z.boolean(), z.lazy(() => SubMissionCountOutputTypeArgsSchema)])
      .optional(),
    create_date: z.boolean().optional(),
    delete_date: z.boolean().optional(),
    id: z.boolean().optional(),
    Mission: z.union([z.boolean(), z.lazy(() => MissionArgsSchema)]).optional(),
    mission_id: z.boolean().optional(),
    patient_id: z.boolean().optional(),
    SubMissioTag: z
      .union([z.boolean(), z.lazy(() => SubMissionTagFindManyArgsSchema)])
      .optional(),
    update_date: z.boolean().optional(),
    vehicle_id: z.boolean().optional(),
  })
  .strict();

// SUB MISSION TAG
// ------------------------------------------------------

export const SubMissionTagIncludeSchema: z.ZodType<Prisma.SubMissionTagInclude>
  = z
    .object({
      SubMission: z
        .union([z.boolean(), z.lazy(() => SubMissionArgsSchema)])
        .optional(),
    })
    .strict();

export const SubMissionTagArgsSchema: z.ZodType<Prisma.SubMissionTagDefaultArgs>
  = z
    .object({
      include: z.lazy(() => SubMissionTagIncludeSchema).optional(),
      select: z.lazy(() => SubMissionTagSelectSchema).optional(),
    })
    .strict();

export const SubMissionTagSelectSchema: z.ZodType<Prisma.SubMissionTagSelect>
  = z
    .object({
      create_date: z.boolean().optional(),
      date_time: z.boolean().optional(),
      delete_date: z.boolean().optional(),
      id: z.boolean().optional(),
      sub_mission_id: z.boolean().optional(),
      SubMission: z
        .union([z.boolean(), z.lazy(() => SubMissionArgsSchema)])
        .optional(),
      title: z.boolean().optional(),
      update_date: z.boolean().optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MissionWhereInputSchema: z.ZodType<Prisma.MissionWhereInput> = z
  .object({
    address: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    AND: z
      .union([
        z.lazy(() => MissionWhereInputSchema),
        z.lazy(() => MissionWhereInputSchema).array(),
      ])
      .optional(),
    case_number: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    delete_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    end_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    HistoryJoiner: z
      .lazy(() => HistoryJoinerListRelationFilterSchema)
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    Joiners: z.lazy(() => JoinerListRelationFilterSchema).optional(),
    lat: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    long: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    mgrs: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    NOT: z
      .union([
        z.lazy(() => MissionWhereInputSchema),
        z.lazy(() => MissionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MissionWhereInputSchema)
      .array()
      .optional(),
    Patient: z.lazy(() => PatientListRelationFilterSchema).optional(),
    status: z
      .union([
        z.lazy(() => EnumMissionStatusFilterSchema),
        z.lazy(() => MissionStatusSchema),
      ])
      .optional(),
    SubMission: z.lazy(() => SubMissionListRelationFilterSchema).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    utm: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const MissionOrderByWithRelationInputSchema: z.ZodType<Prisma.MissionOrderByWithRelationInput>
  = z
    .object({
      address: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerOrderByRelationAggregateInputSchema)
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      Joiners: z
        .lazy(() => JoinerOrderByRelationAggregateInputSchema)
        .optional(),
      lat: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      long: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      mgrs: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      Patient: z
        .lazy(() => PatientOrderByRelationAggregateInputSchema)
        .optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      SubMission: z
        .lazy(() => SubMissionOrderByRelationAggregateInputSchema)
        .optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      utm: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MissionWhereUniqueInputSchema: z.ZodType<Prisma.MissionWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        title: z.string(),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        title: z.string(),
      }),
    ])
    .and(
      z
        .object({
          address: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          AND: z
            .union([
              z.lazy(() => MissionWhereInputSchema),
              z.lazy(() => MissionWhereInputSchema).array(),
            ])
            .optional(),
          case_number: z
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
          delete_date: z
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
          end_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          HistoryJoiner: z
            .lazy(() => HistoryJoinerListRelationFilterSchema)
            .optional(),
          id: z.string().uuid().optional(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          Joiners: z.lazy(() => JoinerListRelationFilterSchema).optional(),
          lat: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          long: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          mgrs: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          NOT: z
            .union([
              z.lazy(() => MissionWhereInputSchema),
              z.lazy(() => MissionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MissionWhereInputSchema)
            .array()
            .optional(),
          Patient: z.lazy(() => PatientListRelationFilterSchema).optional(),
          status: z
            .union([
              z.lazy(() => EnumMissionStatusFilterSchema),
              z.lazy(() => MissionStatusSchema),
            ])
            .optional(),
          SubMission: z
            .lazy(() => SubMissionListRelationFilterSchema)
            .optional(),
          title: z.string().optional(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          utm: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const MissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.MissionOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => MissionCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MissionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MissionMinOrderByAggregateInputSchema).optional(),
      address: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      lat: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      long: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      mgrs: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      utm: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MissionScalarWhereWithAggregatesInput>
  = z
    .object({
      address: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      AND: z
        .union([
          z.lazy(() => MissionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MissionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
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
      lat: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      NOT: z
        .union([
          z.lazy(() => MissionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MissionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MissionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumMissionStatusWithAggregatesFilterSchema),
          z.lazy(() => MissionStatusSchema),
        ])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      utm: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JoinerWhereInputSchema: z.ZodType<Prisma.JoinerWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => JoinerWhereInputSchema),
        z.lazy(() => JoinerWhereInputSchema).array(),
      ])
      .optional(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    Mission: z
      .union([
        z.lazy(() => MissionScalarRelationFilterSchema),
        z.lazy(() => MissionWhereInputSchema),
      ])
      .optional(),
    mission_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => JoinerWhereInputSchema),
        z.lazy(() => JoinerWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => JoinerWhereInputSchema)
      .array()
      .optional(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    user_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict();

export const JoinerOrderByWithRelationInputSchema: z.ZodType<Prisma.JoinerOrderByWithRelationInput>
  = z
    .object({
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      Mission: z.lazy(() => MissionOrderByWithRelationInputSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JoinerWhereUniqueInputSchema: z.ZodType<Prisma.JoinerWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        mission_id_user_id: z.lazy(
          () => JoinerMission_idUser_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        mission_id_user_id: z.lazy(
          () => JoinerMission_idUser_idCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => JoinerWhereInputSchema),
              z.lazy(() => JoinerWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          Mission: z
            .union([
              z.lazy(() => MissionScalarRelationFilterSchema),
              z.lazy(() => MissionWhereInputSchema),
            ])
            .optional(),
          mission_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          mission_id_user_id: z
            .lazy(() => JoinerMission_idUser_idCompoundUniqueInputSchema)
            .optional(),
          NOT: z
            .union([
              z.lazy(() => JoinerWhereInputSchema),
              z.lazy(() => JoinerWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => JoinerWhereInputSchema)
            .array()
            .optional(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          user_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const JoinerOrderByWithAggregationInputSchema: z.ZodType<Prisma.JoinerOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => JoinerCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => JoinerMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => JoinerMinOrderByAggregateInputSchema).optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JoinerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JoinerScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => JoinerScalarWhereWithAggregatesInputSchema),
          z.lazy(() => JoinerScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
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
      mission_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => JoinerScalarWhereWithAggregatesInputSchema),
          z.lazy(() => JoinerScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => JoinerScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PatientWhereInputSchema: z.ZodType<Prisma.PatientWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PatientWhereInputSchema),
        z.lazy(() => PatientWhereInputSchema).array(),
      ])
      .optional(),
    create_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    Mission: z
      .union([
        z.lazy(() => MissionScalarRelationFilterSchema),
        z.lazy(() => MissionWhereInputSchema),
      ])
      .optional(),
    mission_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
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
    patient_id: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput>
  = z
    .object({
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      Mission: z.lazy(() => MissionOrderByWithRelationInputSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
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
    .union([
      z.object({
        id: z.string().uuid(),
        mission_id_patient_id: z.lazy(
          () => PatientMission_idPatient_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        mission_id_patient_id: z.lazy(
          () => PatientMission_idPatient_idCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => PatientWhereInputSchema),
              z.lazy(() => PatientWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          Mission: z
            .union([
              z.lazy(() => MissionScalarRelationFilterSchema),
              z.lazy(() => MissionWhereInputSchema),
            ])
            .optional(),
          mission_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          mission_id_patient_id: z
            .lazy(() => PatientMission_idPatient_idCompoundUniqueInputSchema)
            .optional(),
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
          patient_id: z
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

export const PatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => PatientCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PatientMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PatientMinOrderByAggregateInputSchema).optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
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
      AND: z
        .union([
          z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
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
      mission_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
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
      patient_id: z
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

export const HistoryJoinerWhereInputSchema: z.ZodType<Prisma.HistoryJoinerWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => HistoryJoinerWhereInputSchema),
          z.lazy(() => HistoryJoinerWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      Mission: z
        .union([
          z.lazy(() => MissionScalarRelationFilterSchema),
          z.lazy(() => MissionWhereInputSchema),
        ])
        .optional(),
      mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => HistoryJoinerWhereInputSchema),
          z.lazy(() => HistoryJoinerWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => HistoryJoinerWhereInputSchema)
        .array()
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      user_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const HistoryJoinerOrderByWithRelationInputSchema: z.ZodType<Prisma.HistoryJoinerOrderByWithRelationInput>
  = z
    .object({
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      Mission: z.lazy(() => MissionOrderByWithRelationInputSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryJoinerWhereUniqueInputSchema: z.ZodType<Prisma.HistoryJoinerWhereUniqueInput>
  = z
    .object({
      id: z.string().uuid(),
    })
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => HistoryJoinerWhereInputSchema),
              z.lazy(() => HistoryJoinerWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          Mission: z
            .union([
              z.lazy(() => MissionScalarRelationFilterSchema),
              z.lazy(() => MissionWhereInputSchema),
            ])
            .optional(),
          mission_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          NOT: z
            .union([
              z.lazy(() => HistoryJoinerWhereInputSchema),
              z.lazy(() => HistoryJoinerWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => HistoryJoinerWhereInputSchema)
            .array()
            .optional(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          user_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const HistoryJoinerOrderByWithAggregationInputSchema: z.ZodType<Prisma.HistoryJoinerOrderByWithAggregationInput>
  = z
    .object({
      _count: z
        .lazy(() => HistoryJoinerCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => HistoryJoinerMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => HistoryJoinerMinOrderByAggregateInputSchema)
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryJoinerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HistoryJoinerScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => HistoryJoinerScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => HistoryJoinerScalarWhereWithAggregatesInputSchema)
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
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      mission_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => HistoryJoinerScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => HistoryJoinerScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => HistoryJoinerScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SubMissionWhereInputSchema: z.ZodType<Prisma.SubMissionWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => SubMissionWhereInputSchema),
          z.lazy(() => SubMissionWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      delete_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      Mission: z
        .union([
          z.lazy(() => MissionScalarRelationFilterSchema),
          z.lazy(() => MissionWhereInputSchema),
        ])
        .optional(),
      mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubMissionWhereInputSchema),
          z.lazy(() => SubMissionWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubMissionWhereInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      SubMissioTag: z
        .lazy(() => SubMissionTagListRelationFilterSchema)
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SubMissionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubMissionOrderByWithRelationInput>
  = z
    .object({
      create_date: z
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
      id: z.lazy(() => SortOrderSchema).optional(),
      Mission: z.lazy(() => MissionOrderByWithRelationInputSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      SubMissioTag: z
        .lazy(() => SubMissionTagOrderByRelationAggregateInputSchema)
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionWhereUniqueInputSchema: z.ZodType<Prisma.SubMissionWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        patient_id_mission_id_vehicle_id: z.lazy(
          () =>
            SubMissionPatient_idMission_idVehicle_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        patient_id_mission_id_vehicle_id: z.lazy(
          () =>
            SubMissionPatient_idMission_idVehicle_idCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => SubMissionWhereInputSchema),
              z.lazy(() => SubMissionWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
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
          id: z.string().uuid().optional(),
          Mission: z
            .union([
              z.lazy(() => MissionScalarRelationFilterSchema),
              z.lazy(() => MissionWhereInputSchema),
            ])
            .optional(),
          mission_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SubMissionWhereInputSchema),
              z.lazy(() => SubMissionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SubMissionWhereInputSchema)
            .array()
            .optional(),
          patient_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          patient_id_mission_id_vehicle_id: z
            .lazy(
              () =>
                SubMissionPatient_idMission_idVehicle_idCompoundUniqueInputSchema,
            )
            .optional(),
          SubMissioTag: z
            .lazy(() => SubMissionTagListRelationFilterSchema)
            .optional(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          vehicle_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const SubMissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubMissionOrderByWithAggregationInput>
  = z
    .object({
      _count: z
        .lazy(() => SubMissionCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => SubMissionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SubMissionMinOrderByAggregateInputSchema).optional(),
      create_date: z
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
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubMissionScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => SubMissionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SubMissionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      create_date: z
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
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      mission_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubMissionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SubMissionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubMissionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SubMissionTagWhereInputSchema: z.ZodType<Prisma.SubMissionTagWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => SubMissionTagWhereInputSchema),
          z.lazy(() => SubMissionTagWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      date_time: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      delete_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      NOT: z
        .union([
          z.lazy(() => SubMissionTagWhereInputSchema),
          z.lazy(() => SubMissionTagWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubMissionTagWhereInputSchema)
        .array()
        .optional(),
      sub_mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      SubMission: z
        .union([
          z.lazy(() => SubMissionScalarRelationFilterSchema),
          z.lazy(() => SubMissionWhereInputSchema),
        ])
        .optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const SubMissionTagOrderByWithRelationInputSchema: z.ZodType<Prisma.SubMissionTagOrderByWithRelationInput>
  = z
    .object({
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      sub_mission_id: z.lazy(() => SortOrderSchema).optional(),
      SubMission: z
        .lazy(() => SubMissionOrderByWithRelationInputSchema)
        .optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionTagWhereUniqueInputSchema: z.ZodType<Prisma.SubMissionTagWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        title_sub_mission_id: z.lazy(
          () => SubMissionTagTitleSub_mission_idCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        title_sub_mission_id: z.lazy(
          () => SubMissionTagTitleSub_mission_idCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => SubMissionTagWhereInputSchema),
              z.lazy(() => SubMissionTagWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          date_time: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          delete_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          id: z.string().uuid().optional(),
          NOT: z
            .union([
              z.lazy(() => SubMissionTagWhereInputSchema),
              z.lazy(() => SubMissionTagWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SubMissionTagWhereInputSchema)
            .array()
            .optional(),
          sub_mission_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          SubMission: z
            .union([
              z.lazy(() => SubMissionScalarRelationFilterSchema),
              z.lazy(() => SubMissionWhereInputSchema),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          title_sub_mission_id: z
            .lazy(
              () => SubMissionTagTitleSub_mission_idCompoundUniqueInputSchema,
            )
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

export const SubMissionTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubMissionTagOrderByWithAggregationInput>
  = z
    .object({
      _count: z
        .lazy(() => SubMissionTagCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => SubMissionTagMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => SubMissionTagMinOrderByAggregateInputSchema)
        .optional(),
      create_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      date_time: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      sub_mission_id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubMissionTagScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => SubMissionTagScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SubMissionTagScalarWhereWithAggregatesInputSchema)
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
      date_time: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      delete_date: z
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
          z.lazy(() => SubMissionTagScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SubMissionTagScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubMissionTagScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      sub_mission_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
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

export const MissionCreateInputSchema: z.ZodType<Prisma.MissionCreateInput> = z
  .object({
    address: z.string().optional().nullable(),
    case_number: z.string().optional().nullable(),
    create_date: z.coerce.date().optional().nullable(),
    delete_date: z.coerce.date().optional().nullable(),
    description: z.string().optional().nullable(),
    end_date: z.coerce.date().optional().nullable(),
    HistoryJoiner: z
      .lazy(() => HistoryJoinerCreateNestedManyWithoutMissionInputSchema)
      .optional(),
    id: z.string().uuid().optional(),
    image: z.string().optional().nullable(),
    Joiners: z
      .lazy(() => JoinerCreateNestedManyWithoutMissionInputSchema)
      .optional(),
    lat: z.string().optional().nullable(),
    long: z.string().optional().nullable(),
    mgrs: z.string().optional().nullable(),
    Patient: z
      .lazy(() => PatientCreateNestedManyWithoutMissionInputSchema)
      .optional(),
    status: z.lazy(() => MissionStatusSchema).optional(),
    SubMission: z
      .lazy(() => SubMissionCreateNestedManyWithoutMissionInputSchema)
      .optional(),
    title: z.string(),
    update_date: z.coerce.date().optional().nullable(),
    utm: z.string().optional().nullable(),
  })
  .strict();

export const MissionUncheckedCreateInputSchema: z.ZodType<Prisma.MissionUncheckedCreateInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionUpdateInputSchema: z.ZodType<Prisma.MissionUpdateInput> = z
  .object({
    address: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    case_number: z
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
    delete_date: z
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
    end_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    HistoryJoiner: z
      .lazy(() => HistoryJoinerUpdateManyWithoutMissionNestedInputSchema)
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
    Joiners: z
      .lazy(() => JoinerUpdateManyWithoutMissionNestedInputSchema)
      .optional(),
    lat: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    long: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    mgrs: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    Patient: z
      .lazy(() => PatientUpdateManyWithoutMissionNestedInputSchema)
      .optional(),
    status: z
      .union([
        z.lazy(() => MissionStatusSchema),
        z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    SubMission: z
      .lazy(() => SubMissionUpdateManyWithoutMissionNestedInputSchema)
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    update_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    utm: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const MissionUncheckedUpdateInputSchema: z.ZodType<Prisma.MissionUncheckedUpdateInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
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
      Joiners: z
        .lazy(() => JoinerUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionCreateManyInputSchema: z.ZodType<Prisma.MissionCreateManyInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionUpdateManyMutationInputSchema: z.ZodType<Prisma.MissionUpdateManyMutationInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
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
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MissionUncheckedUpdateManyInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
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
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JoinerCreateInputSchema: z.ZodType<Prisma.JoinerCreateInput> = z
  .object({
    create_date: z.coerce.date().optional().nullable(),
    id: z.string().uuid().optional(),
    Mission: z.lazy(() => MissionCreateNestedOneWithoutJoinersInputSchema),
    update_date: z.coerce.date().optional().nullable(),
    user_id: z.string(),
  })
  .strict();

export const JoinerUncheckedCreateInputSchema: z.ZodType<Prisma.JoinerUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const JoinerUpdateInputSchema: z.ZodType<Prisma.JoinerUpdateInput> = z
  .object({
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
    Mission: z
      .lazy(() => MissionUpdateOneRequiredWithoutJoinersNestedInputSchema)
      .optional(),
    update_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict();

export const JoinerUncheckedUpdateInputSchema: z.ZodType<Prisma.JoinerUncheckedUpdateInput>
  = z
    .object({
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
      mission_id: z
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
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JoinerCreateManyInputSchema: z.ZodType<Prisma.JoinerCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const JoinerUpdateManyMutationInputSchema: z.ZodType<Prisma.JoinerUpdateManyMutationInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JoinerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JoinerUncheckedUpdateManyInput>
  = z
    .object({
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
      mission_id: z
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
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z
  .object({
    create_date: z.coerce.date().optional().nullable(),
    id: z.string().uuid().optional(),
    Mission: z.lazy(() => MissionCreateNestedOneWithoutPatientInputSchema),
    patient_id: z.string(),
    update_date: z.coerce.date().optional().nullable(),
  })
  .strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z
  .object({
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
    Mission: z
      .lazy(() => MissionUpdateOneRequiredWithoutPatientNestedInputSchema)
      .optional(),
    patient_id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
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

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput>
  = z
    .object({
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
      mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
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

export const PatientCreateManyInputSchema: z.ZodType<Prisma.PatientCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientUpdateManyMutationInput>
  = z
    .object({
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
      mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
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

export const HistoryJoinerCreateInputSchema: z.ZodType<Prisma.HistoryJoinerCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      Mission: z.lazy(
        () => MissionCreateNestedOneWithoutHistoryJoinerInputSchema,
      ),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const HistoryJoinerUncheckedCreateInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const HistoryJoinerUpdateInputSchema: z.ZodType<Prisma.HistoryJoinerUpdateInput>
  = z
    .object({
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
      Mission: z
        .lazy(
          () => MissionUpdateOneRequiredWithoutHistoryJoinerNestedInputSchema,
        )
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUncheckedUpdateInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedUpdateInput>
  = z
    .object({
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
      mission_id: z
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
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerCreateManyInputSchema: z.ZodType<Prisma.HistoryJoinerCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const HistoryJoinerUpdateManyMutationInputSchema: z.ZodType<Prisma.HistoryJoinerUpdateManyMutationInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedUpdateManyInput>
  = z
    .object({
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
      mission_id: z
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
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionCreateInputSchema: z.ZodType<Prisma.SubMissionCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      Mission: z.lazy(() => MissionCreateNestedOneWithoutSubMissionInputSchema),
      patient_id: z.string(),
      SubMissioTag: z
        .lazy(() => SubMissionTagCreateNestedManyWithoutSubMissionInputSchema)
        .optional(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionUncheckedCreateInputSchema: z.ZodType<Prisma.SubMissionUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      patient_id: z.string(),
      SubMissioTag: z
        .lazy(
          () =>
            SubMissionTagUncheckedCreateNestedManyWithoutSubMissionInputSchema,
        )
        .optional(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionUpdateInputSchema: z.ZodType<Prisma.SubMissionUpdateInput>
  = z
    .object({
      create_date: z
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
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Mission: z
        .lazy(() => MissionUpdateOneRequiredWithoutSubMissionNestedInputSchema)
        .optional(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMissioTag: z
        .lazy(() => SubMissionTagUpdateManyWithoutSubMissionNestedInputSchema)
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubMissionUncheckedUpdateInput>
  = z
    .object({
      create_date: z
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
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMissioTag: z
        .lazy(
          () =>
            SubMissionTagUncheckedUpdateManyWithoutSubMissionNestedInputSchema,
        )
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionCreateManyInputSchema: z.ZodType<Prisma.SubMissionCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubMissionUpdateManyMutationInput>
  = z
    .object({
      create_date: z
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubMissionUncheckedUpdateManyInput>
  = z
    .object({
      create_date: z
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
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
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
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionTagCreateInputSchema: z.ZodType<Prisma.SubMissionTagCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      date_time: z.coerce.date().optional(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      SubMission: z.lazy(
        () => SubMissionCreateNestedOneWithoutSubMissioTagInputSchema,
      ),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionTagUncheckedCreateInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      date_time: z.coerce.date().optional(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      sub_mission_id: z.string(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionTagUpdateInputSchema: z.ZodType<Prisma.SubMissionTagUpdateInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      SubMission: z
        .lazy(
          () => SubMissionUpdateOneRequiredWithoutSubMissioTagNestedInputSchema,
        )
        .optional(),
      title: z
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

export const SubMissionTagUncheckedUpdateInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedUpdateInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      sub_mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
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

export const SubMissionTagCreateManyInputSchema: z.ZodType<Prisma.SubMissionTagCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      date_time: z.coerce.date().optional(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      sub_mission_id: z.string(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionTagUpdateManyMutationInputSchema: z.ZodType<Prisma.SubMissionTagUpdateManyMutationInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      title: z
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

export const SubMissionTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedUpdateManyInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      sub_mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
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

export const EnumMissionStatusFilterSchema: z.ZodType<Prisma.EnumMissionStatusFilter>
  = z
    .object({
      equals: z.lazy(() => MissionStatusSchema).optional(),
      in: z
        .lazy(() => MissionStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => NestedEnumMissionStatusFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => MissionStatusSchema)
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

export const SubMissionListRelationFilterSchema: z.ZodType<Prisma.SubMissionListRelationFilter>
  = z
    .object({
      every: z.lazy(() => SubMissionWhereInputSchema).optional(),
      none: z.lazy(() => SubMissionWhereInputSchema).optional(),
      some: z.lazy(() => SubMissionWhereInputSchema).optional(),
    })
    .strict();

export const JoinerListRelationFilterSchema: z.ZodType<Prisma.JoinerListRelationFilter>
  = z
    .object({
      every: z.lazy(() => JoinerWhereInputSchema).optional(),
      none: z.lazy(() => JoinerWhereInputSchema).optional(),
      some: z.lazy(() => JoinerWhereInputSchema).optional(),
    })
    .strict();

export const HistoryJoinerListRelationFilterSchema: z.ZodType<Prisma.HistoryJoinerListRelationFilter>
  = z
    .object({
      every: z.lazy(() => HistoryJoinerWhereInputSchema).optional(),
      none: z.lazy(() => HistoryJoinerWhereInputSchema).optional(),
      some: z.lazy(() => HistoryJoinerWhereInputSchema).optional(),
    })
    .strict();

export const PatientListRelationFilterSchema: z.ZodType<Prisma.PatientListRelationFilter>
  = z
    .object({
      every: z.lazy(() => PatientWhereInputSchema).optional(),
      none: z.lazy(() => PatientWhereInputSchema).optional(),
      some: z.lazy(() => PatientWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    nulls: z.lazy(() => NullsOrderSchema).optional(),
    sort: z.lazy(() => SortOrderSchema),
  })
  .strict();

export const SubMissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubMissionOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JoinerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JoinerOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryJoinerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HistoryJoinerOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PatientOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.MissionCountOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      case_number: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      end_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      lat: z.lazy(() => SortOrderSchema).optional(),
      long: z.lazy(() => SortOrderSchema).optional(),
      mgrs: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      utm: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MissionMaxOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      case_number: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      end_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      lat: z.lazy(() => SortOrderSchema).optional(),
      long: z.lazy(() => SortOrderSchema).optional(),
      mgrs: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      utm: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.MissionMinOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      case_number: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      end_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      lat: z.lazy(() => SortOrderSchema).optional(),
      long: z.lazy(() => SortOrderSchema).optional(),
      mgrs: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      utm: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumMissionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMissionStatusWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMissionStatusFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMissionStatusFilterSchema).optional(),
      equals: z.lazy(() => MissionStatusSchema).optional(),
      in: z
        .lazy(() => MissionStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => NestedEnumMissionStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => MissionStatusSchema)
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

export const MissionScalarRelationFilterSchema: z.ZodType<Prisma.MissionScalarRelationFilter>
  = z
    .object({
      is: z.lazy(() => MissionWhereInputSchema).optional(),
      isNot: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const JoinerMission_idUser_idCompoundUniqueInputSchema: z.ZodType<Prisma.JoinerMission_idUser_idCompoundUniqueInput>
  = z
    .object({
      mission_id: z.string(),
      user_id: z.string(),
    })
    .strict();

export const JoinerCountOrderByAggregateInputSchema: z.ZodType<Prisma.JoinerCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JoinerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JoinerMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JoinerMinOrderByAggregateInputSchema: z.ZodType<Prisma.JoinerMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientMission_idPatient_idCompoundUniqueInputSchema: z.ZodType<Prisma.PatientMission_idPatient_idCompoundUniqueInput>
  = z
    .object({
      mission_id: z.string(),
      patient_id: z.string(),
    })
    .strict();

export const PatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryJoinerCountOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryJoinerCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryJoinerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryJoinerMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HistoryJoinerMinOrderByAggregateInputSchema: z.ZodType<Prisma.HistoryJoinerMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionTagListRelationFilterSchema: z.ZodType<Prisma.SubMissionTagListRelationFilter>
  = z
    .object({
      every: z.lazy(() => SubMissionTagWhereInputSchema).optional(),
      none: z.lazy(() => SubMissionTagWhereInputSchema).optional(),
      some: z.lazy(() => SubMissionTagWhereInputSchema).optional(),
    })
    .strict();

export const SubMissionTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubMissionTagOrderByRelationAggregateInput>
  = z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionPatient_idMission_idVehicle_idCompoundUniqueInputSchema: z.ZodType<Prisma.SubMissionPatient_idMission_idVehicle_idCompoundUniqueInput>
  = z
    .object({
      mission_id: z.string(),
      patient_id: z.string(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubMissionCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubMissionMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      vehicle_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubMissionMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      mission_id: z.lazy(() => SortOrderSchema).optional(),
      patient_id: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      vehicle_id: z.lazy(() => SortOrderSchema).optional(),
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

export const SubMissionScalarRelationFilterSchema: z.ZodType<Prisma.SubMissionScalarRelationFilter>
  = z
    .object({
      is: z.lazy(() => SubMissionWhereInputSchema).optional(),
      isNot: z.lazy(() => SubMissionWhereInputSchema).optional(),
    })
    .strict();

export const SubMissionTagTitleSub_mission_idCompoundUniqueInputSchema: z.ZodType<Prisma.SubMissionTagTitleSub_mission_idCompoundUniqueInput>
  = z
    .object({
      sub_mission_id: z.string(),
      title: z.string(),
    })
    .strict();

export const SubMissionTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubMissionTagCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      date_time: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      sub_mission_id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubMissionTagMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      date_time: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      sub_mission_id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubMissionTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubMissionTagMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      date_time: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      sub_mission_id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
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

export const SubMissionCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema),
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema).array(),
          z.lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const JoinerCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.JoinerCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => JoinerCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const HistoryJoinerCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema),
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => HistoryJoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const PatientCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.PatientCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutMissionInputSchema),
          z.lazy(() => PatientCreateWithoutMissionInputSchema).array(),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PatientCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const SubMissionUncheckedCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUncheckedCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema),
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema).array(),
          z.lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const JoinerUncheckedCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUncheckedCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => JoinerCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const HistoryJoinerUncheckedCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema),
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => HistoryJoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const PatientUncheckedCreateNestedManyWithoutMissionInputSchema: z.ZodType<Prisma.PatientUncheckedCreateNestedManyWithoutMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutMissionInputSchema),
          z.lazy(() => PatientCreateWithoutMissionInputSchema).array(),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PatientCreateManyMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const EnumMissionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMissionStatusFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => MissionStatusSchema).optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>
  = z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.SubMissionUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema),
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema).array(),
          z.lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SubMissionScalarWhereInputSchema),
          z.lazy(() => SubMissionScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SubMissionUpdateWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionUpdateWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SubMissionUpdateManyWithWhereWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionUpdateManyWithWhereWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => SubMissionUpsertWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionUpsertWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const JoinerUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.JoinerUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => JoinerCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => JoinerScalarWhereInputSchema),
          z.lazy(() => JoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => JoinerUpdateWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => JoinerUpdateWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => JoinerUpdateManyWithWhereWithoutMissionInputSchema),
          z
            .lazy(() => JoinerUpdateManyWithWhereWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => JoinerUpsertWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => JoinerUpsertWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.HistoryJoinerUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema),
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => HistoryJoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => HistoryJoinerScalarWhereInputSchema),
          z.lazy(() => HistoryJoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => HistoryJoinerUpdateWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => HistoryJoinerUpdateWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => HistoryJoinerUpdateManyWithWhereWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => HistoryJoinerUpdateManyWithWhereWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => HistoryJoinerUpsertWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => HistoryJoinerUpsertWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const PatientUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.PatientUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutMissionInputSchema),
          z.lazy(() => PatientCreateWithoutMissionInputSchema).array(),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PatientCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PatientScalarWhereInputSchema),
          z.lazy(() => PatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PatientUpdateWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => PatientUpdateWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PatientUpdateManyWithWhereWithoutMissionInputSchema),
          z
            .lazy(() => PatientUpdateManyWithWhereWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PatientUpsertWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => PatientUpsertWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const SubMissionUncheckedUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.SubMissionUncheckedUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema),
          z.lazy(() => SubMissionCreateWithoutMissionInputSchema).array(),
          z.lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SubMissionScalarWhereInputSchema),
          z.lazy(() => SubMissionScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => SubMissionWhereUniqueInputSchema),
          z.lazy(() => SubMissionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SubMissionUpdateWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionUpdateWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SubMissionUpdateManyWithWhereWithoutMissionInputSchema),
          z
            .lazy(() => SubMissionUpdateManyWithWhereWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => SubMissionUpsertWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionUpsertWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const JoinerUncheckedUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.JoinerUncheckedUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => JoinerCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => JoinerScalarWhereInputSchema),
          z.lazy(() => JoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => JoinerWhereUniqueInputSchema),
          z.lazy(() => JoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => JoinerUpdateWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => JoinerUpdateWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => JoinerUpdateManyWithWhereWithoutMissionInputSchema),
          z
            .lazy(() => JoinerUpdateManyWithWhereWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => JoinerUpsertWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => JoinerUpsertWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUncheckedUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerCreateOrConnectWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema),
          z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema).array(),
          z.lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema),
          z
            .lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => HistoryJoinerCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => HistoryJoinerScalarWhereInputSchema),
          z.lazy(() => HistoryJoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
          z.lazy(() => HistoryJoinerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => HistoryJoinerUpdateWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => HistoryJoinerUpdateWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => HistoryJoinerUpdateManyWithWhereWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => HistoryJoinerUpdateManyWithWhereWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => HistoryJoinerUpsertWithWhereUniqueWithoutMissionInputSchema,
          ),
          z
            .lazy(
              () => HistoryJoinerUpsertWithWhereUniqueWithoutMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const PatientUncheckedUpdateManyWithoutMissionNestedInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema),
          z.lazy(() => PatientCreateOrConnectWithoutMissionInputSchema).array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => PatientCreateWithoutMissionInputSchema),
          z.lazy(() => PatientCreateWithoutMissionInputSchema).array(),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema),
          z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PatientCreateManyMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PatientScalarWhereInputSchema),
          z.lazy(() => PatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PatientWhereUniqueInputSchema),
          z.lazy(() => PatientWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PatientUpdateWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => PatientUpdateWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PatientUpdateManyWithWhereWithoutMissionInputSchema),
          z
            .lazy(() => PatientUpdateManyWithWhereWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PatientUpsertWithWhereUniqueWithoutMissionInputSchema),
          z
            .lazy(() => PatientUpsertWithWhereUniqueWithoutMissionInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const MissionCreateNestedOneWithoutJoinersInputSchema: z.ZodType<Prisma.MissionCreateNestedOneWithoutJoinersInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutJoinersInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutJoinersInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutJoinersInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MissionUpdateOneRequiredWithoutJoinersNestedInputSchema: z.ZodType<Prisma.MissionUpdateOneRequiredWithoutJoinersNestedInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutJoinersInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutJoinersInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutJoinersInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MissionUpdateToOneWithWhereWithoutJoinersInputSchema),
          z.lazy(() => MissionUpdateWithoutJoinersInputSchema),
          z.lazy(() => MissionUncheckedUpdateWithoutJoinersInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => MissionUpsertWithoutJoinersInputSchema).optional(),
    })
    .strict();

export const MissionCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.MissionCreateNestedOneWithoutPatientInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutPatientInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MissionUpdateOneRequiredWithoutPatientNestedInputSchema: z.ZodType<Prisma.MissionUpdateOneRequiredWithoutPatientNestedInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutPatientInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutPatientInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutPatientInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MissionUpdateToOneWithWhereWithoutPatientInputSchema),
          z.lazy(() => MissionUpdateWithoutPatientInputSchema),
          z.lazy(() => MissionUncheckedUpdateWithoutPatientInputSchema),
        ])
        .optional(),
      upsert: z.lazy(() => MissionUpsertWithoutPatientInputSchema).optional(),
    })
    .strict();

export const MissionCreateNestedOneWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionCreateNestedOneWithoutHistoryJoinerInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutHistoryJoinerInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutHistoryJoinerInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutHistoryJoinerInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MissionUpdateOneRequiredWithoutHistoryJoinerNestedInputSchema: z.ZodType<Prisma.MissionUpdateOneRequiredWithoutHistoryJoinerNestedInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutHistoryJoinerInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutHistoryJoinerInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutHistoryJoinerInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => MissionUpdateToOneWithWhereWithoutHistoryJoinerInputSchema,
          ),
          z.lazy(() => MissionUpdateWithoutHistoryJoinerInputSchema),
          z.lazy(() => MissionUncheckedUpdateWithoutHistoryJoinerInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => MissionUpsertWithoutHistoryJoinerInputSchema)
        .optional(),
    })
    .strict();

export const MissionCreateNestedOneWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionCreateNestedOneWithoutSubMissionInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutSubMissionInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutSubMissionInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutSubMissionInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionTagCreateNestedManyWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagCreateNestedManyWithoutSubMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema),
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema).array(),
          z.lazy(
            () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionTagCreateManySubMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const SubMissionTagUncheckedCreateNestedManyWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedCreateNestedManyWithoutSubMissionInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema),
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema).array(),
          z.lazy(
            () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionTagCreateManySubMissionInputEnvelopeSchema)
        .optional(),
    })
    .strict();

export const MissionUpdateOneRequiredWithoutSubMissionNestedInputSchema: z.ZodType<Prisma.MissionUpdateOneRequiredWithoutSubMissionNestedInput>
  = z
    .object({
      connect: z.lazy(() => MissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => MissionCreateOrConnectWithoutSubMissionInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => MissionCreateWithoutSubMissionInputSchema),
          z.lazy(() => MissionUncheckedCreateWithoutSubMissionInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MissionUpdateToOneWithWhereWithoutSubMissionInputSchema),
          z.lazy(() => MissionUpdateWithoutSubMissionInputSchema),
          z.lazy(() => MissionUncheckedUpdateWithoutSubMissionInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => MissionUpsertWithoutSubMissionInputSchema)
        .optional(),
    })
    .strict();

export const SubMissionTagUpdateManyWithoutSubMissionNestedInputSchema: z.ZodType<Prisma.SubMissionTagUpdateManyWithoutSubMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema),
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema).array(),
          z.lazy(
            () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionTagCreateManySubMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SubMissionTagScalarWhereInputSchema),
          z.lazy(() => SubMissionTagScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              SubMissionTagUpdateWithWhereUniqueWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () =>
                SubMissionTagUpdateWithWhereUniqueWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => SubMissionTagUpdateManyWithWhereWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () =>
                SubMissionTagUpdateManyWithWhereWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              SubMissionTagUpsertWithWhereUniqueWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () =>
                SubMissionTagUpsertWithWhereUniqueWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const SubMissionTagUncheckedUpdateManyWithoutSubMissionNestedInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedUpdateManyWithoutSubMissionNestedInput>
  = z
    .object({
      connect: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagCreateOrConnectWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema),
          z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema).array(),
          z.lazy(
            () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SubMissionTagCreateManySubMissionInputEnvelopeSchema)
        .optional(),
      delete: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SubMissionTagScalarWhereInputSchema),
          z.lazy(() => SubMissionTagScalarWhereInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => SubMissionTagWhereUniqueInputSchema),
          z.lazy(() => SubMissionTagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              SubMissionTagUpdateWithWhereUniqueWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () =>
                SubMissionTagUpdateWithWhereUniqueWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => SubMissionTagUpdateManyWithWhereWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () =>
                SubMissionTagUpdateManyWithWhereWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              SubMissionTagUpsertWithWhereUniqueWithoutSubMissionInputSchema,
          ),
          z
            .lazy(
              () =>
                SubMissionTagUpsertWithWhereUniqueWithoutSubMissionInputSchema,
            )
            .array(),
        ])
        .optional(),
    })
    .strict();

export const SubMissionCreateNestedOneWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionCreateNestedOneWithoutSubMissioTagInput>
  = z
    .object({
      connect: z.lazy(() => SubMissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => SubMissionCreateOrConnectWithoutSubMissioTagInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionCreateWithoutSubMissioTagInputSchema),
          z.lazy(() => SubMissionUncheckedCreateWithoutSubMissioTagInputSchema),
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

export const SubMissionUpdateOneRequiredWithoutSubMissioTagNestedInputSchema: z.ZodType<Prisma.SubMissionUpdateOneRequiredWithoutSubMissioTagNestedInput>
  = z
    .object({
      connect: z.lazy(() => SubMissionWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => SubMissionCreateOrConnectWithoutSubMissioTagInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => SubMissionCreateWithoutSubMissioTagInputSchema),
          z.lazy(() => SubMissionUncheckedCreateWithoutSubMissioTagInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SubMissionUpdateToOneWithWhereWithoutSubMissioTagInputSchema,
          ),
          z.lazy(() => SubMissionUpdateWithoutSubMissioTagInputSchema),
          z.lazy(() => SubMissionUncheckedUpdateWithoutSubMissioTagInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => SubMissionUpsertWithoutSubMissioTagInputSchema)
        .optional(),
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

export const NestedEnumMissionStatusFilterSchema: z.ZodType<Prisma.NestedEnumMissionStatusFilter>
  = z
    .object({
      equals: z.lazy(() => MissionStatusSchema).optional(),
      in: z
        .lazy(() => MissionStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => NestedEnumMissionStatusFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => MissionStatusSchema)
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

export const NestedEnumMissionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMissionStatusWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMissionStatusFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMissionStatusFilterSchema).optional(),
      equals: z.lazy(() => MissionStatusSchema).optional(),
      in: z
        .lazy(() => MissionStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => NestedEnumMissionStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => MissionStatusSchema)
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

export const SubMissionCreateWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      SubMissioTag: z
        .lazy(() => SubMissionTagCreateNestedManyWithoutSubMissionInputSchema)
        .optional(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionUncheckedCreateWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUncheckedCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      SubMissioTag: z
        .lazy(
          () =>
            SubMissionTagUncheckedCreateNestedManyWithoutSubMissionInputSchema,
        )
        .optional(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionCreateOrConnectWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionCreateOrConnectWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => SubMissionCreateWithoutMissionInputSchema),
        z.lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionCreateManyMissionInputEnvelopeSchema: z.ZodType<Prisma.SubMissionCreateManyMissionInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionCreateManyMissionInputSchema),
        z.lazy(() => SubMissionCreateManyMissionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JoinerCreateWithoutMissionInputSchema: z.ZodType<Prisma.JoinerCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const JoinerUncheckedCreateWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUncheckedCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const JoinerCreateOrConnectWithoutMissionInputSchema: z.ZodType<Prisma.JoinerCreateOrConnectWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => JoinerCreateWithoutMissionInputSchema),
        z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => JoinerWhereUniqueInputSchema),
    })
    .strict();

export const JoinerCreateManyMissionInputEnvelopeSchema: z.ZodType<Prisma.JoinerCreateManyMissionInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => JoinerCreateManyMissionInputSchema),
        z.lazy(() => JoinerCreateManyMissionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const HistoryJoinerCreateWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const HistoryJoinerUncheckedCreateWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const HistoryJoinerCreateOrConnectWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerCreateOrConnectWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema),
        z.lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
    })
    .strict();

export const HistoryJoinerCreateManyMissionInputEnvelopeSchema: z.ZodType<Prisma.HistoryJoinerCreateManyMissionInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => HistoryJoinerCreateManyMissionInputSchema),
        z.lazy(() => HistoryJoinerCreateManyMissionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PatientCreateWithoutMissionInputSchema: z.ZodType<Prisma.PatientCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientUncheckedCreateWithoutMissionInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const PatientCreateOrConnectWithoutMissionInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutMissionInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientCreateManyMissionInputEnvelopeSchema: z.ZodType<Prisma.PatientCreateManyMissionInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientCreateManyMissionInputSchema),
        z.lazy(() => PatientCreateManyMissionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SubMissionUpsertWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUpsertWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => SubMissionCreateWithoutMissionInputSchema),
        z.lazy(() => SubMissionUncheckedCreateWithoutMissionInputSchema),
      ]),
      update: z.union([
        z.lazy(() => SubMissionUpdateWithoutMissionInputSchema),
        z.lazy(() => SubMissionUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionUpdateWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUpdateWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionUpdateWithoutMissionInputSchema),
        z.lazy(() => SubMissionUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionUpdateManyWithWhereWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUpdateManyWithWhereWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionUpdateManyMutationInputSchema),
        z.lazy(() => SubMissionUncheckedUpdateManyWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionScalarWhereInputSchema),
    })
    .strict();

export const SubMissionScalarWhereInputSchema: z.ZodType<Prisma.SubMissionScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => SubMissionScalarWhereInputSchema),
          z.lazy(() => SubMissionScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      delete_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubMissionScalarWhereInputSchema),
          z.lazy(() => SubMissionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubMissionScalarWhereInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const JoinerUpsertWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUpsertWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => JoinerCreateWithoutMissionInputSchema),
        z.lazy(() => JoinerUncheckedCreateWithoutMissionInputSchema),
      ]),
      update: z.union([
        z.lazy(() => JoinerUpdateWithoutMissionInputSchema),
        z.lazy(() => JoinerUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => JoinerWhereUniqueInputSchema),
    })
    .strict();

export const JoinerUpdateWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUpdateWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => JoinerUpdateWithoutMissionInputSchema),
        z.lazy(() => JoinerUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => JoinerWhereUniqueInputSchema),
    })
    .strict();

export const JoinerUpdateManyWithWhereWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUpdateManyWithWhereWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => JoinerUpdateManyMutationInputSchema),
        z.lazy(() => JoinerUncheckedUpdateManyWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => JoinerScalarWhereInputSchema),
    })
    .strict();

export const JoinerScalarWhereInputSchema: z.ZodType<Prisma.JoinerScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => JoinerScalarWhereInputSchema),
          z.lazy(() => JoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => JoinerScalarWhereInputSchema),
          z.lazy(() => JoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => JoinerScalarWhereInputSchema)
        .array()
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      user_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const HistoryJoinerUpsertWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUpsertWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => HistoryJoinerCreateWithoutMissionInputSchema),
        z.lazy(() => HistoryJoinerUncheckedCreateWithoutMissionInputSchema),
      ]),
      update: z.union([
        z.lazy(() => HistoryJoinerUpdateWithoutMissionInputSchema),
        z.lazy(() => HistoryJoinerUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
    })
    .strict();

export const HistoryJoinerUpdateWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUpdateWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => HistoryJoinerUpdateWithoutMissionInputSchema),
        z.lazy(() => HistoryJoinerUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => HistoryJoinerWhereUniqueInputSchema),
    })
    .strict();

export const HistoryJoinerUpdateManyWithWhereWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUpdateManyWithWhereWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => HistoryJoinerUpdateManyMutationInputSchema),
        z.lazy(() => HistoryJoinerUncheckedUpdateManyWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => HistoryJoinerScalarWhereInputSchema),
    })
    .strict();

export const HistoryJoinerScalarWhereInputSchema: z.ZodType<Prisma.HistoryJoinerScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => HistoryJoinerScalarWhereInputSchema),
          z.lazy(() => HistoryJoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => HistoryJoinerScalarWhereInputSchema),
          z.lazy(() => HistoryJoinerScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => HistoryJoinerScalarWhereInputSchema)
        .array()
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      user_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PatientUpsertWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.PatientUpsertWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => PatientCreateWithoutMissionInputSchema),
        z.lazy(() => PatientUncheckedCreateWithoutMissionInputSchema),
      ]),
      update: z.union([
        z.lazy(() => PatientUpdateWithoutMissionInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientUpdateWithWhereUniqueWithoutMissionInputSchema: z.ZodType<Prisma.PatientUpdateWithWhereUniqueWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientUpdateWithoutMissionInputSchema),
        z.lazy(() => PatientUncheckedUpdateWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => PatientWhereUniqueInputSchema),
    })
    .strict();

export const PatientUpdateManyWithWhereWithoutMissionInputSchema: z.ZodType<Prisma.PatientUpdateManyWithWhereWithoutMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => PatientUpdateManyMutationInputSchema),
        z.lazy(() => PatientUncheckedUpdateManyWithoutMissionInputSchema),
      ]),
      where: z.lazy(() => PatientScalarWhereInputSchema),
    })
    .strict();

export const PatientScalarWhereInputSchema: z.ZodType<Prisma.PatientScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => PatientScalarWhereInputSchema),
          z.lazy(() => PatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PatientScalarWhereInputSchema),
          z.lazy(() => PatientScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PatientScalarWhereInputSchema)
        .array()
        .optional(),
      patient_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionCreateWithoutJoinersInputSchema: z.ZodType<Prisma.MissionCreateWithoutJoinersInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(() => SubMissionCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionUncheckedCreateWithoutJoinersInputSchema: z.ZodType<Prisma.MissionUncheckedCreateWithoutJoinersInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionCreateOrConnectWithoutJoinersInputSchema: z.ZodType<Prisma.MissionCreateOrConnectWithoutJoinersInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutJoinersInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutJoinersInputSchema),
      ]),
      where: z.lazy(() => MissionWhereUniqueInputSchema),
    })
    .strict();

export const MissionUpsertWithoutJoinersInputSchema: z.ZodType<Prisma.MissionUpsertWithoutJoinersInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutJoinersInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutJoinersInputSchema),
      ]),
      update: z.union([
        z.lazy(() => MissionUpdateWithoutJoinersInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutJoinersInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateToOneWithWhereWithoutJoinersInputSchema: z.ZodType<Prisma.MissionUpdateToOneWithWhereWithoutJoinersInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => MissionUpdateWithoutJoinersInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutJoinersInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateWithoutJoinersInputSchema: z.ZodType<Prisma.MissionUpdateWithoutJoinersInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerUpdateManyWithoutMissionNestedInputSchema)
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
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(() => SubMissionUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionUncheckedUpdateWithoutJoinersInputSchema: z.ZodType<Prisma.MissionUncheckedUpdateWithoutJoinersInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
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
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionCreateWithoutPatientInputSchema: z.ZodType<Prisma.MissionCreateWithoutPatientInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(() => SubMissionCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.MissionUncheckedCreateWithoutPatientInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.MissionCreateOrConnectWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutPatientInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => MissionWhereUniqueInputSchema),
    })
    .strict();

export const MissionUpsertWithoutPatientInputSchema: z.ZodType<Prisma.MissionUpsertWithoutPatientInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutPatientInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutPatientInputSchema),
      ]),
      update: z.union([
        z.lazy(() => MissionUpdateWithoutPatientInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateToOneWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.MissionUpdateToOneWithWhereWithoutPatientInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => MissionUpdateWithoutPatientInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutPatientInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateWithoutPatientInputSchema: z.ZodType<Prisma.MissionUpdateWithoutPatientInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerUpdateManyWithoutMissionNestedInputSchema)
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
      Joiners: z
        .lazy(() => JoinerUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(() => SubMissionUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.MissionUncheckedUpdateWithoutPatientInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
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
      Joiners: z
        .lazy(() => JoinerUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionCreateWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionCreateWithoutHistoryJoinerInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(() => SubMissionCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionUncheckedCreateWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionUncheckedCreateWithoutHistoryJoinerInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionCreateOrConnectWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionCreateOrConnectWithoutHistoryJoinerInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutHistoryJoinerInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutHistoryJoinerInputSchema),
      ]),
      where: z.lazy(() => MissionWhereUniqueInputSchema),
    })
    .strict();

export const MissionUpsertWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionUpsertWithoutHistoryJoinerInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutHistoryJoinerInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutHistoryJoinerInputSchema),
      ]),
      update: z.union([
        z.lazy(() => MissionUpdateWithoutHistoryJoinerInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutHistoryJoinerInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateToOneWithWhereWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionUpdateToOneWithWhereWithoutHistoryJoinerInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => MissionUpdateWithoutHistoryJoinerInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutHistoryJoinerInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionUpdateWithoutHistoryJoinerInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
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
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Joiners: z
        .lazy(() => JoinerUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(() => SubMissionUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionUncheckedUpdateWithoutHistoryJoinerInputSchema: z.ZodType<Prisma.MissionUncheckedUpdateWithoutHistoryJoinerInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
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
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Joiners: z
        .lazy(() => JoinerUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      SubMission: z
        .lazy(
          () => SubMissionUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionCreateWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionCreateWithoutSubMissionInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionUncheckedCreateWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionUncheckedCreateWithoutSubMissionInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      case_number: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      description: z.string().optional().nullable(),
      end_date: z.coerce.date().optional().nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedCreateNestedManyWithoutMissionInputSchema,
        )
        .optional(),
      id: z.string().uuid().optional(),
      image: z.string().optional().nullable(),
      Joiners: z
        .lazy(() => JoinerUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      lat: z.string().optional().nullable(),
      long: z.string().optional().nullable(),
      mgrs: z.string().optional().nullable(),
      Patient: z
        .lazy(() => PatientUncheckedCreateNestedManyWithoutMissionInputSchema)
        .optional(),
      status: z.lazy(() => MissionStatusSchema).optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      utm: z.string().optional().nullable(),
    })
    .strict();

export const MissionCreateOrConnectWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionCreateOrConnectWithoutSubMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutSubMissionInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutSubMissionInputSchema),
      ]),
      where: z.lazy(() => MissionWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionTagCreateWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagCreateWithoutSubMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      date_time: z.coerce.date().optional(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionTagUncheckedCreateWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedCreateWithoutSubMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      date_time: z.coerce.date().optional(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionTagCreateOrConnectWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagCreateOrConnectWithoutSubMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema),
        z.lazy(() => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionTagWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionTagCreateManySubMissionInputEnvelopeSchema: z.ZodType<Prisma.SubMissionTagCreateManySubMissionInputEnvelope>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionTagCreateManySubMissionInputSchema),
        z.lazy(() => SubMissionTagCreateManySubMissionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MissionUpsertWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionUpsertWithoutSubMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => MissionCreateWithoutSubMissionInputSchema),
        z.lazy(() => MissionUncheckedCreateWithoutSubMissionInputSchema),
      ]),
      update: z.union([
        z.lazy(() => MissionUpdateWithoutSubMissionInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutSubMissionInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateToOneWithWhereWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionUpdateToOneWithWhereWithoutSubMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => MissionUpdateWithoutSubMissionInputSchema),
        z.lazy(() => MissionUncheckedUpdateWithoutSubMissionInputSchema),
      ]),
      where: z.lazy(() => MissionWhereInputSchema).optional(),
    })
    .strict();

export const MissionUpdateWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionUpdateWithoutSubMissionInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(() => HistoryJoinerUpdateManyWithoutMissionNestedInputSchema)
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
      Joiners: z
        .lazy(() => JoinerUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MissionUncheckedUpdateWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionUncheckedUpdateWithoutSubMissionInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      case_number: z
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
      delete_date: z
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
      end_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      HistoryJoiner: z
        .lazy(
          () => HistoryJoinerUncheckedUpdateManyWithoutMissionNestedInputSchema,
        )
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
      Joiners: z
        .lazy(() => JoinerUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      lat: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      long: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      mgrs: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Patient: z
        .lazy(() => PatientUncheckedUpdateManyWithoutMissionNestedInputSchema)
        .optional(),
      status: z
        .union([
          z.lazy(() => MissionStatusSchema),
          z.lazy(() => EnumMissionStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
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
      utm: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SubMissionTagUpsertWithWhereUniqueWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUpsertWithWhereUniqueWithoutSubMissionInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => SubMissionTagCreateWithoutSubMissionInputSchema),
        z.lazy(() => SubMissionTagUncheckedCreateWithoutSubMissionInputSchema),
      ]),
      update: z.union([
        z.lazy(() => SubMissionTagUpdateWithoutSubMissionInputSchema),
        z.lazy(() => SubMissionTagUncheckedUpdateWithoutSubMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionTagWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionTagUpdateWithWhereUniqueWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUpdateWithWhereUniqueWithoutSubMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionTagUpdateWithoutSubMissionInputSchema),
        z.lazy(() => SubMissionTagUncheckedUpdateWithoutSubMissionInputSchema),
      ]),
      where: z.lazy(() => SubMissionTagWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionTagUpdateManyWithWhereWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUpdateManyWithWhereWithoutSubMissionInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionTagUpdateManyMutationInputSchema),
        z.lazy(
          () => SubMissionTagUncheckedUpdateManyWithoutSubMissionInputSchema,
        ),
      ]),
      where: z.lazy(() => SubMissionTagScalarWhereInputSchema),
    })
    .strict();

export const SubMissionTagScalarWhereInputSchema: z.ZodType<Prisma.SubMissionTagScalarWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => SubMissionTagScalarWhereInputSchema),
          z.lazy(() => SubMissionTagScalarWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      date_time: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      delete_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      NOT: z
        .union([
          z.lazy(() => SubMissionTagScalarWhereInputSchema),
          z.lazy(() => SubMissionTagScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubMissionTagScalarWhereInputSchema)
        .array()
        .optional(),
      sub_mission_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      update_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const SubMissionCreateWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionCreateWithoutSubMissioTagInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      Mission: z.lazy(() => MissionCreateNestedOneWithoutSubMissionInputSchema),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionUncheckedCreateWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionUncheckedCreateWithoutSubMissioTagInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      mission_id: z.string(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const SubMissionCreateOrConnectWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionCreateOrConnectWithoutSubMissioTagInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => SubMissionCreateWithoutSubMissioTagInputSchema),
        z.lazy(() => SubMissionUncheckedCreateWithoutSubMissioTagInputSchema),
      ]),
      where: z.lazy(() => SubMissionWhereUniqueInputSchema),
    })
    .strict();

export const SubMissionUpsertWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionUpsertWithoutSubMissioTagInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => SubMissionCreateWithoutSubMissioTagInputSchema),
        z.lazy(() => SubMissionUncheckedCreateWithoutSubMissioTagInputSchema),
      ]),
      update: z.union([
        z.lazy(() => SubMissionUpdateWithoutSubMissioTagInputSchema),
        z.lazy(() => SubMissionUncheckedUpdateWithoutSubMissioTagInputSchema),
      ]),
      where: z.lazy(() => SubMissionWhereInputSchema).optional(),
    })
    .strict();

export const SubMissionUpdateToOneWithWhereWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionUpdateToOneWithWhereWithoutSubMissioTagInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => SubMissionUpdateWithoutSubMissioTagInputSchema),
        z.lazy(() => SubMissionUncheckedUpdateWithoutSubMissioTagInputSchema),
      ]),
      where: z.lazy(() => SubMissionWhereInputSchema).optional(),
    })
    .strict();

export const SubMissionUpdateWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionUpdateWithoutSubMissioTagInput>
  = z
    .object({
      create_date: z
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
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Mission: z
        .lazy(() => MissionUpdateOneRequiredWithoutSubMissionNestedInputSchema)
        .optional(),
      patient_id: z
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
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionUncheckedUpdateWithoutSubMissioTagInputSchema: z.ZodType<Prisma.SubMissionUncheckedUpdateWithoutSubMissioTagInput>
  = z
    .object({
      create_date: z
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
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mission_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      patient_id: z
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
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionCreateManyMissionInputSchema: z.ZodType<Prisma.SubMissionCreateManyMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
      vehicle_id: z.string(),
    })
    .strict();

export const JoinerCreateManyMissionInputSchema: z.ZodType<Prisma.JoinerCreateManyMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const HistoryJoinerCreateManyMissionInputSchema: z.ZodType<Prisma.HistoryJoinerCreateManyMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      update_date: z.coerce.date().optional().nullable(),
      user_id: z.string(),
    })
    .strict();

export const PatientCreateManyMissionInputSchema: z.ZodType<Prisma.PatientCreateManyMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      patient_id: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionUpdateWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUpdateWithoutMissionInput>
  = z
    .object({
      create_date: z
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
      SubMissioTag: z
        .lazy(() => SubMissionTagUpdateManyWithoutSubMissionNestedInputSchema)
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionUncheckedUpdateWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUncheckedUpdateWithoutMissionInput>
  = z
    .object({
      create_date: z
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
      SubMissioTag: z
        .lazy(
          () =>
            SubMissionTagUncheckedUpdateManyWithoutSubMissionNestedInputSchema,
        )
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubMissionUncheckedUpdateManyWithoutMissionInputSchema: z.ZodType<Prisma.SubMissionUncheckedUpdateManyWithoutMissionInput>
  = z
    .object({
      create_date: z
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vehicle_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JoinerUpdateWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUpdateWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JoinerUncheckedUpdateWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUncheckedUpdateWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JoinerUncheckedUpdateManyWithoutMissionInputSchema: z.ZodType<Prisma.JoinerUncheckedUpdateManyWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUpdateWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUpdateWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUncheckedUpdateWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedUpdateWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HistoryJoinerUncheckedUpdateManyWithoutMissionInputSchema: z.ZodType<Prisma.HistoryJoinerUncheckedUpdateManyWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PatientUpdateWithoutMissionInputSchema: z.ZodType<Prisma.PatientUpdateWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateWithoutMissionInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PatientUncheckedUpdateManyWithoutMissionInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutMissionInput>
  = z
    .object({
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
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SubMissionTagCreateManySubMissionInputSchema: z.ZodType<Prisma.SubMissionTagCreateManySubMissionInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      date_time: z.coerce.date().optional(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      title: z.string(),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const SubMissionTagUpdateWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUpdateWithoutSubMissionInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      title: z
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

export const SubMissionTagUncheckedUpdateWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedUpdateWithoutSubMissionInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      title: z
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

export const SubMissionTagUncheckedUpdateManyWithoutSubMissionInputSchema: z.ZodType<Prisma.SubMissionTagUncheckedUpdateManyWithoutSubMissionInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      date_time: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      delete_date: z
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
      title: z
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

export const MissionFindFirstArgsSchema: z.ZodType<Prisma.MissionFindFirstArgs>
  = z
    .object({
      cursor: MissionWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          MissionScalarFieldEnumSchema,
          MissionScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: MissionIncludeSchema.optional(),
      orderBy: z
        .union([
          MissionOrderByWithRelationInputSchema.array(),
          MissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: MissionSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const MissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MissionFindFirstOrThrowArgs>
  = z
    .object({
      cursor: MissionWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          MissionScalarFieldEnumSchema,
          MissionScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: MissionIncludeSchema.optional(),
      orderBy: z
        .union([
          MissionOrderByWithRelationInputSchema.array(),
          MissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: MissionSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const MissionFindManyArgsSchema: z.ZodType<Prisma.MissionFindManyArgs>
  = z
    .object({
      cursor: MissionWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          MissionScalarFieldEnumSchema,
          MissionScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: MissionIncludeSchema.optional(),
      orderBy: z
        .union([
          MissionOrderByWithRelationInputSchema.array(),
          MissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: MissionSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const MissionAggregateArgsSchema: z.ZodType<Prisma.MissionAggregateArgs>
  = z
    .object({
      cursor: MissionWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          MissionOrderByWithRelationInputSchema.array(),
          MissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const MissionGroupByArgsSchema: z.ZodType<Prisma.MissionGroupByArgs> = z
  .object({
    by: MissionScalarFieldEnumSchema.array(),
    having: MissionScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        MissionOrderByWithAggregationInputSchema.array(),
        MissionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: MissionWhereInputSchema.optional(),
  })
  .strict();

export const MissionFindUniqueArgsSchema: z.ZodType<Prisma.MissionFindUniqueArgs>
  = z
    .object({
      include: MissionIncludeSchema.optional(),
      select: MissionSelectSchema.optional(),
      where: MissionWhereUniqueInputSchema,
    })
    .strict();

export const MissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MissionFindUniqueOrThrowArgs>
  = z
    .object({
      include: MissionIncludeSchema.optional(),
      select: MissionSelectSchema.optional(),
      where: MissionWhereUniqueInputSchema,
    })
    .strict();

export const JoinerFindFirstArgsSchema: z.ZodType<Prisma.JoinerFindFirstArgs>
  = z
    .object({
      cursor: JoinerWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          JoinerScalarFieldEnumSchema,
          JoinerScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: JoinerIncludeSchema.optional(),
      orderBy: z
        .union([
          JoinerOrderByWithRelationInputSchema.array(),
          JoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: JoinerSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: JoinerWhereInputSchema.optional(),
    })
    .strict();

export const JoinerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JoinerFindFirstOrThrowArgs>
  = z
    .object({
      cursor: JoinerWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          JoinerScalarFieldEnumSchema,
          JoinerScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: JoinerIncludeSchema.optional(),
      orderBy: z
        .union([
          JoinerOrderByWithRelationInputSchema.array(),
          JoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: JoinerSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: JoinerWhereInputSchema.optional(),
    })
    .strict();

export const JoinerFindManyArgsSchema: z.ZodType<Prisma.JoinerFindManyArgs> = z
  .object({
    cursor: JoinerWhereUniqueInputSchema.optional(),
    distinct: z
      .union([JoinerScalarFieldEnumSchema, JoinerScalarFieldEnumSchema.array()])
      .optional(),
    include: JoinerIncludeSchema.optional(),
    orderBy: z
      .union([
        JoinerOrderByWithRelationInputSchema.array(),
        JoinerOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: JoinerSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: JoinerWhereInputSchema.optional(),
  })
  .strict();

export const JoinerAggregateArgsSchema: z.ZodType<Prisma.JoinerAggregateArgs>
  = z
    .object({
      cursor: JoinerWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          JoinerOrderByWithRelationInputSchema.array(),
          JoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: JoinerWhereInputSchema.optional(),
    })
    .strict();

export const JoinerGroupByArgsSchema: z.ZodType<Prisma.JoinerGroupByArgs> = z
  .object({
    by: JoinerScalarFieldEnumSchema.array(),
    having: JoinerScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        JoinerOrderByWithAggregationInputSchema.array(),
        JoinerOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: JoinerWhereInputSchema.optional(),
  })
  .strict();

export const JoinerFindUniqueArgsSchema: z.ZodType<Prisma.JoinerFindUniqueArgs>
  = z
    .object({
      include: JoinerIncludeSchema.optional(),
      select: JoinerSelectSchema.optional(),
      where: JoinerWhereUniqueInputSchema,
    })
    .strict();

export const JoinerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JoinerFindUniqueOrThrowArgs>
  = z
    .object({
      include: JoinerIncludeSchema.optional(),
      select: JoinerSelectSchema.optional(),
      where: JoinerWhereUniqueInputSchema,
    })
    .strict();

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

export const HistoryJoinerFindFirstArgsSchema: z.ZodType<Prisma.HistoryJoinerFindFirstArgs>
  = z
    .object({
      cursor: HistoryJoinerWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          HistoryJoinerScalarFieldEnumSchema,
          HistoryJoinerScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: HistoryJoinerIncludeSchema.optional(),
      orderBy: z
        .union([
          HistoryJoinerOrderByWithRelationInputSchema.array(),
          HistoryJoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: HistoryJoinerSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HistoryJoinerFindFirstOrThrowArgs>
  = z
    .object({
      cursor: HistoryJoinerWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          HistoryJoinerScalarFieldEnumSchema,
          HistoryJoinerScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: HistoryJoinerIncludeSchema.optional(),
      orderBy: z
        .union([
          HistoryJoinerOrderByWithRelationInputSchema.array(),
          HistoryJoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: HistoryJoinerSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerFindManyArgsSchema: z.ZodType<Prisma.HistoryJoinerFindManyArgs>
  = z
    .object({
      cursor: HistoryJoinerWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          HistoryJoinerScalarFieldEnumSchema,
          HistoryJoinerScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: HistoryJoinerIncludeSchema.optional(),
      orderBy: z
        .union([
          HistoryJoinerOrderByWithRelationInputSchema.array(),
          HistoryJoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: HistoryJoinerSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerAggregateArgsSchema: z.ZodType<Prisma.HistoryJoinerAggregateArgs>
  = z
    .object({
      cursor: HistoryJoinerWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          HistoryJoinerOrderByWithRelationInputSchema.array(),
          HistoryJoinerOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerGroupByArgsSchema: z.ZodType<Prisma.HistoryJoinerGroupByArgs>
  = z
    .object({
      by: HistoryJoinerScalarFieldEnumSchema.array(),
      having: HistoryJoinerScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          HistoryJoinerOrderByWithAggregationInputSchema.array(),
          HistoryJoinerOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerFindUniqueArgsSchema: z.ZodType<Prisma.HistoryJoinerFindUniqueArgs>
  = z
    .object({
      include: HistoryJoinerIncludeSchema.optional(),
      select: HistoryJoinerSelectSchema.optional(),
      where: HistoryJoinerWhereUniqueInputSchema,
    })
    .strict();

export const HistoryJoinerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HistoryJoinerFindUniqueOrThrowArgs>
  = z
    .object({
      include: HistoryJoinerIncludeSchema.optional(),
      select: HistoryJoinerSelectSchema.optional(),
      where: HistoryJoinerWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionFindFirstArgsSchema: z.ZodType<Prisma.SubMissionFindFirstArgs>
  = z
    .object({
      cursor: SubMissionWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          SubMissionScalarFieldEnumSchema,
          SubMissionScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: SubMissionIncludeSchema.optional(),
      orderBy: z
        .union([
          SubMissionOrderByWithRelationInputSchema.array(),
          SubMissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: SubMissionSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubMissionFindFirstOrThrowArgs>
  = z
    .object({
      cursor: SubMissionWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          SubMissionScalarFieldEnumSchema,
          SubMissionScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: SubMissionIncludeSchema.optional(),
      orderBy: z
        .union([
          SubMissionOrderByWithRelationInputSchema.array(),
          SubMissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: SubMissionSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionFindManyArgsSchema: z.ZodType<Prisma.SubMissionFindManyArgs>
  = z
    .object({
      cursor: SubMissionWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          SubMissionScalarFieldEnumSchema,
          SubMissionScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: SubMissionIncludeSchema.optional(),
      orderBy: z
        .union([
          SubMissionOrderByWithRelationInputSchema.array(),
          SubMissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: SubMissionSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionAggregateArgsSchema: z.ZodType<Prisma.SubMissionAggregateArgs>
  = z
    .object({
      cursor: SubMissionWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          SubMissionOrderByWithRelationInputSchema.array(),
          SubMissionOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionGroupByArgsSchema: z.ZodType<Prisma.SubMissionGroupByArgs>
  = z
    .object({
      by: SubMissionScalarFieldEnumSchema.array(),
      having: SubMissionScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          SubMissionOrderByWithAggregationInputSchema.array(),
          SubMissionOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionFindUniqueArgsSchema: z.ZodType<Prisma.SubMissionFindUniqueArgs>
  = z
    .object({
      include: SubMissionIncludeSchema.optional(),
      select: SubMissionSelectSchema.optional(),
      where: SubMissionWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubMissionFindUniqueOrThrowArgs>
  = z
    .object({
      include: SubMissionIncludeSchema.optional(),
      select: SubMissionSelectSchema.optional(),
      where: SubMissionWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionTagFindFirstArgsSchema: z.ZodType<Prisma.SubMissionTagFindFirstArgs>
  = z
    .object({
      cursor: SubMissionTagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          SubMissionTagScalarFieldEnumSchema,
          SubMissionTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: SubMissionTagIncludeSchema.optional(),
      orderBy: z
        .union([
          SubMissionTagOrderByWithRelationInputSchema.array(),
          SubMissionTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: SubMissionTagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubMissionTagFindFirstOrThrowArgs>
  = z
    .object({
      cursor: SubMissionTagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          SubMissionTagScalarFieldEnumSchema,
          SubMissionTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: SubMissionTagIncludeSchema.optional(),
      orderBy: z
        .union([
          SubMissionTagOrderByWithRelationInputSchema.array(),
          SubMissionTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: SubMissionTagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagFindManyArgsSchema: z.ZodType<Prisma.SubMissionTagFindManyArgs>
  = z
    .object({
      cursor: SubMissionTagWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          SubMissionTagScalarFieldEnumSchema,
          SubMissionTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: SubMissionTagIncludeSchema.optional(),
      orderBy: z
        .union([
          SubMissionTagOrderByWithRelationInputSchema.array(),
          SubMissionTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: SubMissionTagSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagAggregateArgsSchema: z.ZodType<Prisma.SubMissionTagAggregateArgs>
  = z
    .object({
      cursor: SubMissionTagWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          SubMissionTagOrderByWithRelationInputSchema.array(),
          SubMissionTagOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagGroupByArgsSchema: z.ZodType<Prisma.SubMissionTagGroupByArgs>
  = z
    .object({
      by: SubMissionTagScalarFieldEnumSchema.array(),
      having: SubMissionTagScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          SubMissionTagOrderByWithAggregationInputSchema.array(),
          SubMissionTagOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagFindUniqueArgsSchema: z.ZodType<Prisma.SubMissionTagFindUniqueArgs>
  = z
    .object({
      include: SubMissionTagIncludeSchema.optional(),
      select: SubMissionTagSelectSchema.optional(),
      where: SubMissionTagWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubMissionTagFindUniqueOrThrowArgs>
  = z
    .object({
      include: SubMissionTagIncludeSchema.optional(),
      select: SubMissionTagSelectSchema.optional(),
      where: SubMissionTagWhereUniqueInputSchema,
    })
    .strict();

export const MissionCreateArgsSchema: z.ZodType<Prisma.MissionCreateArgs> = z
  .object({
    data: z.union([
      MissionCreateInputSchema,
      MissionUncheckedCreateInputSchema,
    ]),
    include: MissionIncludeSchema.optional(),
    select: MissionSelectSchema.optional(),
  })
  .strict();

export const MissionUpsertArgsSchema: z.ZodType<Prisma.MissionUpsertArgs> = z
  .object({
    create: z.union([
      MissionCreateInputSchema,
      MissionUncheckedCreateInputSchema,
    ]),
    include: MissionIncludeSchema.optional(),
    select: MissionSelectSchema.optional(),
    update: z.union([
      MissionUpdateInputSchema,
      MissionUncheckedUpdateInputSchema,
    ]),
    where: MissionWhereUniqueInputSchema,
  })
  .strict();

export const MissionCreateManyArgsSchema: z.ZodType<Prisma.MissionCreateManyArgs>
  = z
    .object({
      data: z.union([
        MissionCreateManyInputSchema,
        MissionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MissionCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        MissionCreateManyInputSchema,
        MissionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MissionDeleteArgsSchema: z.ZodType<Prisma.MissionDeleteArgs> = z
  .object({
    include: MissionIncludeSchema.optional(),
    select: MissionSelectSchema.optional(),
    where: MissionWhereUniqueInputSchema,
  })
  .strict();

export const MissionUpdateArgsSchema: z.ZodType<Prisma.MissionUpdateArgs> = z
  .object({
    data: z.union([
      MissionUpdateInputSchema,
      MissionUncheckedUpdateInputSchema,
    ]),
    include: MissionIncludeSchema.optional(),
    select: MissionSelectSchema.optional(),
    where: MissionWhereUniqueInputSchema,
  })
  .strict();

export const MissionUpdateManyArgsSchema: z.ZodType<Prisma.MissionUpdateManyArgs>
  = z
    .object({
      data: z.union([
        MissionUpdateManyMutationInputSchema,
        MissionUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const MissionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.MissionUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        MissionUpdateManyMutationInputSchema,
        MissionUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const MissionDeleteManyArgsSchema: z.ZodType<Prisma.MissionDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: MissionWhereInputSchema.optional(),
    })
    .strict();

export const JoinerCreateArgsSchema: z.ZodType<Prisma.JoinerCreateArgs> = z
  .object({
    data: z.union([JoinerCreateInputSchema, JoinerUncheckedCreateInputSchema]),
    include: JoinerIncludeSchema.optional(),
    select: JoinerSelectSchema.optional(),
  })
  .strict();

export const JoinerUpsertArgsSchema: z.ZodType<Prisma.JoinerUpsertArgs> = z
  .object({
    create: z.union([
      JoinerCreateInputSchema,
      JoinerUncheckedCreateInputSchema,
    ]),
    include: JoinerIncludeSchema.optional(),
    select: JoinerSelectSchema.optional(),
    update: z.union([
      JoinerUpdateInputSchema,
      JoinerUncheckedUpdateInputSchema,
    ]),
    where: JoinerWhereUniqueInputSchema,
  })
  .strict();

export const JoinerCreateManyArgsSchema: z.ZodType<Prisma.JoinerCreateManyArgs>
  = z
    .object({
      data: z.union([
        JoinerCreateManyInputSchema,
        JoinerCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JoinerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JoinerCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        JoinerCreateManyInputSchema,
        JoinerCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JoinerDeleteArgsSchema: z.ZodType<Prisma.JoinerDeleteArgs> = z
  .object({
    include: JoinerIncludeSchema.optional(),
    select: JoinerSelectSchema.optional(),
    where: JoinerWhereUniqueInputSchema,
  })
  .strict();

export const JoinerUpdateArgsSchema: z.ZodType<Prisma.JoinerUpdateArgs> = z
  .object({
    data: z.union([JoinerUpdateInputSchema, JoinerUncheckedUpdateInputSchema]),
    include: JoinerIncludeSchema.optional(),
    select: JoinerSelectSchema.optional(),
    where: JoinerWhereUniqueInputSchema,
  })
  .strict();

export const JoinerUpdateManyArgsSchema: z.ZodType<Prisma.JoinerUpdateManyArgs>
  = z
    .object({
      data: z.union([
        JoinerUpdateManyMutationInputSchema,
        JoinerUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: JoinerWhereInputSchema.optional(),
    })
    .strict();

export const JoinerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.JoinerUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        JoinerUpdateManyMutationInputSchema,
        JoinerUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: JoinerWhereInputSchema.optional(),
    })
    .strict();

export const JoinerDeleteManyArgsSchema: z.ZodType<Prisma.JoinerDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: JoinerWhereInputSchema.optional(),
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

export const HistoryJoinerCreateArgsSchema: z.ZodType<Prisma.HistoryJoinerCreateArgs>
  = z
    .object({
      data: z.union([
        HistoryJoinerCreateInputSchema,
        HistoryJoinerUncheckedCreateInputSchema,
      ]),
      include: HistoryJoinerIncludeSchema.optional(),
      select: HistoryJoinerSelectSchema.optional(),
    })
    .strict();

export const HistoryJoinerUpsertArgsSchema: z.ZodType<Prisma.HistoryJoinerUpsertArgs>
  = z
    .object({
      create: z.union([
        HistoryJoinerCreateInputSchema,
        HistoryJoinerUncheckedCreateInputSchema,
      ]),
      include: HistoryJoinerIncludeSchema.optional(),
      select: HistoryJoinerSelectSchema.optional(),
      update: z.union([
        HistoryJoinerUpdateInputSchema,
        HistoryJoinerUncheckedUpdateInputSchema,
      ]),
      where: HistoryJoinerWhereUniqueInputSchema,
    })
    .strict();

export const HistoryJoinerCreateManyArgsSchema: z.ZodType<Prisma.HistoryJoinerCreateManyArgs>
  = z
    .object({
      data: z.union([
        HistoryJoinerCreateManyInputSchema,
        HistoryJoinerCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const HistoryJoinerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HistoryJoinerCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        HistoryJoinerCreateManyInputSchema,
        HistoryJoinerCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const HistoryJoinerDeleteArgsSchema: z.ZodType<Prisma.HistoryJoinerDeleteArgs>
  = z
    .object({
      include: HistoryJoinerIncludeSchema.optional(),
      select: HistoryJoinerSelectSchema.optional(),
      where: HistoryJoinerWhereUniqueInputSchema,
    })
    .strict();

export const HistoryJoinerUpdateArgsSchema: z.ZodType<Prisma.HistoryJoinerUpdateArgs>
  = z
    .object({
      data: z.union([
        HistoryJoinerUpdateInputSchema,
        HistoryJoinerUncheckedUpdateInputSchema,
      ]),
      include: HistoryJoinerIncludeSchema.optional(),
      select: HistoryJoinerSelectSchema.optional(),
      where: HistoryJoinerWhereUniqueInputSchema,
    })
    .strict();

export const HistoryJoinerUpdateManyArgsSchema: z.ZodType<Prisma.HistoryJoinerUpdateManyArgs>
  = z
    .object({
      data: z.union([
        HistoryJoinerUpdateManyMutationInputSchema,
        HistoryJoinerUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HistoryJoinerUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        HistoryJoinerUpdateManyMutationInputSchema,
        HistoryJoinerUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const HistoryJoinerDeleteManyArgsSchema: z.ZodType<Prisma.HistoryJoinerDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: HistoryJoinerWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionCreateArgsSchema: z.ZodType<Prisma.SubMissionCreateArgs>
  = z
    .object({
      data: z.union([
        SubMissionCreateInputSchema,
        SubMissionUncheckedCreateInputSchema,
      ]),
      include: SubMissionIncludeSchema.optional(),
      select: SubMissionSelectSchema.optional(),
    })
    .strict();

export const SubMissionUpsertArgsSchema: z.ZodType<Prisma.SubMissionUpsertArgs>
  = z
    .object({
      create: z.union([
        SubMissionCreateInputSchema,
        SubMissionUncheckedCreateInputSchema,
      ]),
      include: SubMissionIncludeSchema.optional(),
      select: SubMissionSelectSchema.optional(),
      update: z.union([
        SubMissionUpdateInputSchema,
        SubMissionUncheckedUpdateInputSchema,
      ]),
      where: SubMissionWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionCreateManyArgsSchema: z.ZodType<Prisma.SubMissionCreateManyArgs>
  = z
    .object({
      data: z.union([
        SubMissionCreateManyInputSchema,
        SubMissionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SubMissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubMissionCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        SubMissionCreateManyInputSchema,
        SubMissionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SubMissionDeleteArgsSchema: z.ZodType<Prisma.SubMissionDeleteArgs>
  = z
    .object({
      include: SubMissionIncludeSchema.optional(),
      select: SubMissionSelectSchema.optional(),
      where: SubMissionWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionUpdateArgsSchema: z.ZodType<Prisma.SubMissionUpdateArgs>
  = z
    .object({
      data: z.union([
        SubMissionUpdateInputSchema,
        SubMissionUncheckedUpdateInputSchema,
      ]),
      include: SubMissionIncludeSchema.optional(),
      select: SubMissionSelectSchema.optional(),
      where: SubMissionWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionUpdateManyArgsSchema: z.ZodType<Prisma.SubMissionUpdateManyArgs>
  = z
    .object({
      data: z.union([
        SubMissionUpdateManyMutationInputSchema,
        SubMissionUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SubMissionUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        SubMissionUpdateManyMutationInputSchema,
        SubMissionUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionDeleteManyArgsSchema: z.ZodType<Prisma.SubMissionDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: SubMissionWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagCreateArgsSchema: z.ZodType<Prisma.SubMissionTagCreateArgs>
  = z
    .object({
      data: z.union([
        SubMissionTagCreateInputSchema,
        SubMissionTagUncheckedCreateInputSchema,
      ]),
      include: SubMissionTagIncludeSchema.optional(),
      select: SubMissionTagSelectSchema.optional(),
    })
    .strict();

export const SubMissionTagUpsertArgsSchema: z.ZodType<Prisma.SubMissionTagUpsertArgs>
  = z
    .object({
      create: z.union([
        SubMissionTagCreateInputSchema,
        SubMissionTagUncheckedCreateInputSchema,
      ]),
      include: SubMissionTagIncludeSchema.optional(),
      select: SubMissionTagSelectSchema.optional(),
      update: z.union([
        SubMissionTagUpdateInputSchema,
        SubMissionTagUncheckedUpdateInputSchema,
      ]),
      where: SubMissionTagWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionTagCreateManyArgsSchema: z.ZodType<Prisma.SubMissionTagCreateManyArgs>
  = z
    .object({
      data: z.union([
        SubMissionTagCreateManyInputSchema,
        SubMissionTagCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SubMissionTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubMissionTagCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        SubMissionTagCreateManyInputSchema,
        SubMissionTagCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SubMissionTagDeleteArgsSchema: z.ZodType<Prisma.SubMissionTagDeleteArgs>
  = z
    .object({
      include: SubMissionTagIncludeSchema.optional(),
      select: SubMissionTagSelectSchema.optional(),
      where: SubMissionTagWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionTagUpdateArgsSchema: z.ZodType<Prisma.SubMissionTagUpdateArgs>
  = z
    .object({
      data: z.union([
        SubMissionTagUpdateInputSchema,
        SubMissionTagUncheckedUpdateInputSchema,
      ]),
      include: SubMissionTagIncludeSchema.optional(),
      select: SubMissionTagSelectSchema.optional(),
      where: SubMissionTagWhereUniqueInputSchema,
    })
    .strict();

export const SubMissionTagUpdateManyArgsSchema: z.ZodType<Prisma.SubMissionTagUpdateManyArgs>
  = z
    .object({
      data: z.union([
        SubMissionTagUpdateManyMutationInputSchema,
        SubMissionTagUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SubMissionTagUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        SubMissionTagUpdateManyMutationInputSchema,
        SubMissionTagUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();

export const SubMissionTagDeleteManyArgsSchema: z.ZodType<Prisma.SubMissionTagDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: SubMissionTagWhereInputSchema.optional(),
    })
    .strict();
