import type { Prisma } from "@prisma/client"
import { z } from "zod"

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
])

export const UsersScalarFieldEnumSchema = z.enum([
  "id",
  "username",
  "password",
  "first_name",
  "last_name",
  "status",
  "role",
  "email",
  "address",
  "phone_number",
  "career",
  "id_card",
  "image",
  "hospital_branch_id",
  "refresh_token",
  "create_date",
  "update_date",
  "delete_date",
])

export const SortOrderSchema = z.enum(["asc", "desc"])

export const QueryModeSchema = z.enum(["default", "insensitive"])

export const NullsOrderSchema = z.enum(["first", "last"])

export const RoleUsersSchema = z.enum(["RootAdmin", "Admin", "User"])

export type RoleUsersType = `${z.infer<typeof RoleUsersSchema>}`

export const StatusUserSchema = z.enum(["Pending", "Activate", "Block"])

export type StatusUserType = `${z.infer<typeof StatusUserSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
  address: z.string().nullish(),
  career: z.string().nullish(),
  create_date: z.coerce.date(),
  delete_date: z.coerce.date().nullish(),
  email: z.string().nullish(),
  first_name: z.string(),
  hospital_branch_id: z.string().nullish(),
  id: z.string().uuid(),
  id_card: z.string().nullish(),
  image: z.string().nullish(),
  last_name: z.string(),
  password: z.string(),
  phone_number: z.string().nullish(),
  refresh_token: z.string().nullish(),
  role: RoleUsersSchema,
  status: StatusUserSchema,
  update_date: z.coerce.date(),
  username: z.string(),
})

export type Users = z.infer<typeof UsersSchema>

/////////////////////////////////////////
// USERS PARTIAL SCHEMA
/////////////////////////////////////////

export const UsersPartialSchema = UsersSchema.partial()

export type UsersPartial = z.infer<typeof UsersPartialSchema>

// USERS OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const UsersOptionalDefaultsSchema = UsersSchema.merge(
  z.object({
    create_date: z.coerce.date().optional(),
    id: z.string().uuid().optional(),
    role: RoleUsersSchema.optional(),
    status: StatusUserSchema.optional(),
    update_date: z.coerce.date().optional(),
  }),
)

export type UsersOptionalDefaults = z.infer<typeof UsersOptionalDefaultsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USERS
// ------------------------------------------------------

export const UsersSelectSchema: z.ZodType<Prisma.UsersSelect> = z
  .object({
    address: z.boolean().optional(),
    career: z.boolean().optional(),
    create_date: z.boolean().optional(),
    delete_date: z.boolean().optional(),
    email: z.boolean().optional(),
    first_name: z.boolean().optional(),
    hospital_branch_id: z.boolean().optional(),
    id: z.boolean().optional(),
    id_card: z.boolean().optional(),
    image: z.boolean().optional(),
    last_name: z.boolean().optional(),
    password: z.boolean().optional(),
    phone_number: z.boolean().optional(),
    refresh_token: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    update_date: z.boolean().optional(),
    username: z.boolean().optional(),
  })
  .strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UsersWhereInputSchema: z.ZodType<Prisma.UsersWhereInput> = z
  .object({
    address: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    AND: z
      .union([
        z.lazy(() => UsersWhereInputSchema),
        z.lazy(() => UsersWhereInputSchema).array(),
      ])
      .optional(),
    career: z
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
    email: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    first_name: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    hospital_branch_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
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
    last_name: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UsersWhereInputSchema),
        z.lazy(() => UsersWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UsersWhereInputSchema)
      .array()
      .optional(),
    password: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    phone_number: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => EnumRoleUsersFilterSchema),
        z.lazy(() => RoleUsersSchema),
      ])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumStatusUserFilterSchema),
        z.lazy(() => StatusUserSchema),
      ])
      .optional(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    username: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  })
  .strict()

export const UsersOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOrderByWithRelationInput>
  = z
    .object({
      address: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      career: z
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
      email: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      hospital_branch_id: z
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
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UsersWhereUniqueInputSchema: z.ZodType<Prisma.UsersWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        username: z.string(),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        username: z.string(),
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
              z.lazy(() => UsersWhereInputSchema),
              z.lazy(() => UsersWhereInputSchema).array(),
            ])
            .optional(),
          career: z
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
          email: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          first_name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          hospital_branch_id: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
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
          last_name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UsersWhereInputSchema),
              z.lazy(() => UsersWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UsersWhereInputSchema)
            .array()
            .optional(),
          password: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          phone_number: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          refresh_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          role: z
            .union([
              z.lazy(() => EnumRoleUsersFilterSchema),
              z.lazy(() => RoleUsersSchema),
            ])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumStatusUserFilterSchema),
              z.lazy(() => StatusUserSchema),
            ])
            .optional(),
          update_date: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          username: z.string().optional(),
        })
        .strict(),
    )

export const UsersOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOrderByWithAggregationInput>
  = z
    .object({
      _count: z.lazy(() => UsersCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UsersMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UsersMinOrderByAggregateInputSchema).optional(),
      address: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      career: z
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
      email: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      hospital_branch_id: z
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
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UsersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersScalarWhereWithAggregatesInput>
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
          z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      career: z
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
      email: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      hospital_branch_id: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
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
      last_name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UsersScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      password: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      phone_number: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      refresh_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      role: z
        .union([
          z.lazy(() => EnumRoleUsersWithAggregatesFilterSchema),
          z.lazy(() => RoleUsersSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumStatusUserWithAggregatesFilterSchema),
          z.lazy(() => StatusUserSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      username: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict()

export const UsersCreateInputSchema: z.ZodType<Prisma.UsersCreateInput> = z
  .object({
    address: z.string().optional().nullable(),
    career: z.string().optional().nullable(),
    create_date: z.coerce.date().optional().nullable(),
    delete_date: z.coerce.date().optional().nullable(),
    email: z.string().optional().nullable(),
    first_name: z.string(),
    hospital_branch_id: z.string().optional().nullable(),
    id: z.string().uuid().optional(),
    id_card: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    last_name: z.string(),
    password: z.string(),
    phone_number: z.string().optional().nullable(),
    refresh_token: z.string().optional().nullable(),
    role: z.lazy(() => RoleUsersSchema).optional(),
    status: z.lazy(() => StatusUserSchema).optional(),
    update_date: z.coerce.date().optional().nullable(),
    username: z.string(),
  })
  .strict()

export const UsersUncheckedCreateInputSchema: z.ZodType<Prisma.UsersUncheckedCreateInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      career: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      email: z.string().optional().nullable(),
      first_name: z.string(),
      hospital_branch_id: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      last_name: z.string(),
      password: z.string(),
      phone_number: z.string().optional().nullable(),
      refresh_token: z.string().optional().nullable(),
      role: z.lazy(() => RoleUsersSchema).optional(),
      status: z.lazy(() => StatusUserSchema).optional(),
      update_date: z.coerce.date().optional().nullable(),
      username: z.string(),
    })
    .strict()

export const UsersUpdateInputSchema: z.ZodType<Prisma.UsersUpdateInput> = z
  .object({
    address: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    career: z
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
    email: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    first_name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    hospital_branch_id: z
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
    last_name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    password: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    phone_number: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    role: z
      .union([
        z.lazy(() => RoleUsersSchema),
        z.lazy(() => EnumRoleUsersFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    status: z
      .union([
        z.lazy(() => StatusUserSchema),
        z.lazy(() => EnumStatusUserFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    update_date: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict()

export const UsersUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      career: z
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
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hospital_branch_id: z
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
      last_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phone_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      role: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => EnumRoleUsersFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => EnumStatusUserFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const UsersCreateManyInputSchema: z.ZodType<Prisma.UsersCreateManyInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      career: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      email: z.string().optional().nullable(),
      first_name: z.string(),
      hospital_branch_id: z.string().optional().nullable(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      last_name: z.string(),
      password: z.string(),
      phone_number: z.string().optional().nullable(),
      refresh_token: z.string().optional().nullable(),
      role: z.lazy(() => RoleUsersSchema).optional(),
      status: z.lazy(() => StatusUserSchema).optional(),
      update_date: z.coerce.date().optional().nullable(),
      username: z.string(),
    })
    .strict()

export const UsersUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersUpdateManyMutationInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      career: z
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
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hospital_branch_id: z
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
      last_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phone_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      role: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => EnumRoleUsersFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => EnumStatusUserFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const UsersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateManyInput>
  = z
    .object({
      address: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      career: z
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
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      first_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hospital_branch_id: z
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
      last_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phone_number: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      role: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => EnumRoleUsersFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => EnumStatusUserFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      update_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

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
  .strict()

export const EnumStatusUserFilterSchema: z.ZodType<Prisma.EnumStatusUserFilter>
  = z
    .object({
      equals: z.lazy(() => StatusUserSchema).optional(),
      in: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => NestedEnumStatusUserFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
    })
    .strict()

export const EnumRoleUsersFilterSchema: z.ZodType<Prisma.EnumRoleUsersFilter>
  = z
    .object({
      equals: z.lazy(() => RoleUsersSchema).optional(),
      in: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => NestedEnumRoleUsersFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
    })
    .strict()

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
    .strict()

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
    .strict()

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    nulls: z.lazy(() => NullsOrderSchema).optional(),
    sort: z.lazy(() => SortOrderSchema),
  })
  .strict()

export const UsersCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersCountOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      career: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      hospital_branch_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UsersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMaxOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      career: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      hospital_branch_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UsersMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMinOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      career: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      hospital_branch_id: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

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
    .strict()

export const EnumStatusUserWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusUserWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumStatusUserFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumStatusUserFilterSchema).optional(),
      equals: z.lazy(() => StatusUserSchema).optional(),
      in: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => NestedEnumStatusUserWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
    })
    .strict()

export const EnumRoleUsersWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleUsersWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleUsersFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleUsersFilterSchema).optional(),
      equals: z.lazy(() => RoleUsersSchema).optional(),
      in: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => NestedEnumRoleUsersWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
    })
    .strict()

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
    .strict()

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
    .strict()

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional(),
    })
    .strict()

export const EnumStatusUserFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusUserFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => StatusUserSchema).optional(),
    })
    .strict()

export const EnumRoleUsersFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleUsersFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => RoleUsersSchema).optional(),
    })
    .strict()

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>
  = z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict()

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>
  = z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict()

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
  .strict()

export const NestedEnumStatusUserFilterSchema: z.ZodType<Prisma.NestedEnumStatusUserFilter>
  = z
    .object({
      equals: z.lazy(() => StatusUserSchema).optional(),
      in: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => NestedEnumStatusUserFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
    })
    .strict()

export const NestedEnumRoleUsersFilterSchema: z.ZodType<Prisma.NestedEnumRoleUsersFilter>
  = z
    .object({
      equals: z.lazy(() => RoleUsersSchema).optional(),
      in: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => NestedEnumRoleUsersFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
    })
    .strict()

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
    .strict()

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
    .strict()

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
    .strict()

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
  .strict()

export const NestedEnumStatusUserWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusUserWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumStatusUserFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumStatusUserFilterSchema).optional(),
      equals: z.lazy(() => StatusUserSchema).optional(),
      in: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => StatusUserSchema),
          z.lazy(() => NestedEnumStatusUserWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => StatusUserSchema)
        .array()
        .optional(),
    })
    .strict()

export const NestedEnumRoleUsersWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleUsersWithAggregatesFilter>
  = z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleUsersFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleUsersFilterSchema).optional(),
      equals: z.lazy(() => RoleUsersSchema).optional(),
      in: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleUsersSchema),
          z.lazy(() => NestedEnumRoleUsersWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z
        .lazy(() => RoleUsersSchema)
        .array()
        .optional(),
    })
    .strict()

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
    .strict()

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
    .strict()

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
    .strict()

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UsersFindFirstArgsSchema: z.ZodType<Prisma.UsersFindFirstArgs> = z
  .object({
    cursor: UsersWhereUniqueInputSchema.optional(),
    distinct: z
      .union([UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array()])
      .optional(),
    orderBy: z
      .union([
        UsersOrderByWithRelationInputSchema.array(),
        UsersOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: UsersSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UsersWhereInputSchema.optional(),
  })
  .strict()

export const UsersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersFindFirstOrThrowArgs>
  = z
    .object({
      cursor: UsersWhereUniqueInputSchema.optional(),
      distinct: z
        .union([UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array()])
        .optional(),
      orderBy: z
        .union([
          UsersOrderByWithRelationInputSchema.array(),
          UsersOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: UsersSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: UsersWhereInputSchema.optional(),
    })
    .strict()

export const UsersFindManyArgsSchema: z.ZodType<Prisma.UsersFindManyArgs> = z
  .object({
    cursor: UsersWhereUniqueInputSchema.optional(),
    distinct: z
      .union([UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array()])
      .optional(),
    orderBy: z
      .union([
        UsersOrderByWithRelationInputSchema.array(),
        UsersOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: UsersSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UsersWhereInputSchema.optional(),
  })
  .strict()

export const UsersAggregateArgsSchema: z.ZodType<Prisma.UsersAggregateArgs> = z
  .object({
    cursor: UsersWhereUniqueInputSchema.optional(),
    orderBy: z
      .union([
        UsersOrderByWithRelationInputSchema.array(),
        UsersOrderByWithRelationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UsersWhereInputSchema.optional(),
  })
  .strict()

export const UsersGroupByArgsSchema: z.ZodType<Prisma.UsersGroupByArgs> = z
  .object({
    by: UsersScalarFieldEnumSchema.array(),
    having: UsersScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        UsersOrderByWithAggregationInputSchema.array(),
        UsersOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: UsersWhereInputSchema.optional(),
  })
  .strict()

export const UsersFindUniqueArgsSchema: z.ZodType<Prisma.UsersFindUniqueArgs>
  = z
    .object({
      select: UsersSelectSchema.optional(),
      where: UsersWhereUniqueInputSchema,
    })
    .strict()

export const UsersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersFindUniqueOrThrowArgs>
  = z
    .object({
      select: UsersSelectSchema.optional(),
      where: UsersWhereUniqueInputSchema,
    })
    .strict()

export const UsersCreateArgsSchema: z.ZodType<Prisma.UsersCreateArgs> = z
  .object({
    data: z.union([UsersCreateInputSchema, UsersUncheckedCreateInputSchema]),
    select: UsersSelectSchema.optional(),
  })
  .strict()

export const UsersUpsertArgsSchema: z.ZodType<Prisma.UsersUpsertArgs> = z
  .object({
    create: z.union([UsersCreateInputSchema, UsersUncheckedCreateInputSchema]),
    select: UsersSelectSchema.optional(),
    update: z.union([UsersUpdateInputSchema, UsersUncheckedUpdateInputSchema]),
    where: UsersWhereUniqueInputSchema,
  })
  .strict()

export const UsersCreateManyArgsSchema: z.ZodType<Prisma.UsersCreateManyArgs>
  = z
    .object({
      data: z.union([
        UsersCreateManyInputSchema,
        UsersCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UsersCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsersCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        UsersCreateManyInputSchema,
        UsersCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UsersDeleteArgsSchema: z.ZodType<Prisma.UsersDeleteArgs> = z
  .object({
    select: UsersSelectSchema.optional(),
    where: UsersWhereUniqueInputSchema,
  })
  .strict()

export const UsersUpdateArgsSchema: z.ZodType<Prisma.UsersUpdateArgs> = z
  .object({
    data: z.union([UsersUpdateInputSchema, UsersUncheckedUpdateInputSchema]),
    select: UsersSelectSchema.optional(),
    where: UsersWhereUniqueInputSchema,
  })
  .strict()

export const UsersUpdateManyArgsSchema: z.ZodType<Prisma.UsersUpdateManyArgs>
  = z
    .object({
      data: z.union([
        UsersUpdateManyMutationInputSchema,
        UsersUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: UsersWhereInputSchema.optional(),
    })
    .strict()

export const UsersUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UsersUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        UsersUpdateManyMutationInputSchema,
        UsersUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: UsersWhereInputSchema.optional(),
    })
    .strict()

export const UsersDeleteManyArgsSchema: z.ZodType<Prisma.UsersDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: UsersWhereInputSchema.optional(),
    })
    .strict()
