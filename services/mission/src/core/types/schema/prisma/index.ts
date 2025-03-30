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
};

export type MissionWithRelations = z.infer<typeof MissionSchema> &
  MissionRelations;

export const MissionWithRelationsSchema: z.ZodType<MissionWithRelations>
  = MissionSchema.merge(
    z.object({
      SubMission: z.lazy(() => SubMissionWithRelationsSchema).array(),
    }),
  );

// MISSION OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type MissionOptionalDefaultsRelations = {
  SubMission: SubMissionOptionalDefaultsWithRelations[];
};

export type MissionOptionalDefaultsWithRelations = z.infer<
  typeof MissionOptionalDefaultsSchema
> &
MissionOptionalDefaultsRelations;

export const MissionOptionalDefaultsWithRelationsSchema: z.ZodType<MissionOptionalDefaultsWithRelations>
  = MissionOptionalDefaultsSchema.merge(
    z.object({
      SubMission: z
        .lazy(() => SubMissionOptionalDefaultsWithRelationsSchema)
        .array(),
    }),
  );

// MISSION PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type MissionPartialRelations = {
  SubMission?: SubMissionPartialWithRelations[];
};

export type MissionPartialWithRelations = z.infer<typeof MissionPartialSchema> &
  MissionPartialRelations;

export const MissionPartialWithRelationsSchema: z.ZodType<MissionPartialWithRelations>
  = MissionPartialSchema.merge(
    z.object({
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
        SubMission: z.lazy(() => SubMissionPartialWithRelationsSchema).array(),
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
    id: z.boolean().optional(),
    image: z.boolean().optional(),
    lat: z.boolean().optional(),
    long: z.boolean().optional(),
    mgrs: z.boolean().optional(),
    status: z.boolean().optional(),
    SubMission: z
      .union([z.boolean(), z.lazy(() => SubMissionFindManyArgsSchema)])
      .optional(),
    title: z.boolean().optional(),
    update_date: z.boolean().optional(),
    utm: z.boolean().optional(),
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
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
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
          id: z.string().uuid().optional(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
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
    id: z.string().uuid().optional(),
    image: z.string().optional().nullable(),
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

export const MissionUncheckedCreateInputSchema: z.ZodType<Prisma.MissionUncheckedCreateInput>
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

export const MissionCreateWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionCreateWithoutSubMissionInput>
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

export const MissionUncheckedCreateWithoutSubMissionInputSchema: z.ZodType<Prisma.MissionUncheckedCreateWithoutSubMissionInput>
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
