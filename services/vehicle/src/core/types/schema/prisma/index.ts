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

export const VehicleScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "type",
  "number_code",
  "image",
  "create_date",
  "update_date",
  "delete_date",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const TypeVehicleSchema = z.enum(["Car", "Helicopter", "Ship"]);

export type TypeVehicleType = `${z.infer<typeof TypeVehicleSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// VEHICLE SCHEMA
/////////////////////////////////////////

export const VehicleSchema = z.object({
  create_date: z.coerce.date(),
  delete_date: z.coerce.date().nullish(),
  id: z.string().uuid(),
  image: z.string(),
  name: z.string(),
  number_code: z.string(),
  type: TypeVehicleSchema,
  update_date: z.coerce.date(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

/////////////////////////////////////////
// VEHICLE PARTIAL SCHEMA
/////////////////////////////////////////

export const VehiclePartialSchema = VehicleSchema.partial();

export type VehiclePartial = z.infer<typeof VehiclePartialSchema>;

// VEHICLE OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const VehicleOptionalDefaultsSchema = VehicleSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    update_date: z.coerce.date().optional(),
  }),
);

export type VehicleOptionalDefaults = z.infer<
  typeof VehicleOptionalDefaultsSchema
>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// VEHICLE
// ------------------------------------------------------

export const VehicleSelectSchema: z.ZodType<Prisma.VehicleSelect> = z
  .object({
    create_date: z.boolean().optional(),
    delete_date: z.boolean().optional(),
    id: z.boolean().optional(),
    image: z.boolean().optional(),
    name: z.boolean().optional(),
    number_code: z.boolean().optional(),
    type: z.boolean().optional(),
    update_date: z.boolean().optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const VehicleWhereInputSchema: z.ZodType<Prisma.VehicleWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VehicleWhereInputSchema),
        z.lazy(() => VehicleWhereInputSchema).array(),
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
    image: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => VehicleWhereInputSchema),
        z.lazy(() => VehicleWhereInputSchema).array(),
      ])
      .optional(),
    number_code: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    OR: z
      .lazy(() => VehicleWhereInputSchema)
      .array()
      .optional(),
    type: z
      .union([
        z.lazy(() => EnumTypeVehicleFilterSchema),
        z.lazy(() => TypeVehicleSchema),
      ])
      .optional(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();

export const VehicleOrderByWithRelationInputSchema: z.ZodType<Prisma.VehicleOrderByWithRelationInput>
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
      image: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      number_code: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VehicleWhereUniqueInputSchema: z.ZodType<Prisma.VehicleWhereUniqueInput>
  = z
    .object({
      id: z.string().uuid(),
    })
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => VehicleWhereInputSchema),
              z.lazy(() => VehicleWhereInputSchema).array(),
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
          image: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          NOT: z
            .union([
              z.lazy(() => VehicleWhereInputSchema),
              z.lazy(() => VehicleWhereInputSchema).array(),
            ])
            .optional(),
          number_code: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          OR: z
            .lazy(() => VehicleWhereInputSchema)
            .array()
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumTypeVehicleFilterSchema),
              z.lazy(() => TypeVehicleSchema),
            ])
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

export const VehicleOrderByWithAggregationInputSchema: z.ZodType<Prisma.VehicleOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => VehicleCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => VehicleMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => VehicleMinOrderByAggregateInputSchema).optional(),
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
      image: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      number_code: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VehicleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array(),
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
      image: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      number_code: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      OR: z
        .lazy(() => VehicleScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumTypeVehicleWithAggregatesFilterSchema),
          z.lazy(() => TypeVehicleSchema),
        ])
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

export const VehicleCreateInputSchema: z.ZodType<Prisma.VehicleCreateInput> = z
  .object({
    create_date: z.coerce.date().optional().nullable(),
    delete_date: z.coerce.date().optional().nullable(),
    id: z.string().uuid().optional(),
    image: z.string(),
    name: z.string(),
    number_code: z.string(),
    type: z.lazy(() => TypeVehicleSchema),
    update_date: z.coerce.date().optional().nullable(),
  })
  .strict();

export const VehicleUncheckedCreateInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      image: z.string(),
      name: z.string(),
      number_code: z.string(),
      type: z.lazy(() => TypeVehicleSchema),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const VehicleUpdateInputSchema: z.ZodType<Prisma.VehicleUpdateInput> = z
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
    image: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    number_code: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    type: z
      .union([
        z.lazy(() => TypeVehicleSchema),
        z.lazy(() => EnumTypeVehicleFieldUpdateOperationsInputSchema),
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

export const VehicleUncheckedUpdateInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateInput>
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
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      number_code: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => EnumTypeVehicleFieldUpdateOperationsInputSchema),
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

export const VehicleCreateManyInputSchema: z.ZodType<Prisma.VehicleCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      id: z.string().uuid().optional(),
      image: z.string(),
      name: z.string(),
      number_code: z.string(),
      type: z.lazy(() => TypeVehicleSchema),
      update_date: z.coerce.date().optional().nullable(),
    })
    .strict();

export const VehicleUpdateManyMutationInputSchema: z.ZodType<Prisma.VehicleUpdateManyMutationInput>
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
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      number_code: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => EnumTypeVehicleFieldUpdateOperationsInputSchema),
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

export const VehicleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyInput>
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
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      number_code: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => EnumTypeVehicleFieldUpdateOperationsInputSchema),
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

export const EnumTypeVehicleFilterSchema: z.ZodType<Prisma.EnumTypeVehicleFilter>
  = z
    .object({
      equals: z.lazy(() => TypeVehicleSchema).optional(),
      in: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => NestedEnumTypeVehicleFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
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

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    nulls: z.lazy(() => NullsOrderSchema).optional(),
    sort: z.lazy(() => SortOrderSchema),
  })
  .strict();

export const VehicleCountOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      number_code: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VehicleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      number_code: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VehicleMinOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      number_code: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumTypeVehicleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTypeVehicleWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumTypeVehicleFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumTypeVehicleFilterSchema).optional(),
      equals: z.lazy(() => TypeVehicleSchema).optional(),
      in: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => NestedEnumTypeVehicleWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
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

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const EnumTypeVehicleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTypeVehicleFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => TypeVehicleSchema).optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>
  = z
    .object({
      set: z.coerce.date().optional().nullable(),
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

export const NestedEnumTypeVehicleFilterSchema: z.ZodType<Prisma.NestedEnumTypeVehicleFilter>
  = z
    .object({
      equals: z.lazy(() => TypeVehicleSchema).optional(),
      in: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => NestedEnumTypeVehicleFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
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

export const NestedEnumTypeVehicleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTypeVehicleWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumTypeVehicleFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumTypeVehicleFilterSchema).optional(),
      equals: z.lazy(() => TypeVehicleSchema).optional(),
      in: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeVehicleSchema),
          z.lazy(() => NestedEnumTypeVehicleWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => TypeVehicleSchema)
        .array()
        .optional(),
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

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const VehicleFindFirstArgsSchema: z.ZodType<Prisma.VehicleFindFirstArgs>
  = z
    .object({
      cursor: VehicleWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          VehicleScalarFieldEnumSchema,
          VehicleScalarFieldEnumSchema.array(),
        ])
        .optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: VehicleSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();

export const VehicleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindFirstOrThrowArgs>
  = z
    .object({
      cursor: VehicleWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          VehicleScalarFieldEnumSchema,
          VehicleScalarFieldEnumSchema.array(),
        ])
        .optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: VehicleSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();

export const VehicleFindManyArgsSchema: z.ZodType<Prisma.VehicleFindManyArgs>
  = z
    .object({
      cursor: VehicleWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          VehicleScalarFieldEnumSchema,
          VehicleScalarFieldEnumSchema.array(),
        ])
        .optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: VehicleSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();

export const VehicleAggregateArgsSchema: z.ZodType<Prisma.VehicleAggregateArgs>
  = z
    .object({
      cursor: VehicleWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          VehicleOrderByWithRelationInputSchema.array(),
          VehicleOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();

export const VehicleGroupByArgsSchema: z.ZodType<Prisma.VehicleGroupByArgs> = z
  .object({
    by: VehicleScalarFieldEnumSchema.array(),
    having: VehicleScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        VehicleOrderByWithAggregationInputSchema.array(),
        VehicleOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: VehicleWhereInputSchema.optional(),
  })
  .strict();

export const VehicleFindUniqueArgsSchema: z.ZodType<Prisma.VehicleFindUniqueArgs>
  = z
    .object({
      select: VehicleSelectSchema.optional(),
      where: VehicleWhereUniqueInputSchema,
    })
    .strict();

export const VehicleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindUniqueOrThrowArgs>
  = z
    .object({
      select: VehicleSelectSchema.optional(),
      where: VehicleWhereUniqueInputSchema,
    })
    .strict();

export const VehicleCreateArgsSchema: z.ZodType<Prisma.VehicleCreateArgs> = z
  .object({
    data: z.union([
      VehicleCreateInputSchema,
      VehicleUncheckedCreateInputSchema,
    ]),
    select: VehicleSelectSchema.optional(),
  })
  .strict();

export const VehicleUpsertArgsSchema: z.ZodType<Prisma.VehicleUpsertArgs> = z
  .object({
    create: z.union([
      VehicleCreateInputSchema,
      VehicleUncheckedCreateInputSchema,
    ]),
    select: VehicleSelectSchema.optional(),
    update: z.union([
      VehicleUpdateInputSchema,
      VehicleUncheckedUpdateInputSchema,
    ]),
    where: VehicleWhereUniqueInputSchema,
  })
  .strict();

export const VehicleCreateManyArgsSchema: z.ZodType<Prisma.VehicleCreateManyArgs>
  = z
    .object({
      data: z.union([
        VehicleCreateManyInputSchema,
        VehicleCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VehicleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        VehicleCreateManyInputSchema,
        VehicleCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VehicleDeleteArgsSchema: z.ZodType<Prisma.VehicleDeleteArgs> = z
  .object({
    select: VehicleSelectSchema.optional(),
    where: VehicleWhereUniqueInputSchema,
  })
  .strict();

export const VehicleUpdateArgsSchema: z.ZodType<Prisma.VehicleUpdateArgs> = z
  .object({
    data: z.union([
      VehicleUpdateInputSchema,
      VehicleUncheckedUpdateInputSchema,
    ]),
    select: VehicleSelectSchema.optional(),
    where: VehicleWhereUniqueInputSchema,
  })
  .strict();

export const VehicleUpdateManyArgsSchema: z.ZodType<Prisma.VehicleUpdateManyArgs>
  = z
    .object({
      data: z.union([
        VehicleUpdateManyMutationInputSchema,
        VehicleUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();

export const VehicleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VehicleUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        VehicleUpdateManyMutationInputSchema,
        VehicleUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();

export const VehicleDeleteManyArgsSchema: z.ZodType<Prisma.VehicleDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: VehicleWhereInputSchema.optional(),
    })
    .strict();
