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
  "create_date",
  "update_date",
  "delete_date",
]);

export const StoreRefreshTokenScalarFieldEnumSchema = z.enum([
  "id",
  "refresh_token",
  "user_id",
  "create_date",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const RoleUsersSchema = z.enum(["RootAdmin", "Admin", "User"]);

export type RoleUsersType = `${z.infer<typeof RoleUsersSchema>}`;

export const StatusUserSchema = z.enum(["Pending", "Activate", "Block"]);

export type StatusUserType = `${z.infer<typeof StatusUserSchema>}`;

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
  id: z.string().uuid(),
  id_card: z.string().nullish(),
  image: z.string().nullish(),
  last_name: z.string(),
  password: z.string(),
  phone_number: z.string().nullish(),
  role: RoleUsersSchema,
  status: StatusUserSchema,
  update_date: z.coerce.date(),
  username: z.string(),
});

export type Users = z.infer<typeof UsersSchema>;

/////////////////////////////////////////
// USERS PARTIAL SCHEMA
/////////////////////////////////////////

export const UsersPartialSchema = UsersSchema.partial();

export type UsersPartial = z.infer<typeof UsersPartialSchema>;

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
);

export type UsersOptionalDefaults = z.infer<typeof UsersOptionalDefaultsSchema>;

// USERS RELATION SCHEMA
// ------------------------------------------------------

export type UsersRelations = {
  StoreRefreshToken?: StoreRefreshTokenWithRelations | null;
};

export type UsersWithRelations = z.infer<typeof UsersSchema> & UsersRelations;

export const UsersWithRelationsSchema: z.ZodType<UsersWithRelations>
  = UsersSchema.merge(
    z.object({
      StoreRefreshToken: z
        .lazy(() => StoreRefreshTokenWithRelationsSchema)
        .nullish(),
    }),
  );

// USERS OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type UsersOptionalDefaultsRelations = {
  StoreRefreshToken?: StoreRefreshTokenOptionalDefaultsWithRelations | null;
};

export type UsersOptionalDefaultsWithRelations = z.infer<
  typeof UsersOptionalDefaultsSchema
> &
UsersOptionalDefaultsRelations;

export const UsersOptionalDefaultsWithRelationsSchema: z.ZodType<UsersOptionalDefaultsWithRelations>
  = UsersOptionalDefaultsSchema.merge(
    z.object({
      StoreRefreshToken: z
        .lazy(() => StoreRefreshTokenOptionalDefaultsWithRelationsSchema)
        .nullish(),
    }),
  );

// USERS PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type UsersPartialRelations = {
  StoreRefreshToken?: StoreRefreshTokenPartialWithRelations | null;
};

export type UsersPartialWithRelations = z.infer<typeof UsersPartialSchema> &
  UsersPartialRelations;

export const UsersPartialWithRelationsSchema: z.ZodType<UsersPartialWithRelations>
  = UsersPartialSchema.merge(
    z.object({
      StoreRefreshToken: z
        .lazy(() => StoreRefreshTokenPartialWithRelationsSchema)
        .nullish(),
    }),
  ).partial();

export type UsersOptionalDefaultsWithPartialRelations = z.infer<
  typeof UsersOptionalDefaultsSchema
> &
UsersPartialRelations;

export const UsersOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UsersOptionalDefaultsWithPartialRelations>
  = UsersOptionalDefaultsSchema.merge(
    z
      .object({
        StoreRefreshToken: z
          .lazy(() => StoreRefreshTokenPartialWithRelationsSchema)
          .nullish(),
      })
      .partial(),
  );

export type UsersWithPartialRelations = z.infer<typeof UsersSchema> &
  UsersPartialRelations;

export const UsersWithPartialRelationsSchema: z.ZodType<UsersWithPartialRelations>
  = UsersSchema.merge(
    z
      .object({
        StoreRefreshToken: z
          .lazy(() => StoreRefreshTokenPartialWithRelationsSchema)
          .nullish(),
      })
      .partial(),
  );

/////////////////////////////////////////
// STORE REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const StoreRefreshTokenSchema = z.object({
  create_date: z.coerce.date(),
  id: z.string().uuid(),
  refresh_token: z.string(),
  user_id: z.string(),
});

export type StoreRefreshToken = z.infer<typeof StoreRefreshTokenSchema>;

/////////////////////////////////////////
// STORE REFRESH TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const StoreRefreshTokenPartialSchema = StoreRefreshTokenSchema.partial();

export type StoreRefreshTokenPartial = z.infer<
  typeof StoreRefreshTokenPartialSchema
>;

// STORE REFRESH TOKEN OPTIONAL DEFAULTS SCHEMA
// ------------------------------------------------------

export const StoreRefreshTokenOptionalDefaultsSchema
  = StoreRefreshTokenSchema.merge(
    z.object({
      create_date: z.coerce.date().optional(),
      id: z.string().uuid().optional(),
    }),
  );

export type StoreRefreshTokenOptionalDefaults = z.infer<
  typeof StoreRefreshTokenOptionalDefaultsSchema
>;

// STORE REFRESH TOKEN RELATION SCHEMA
// ------------------------------------------------------

export type StoreRefreshTokenRelations = {
  user: UsersWithRelations;
};

export type StoreRefreshTokenWithRelations = z.infer<
  typeof StoreRefreshTokenSchema
> &
StoreRefreshTokenRelations;

export const StoreRefreshTokenWithRelationsSchema: z.ZodType<StoreRefreshTokenWithRelations>
  = StoreRefreshTokenSchema.merge(
    z.object({
      user: z.lazy(() => UsersWithRelationsSchema),
    }),
  );

// STORE REFRESH TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
// ------------------------------------------------------

export type StoreRefreshTokenOptionalDefaultsRelations = {
  user: UsersOptionalDefaultsWithRelations;
};

export type StoreRefreshTokenOptionalDefaultsWithRelations = z.infer<
  typeof StoreRefreshTokenOptionalDefaultsSchema
> &
StoreRefreshTokenOptionalDefaultsRelations;

export const StoreRefreshTokenOptionalDefaultsWithRelationsSchema: z.ZodType<StoreRefreshTokenOptionalDefaultsWithRelations>
  = StoreRefreshTokenOptionalDefaultsSchema.merge(
    z.object({
      user: z.lazy(() => UsersOptionalDefaultsWithRelationsSchema),
    }),
  );

// STORE REFRESH TOKEN PARTIAL RELATION SCHEMA
// ------------------------------------------------------

export type StoreRefreshTokenPartialRelations = {
  user?: UsersPartialWithRelations;
};

export type StoreRefreshTokenPartialWithRelations = z.infer<
  typeof StoreRefreshTokenPartialSchema
> &
StoreRefreshTokenPartialRelations;

export const StoreRefreshTokenPartialWithRelationsSchema: z.ZodType<StoreRefreshTokenPartialWithRelations>
  = StoreRefreshTokenPartialSchema.merge(
    z.object({
      user: z.lazy(() => UsersPartialWithRelationsSchema),
    }),
  ).partial();

export type StoreRefreshTokenOptionalDefaultsWithPartialRelations = z.infer<
  typeof StoreRefreshTokenOptionalDefaultsSchema
> &
StoreRefreshTokenPartialRelations;

export const StoreRefreshTokenOptionalDefaultsWithPartialRelationsSchema: z.ZodType<StoreRefreshTokenOptionalDefaultsWithPartialRelations>
  = StoreRefreshTokenOptionalDefaultsSchema.merge(
    z
      .object({
        user: z.lazy(() => UsersPartialWithRelationsSchema),
      })
      .partial(),
  );

export type StoreRefreshTokenWithPartialRelations = z.infer<
  typeof StoreRefreshTokenSchema
> &
StoreRefreshTokenPartialRelations;

export const StoreRefreshTokenWithPartialRelationsSchema: z.ZodType<StoreRefreshTokenWithPartialRelations>
  = StoreRefreshTokenSchema.merge(
    z
      .object({
        user: z.lazy(() => UsersPartialWithRelationsSchema),
      })
      .partial(),
  );

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USERS
// ------------------------------------------------------

export const UsersIncludeSchema: z.ZodType<Prisma.UsersInclude> = z
  .object({
    StoreRefreshToken: z
      .union([z.boolean(), z.lazy(() => StoreRefreshTokenArgsSchema)])
      .optional(),
  })
  .strict();

export const UsersArgsSchema: z.ZodType<Prisma.UsersDefaultArgs> = z
  .object({
    include: z.lazy(() => UsersIncludeSchema).optional(),
    select: z.lazy(() => UsersSelectSchema).optional(),
  })
  .strict();

export const UsersSelectSchema: z.ZodType<Prisma.UsersSelect> = z
  .object({
    address: z.boolean().optional(),
    career: z.boolean().optional(),
    create_date: z.boolean().optional(),
    delete_date: z.boolean().optional(),
    email: z.boolean().optional(),
    first_name: z.boolean().optional(),
    id: z.boolean().optional(),
    id_card: z.boolean().optional(),
    image: z.boolean().optional(),
    last_name: z.boolean().optional(),
    password: z.boolean().optional(),
    phone_number: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    StoreRefreshToken: z
      .union([z.boolean(), z.lazy(() => StoreRefreshTokenArgsSchema)])
      .optional(),
    update_date: z.boolean().optional(),
    username: z.boolean().optional(),
  })
  .strict();

// STORE REFRESH TOKEN
// ------------------------------------------------------

export const StoreRefreshTokenIncludeSchema: z.ZodType<Prisma.StoreRefreshTokenInclude>
  = z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UsersArgsSchema)]).optional(),
    })
    .strict();

export const StoreRefreshTokenArgsSchema: z.ZodType<Prisma.StoreRefreshTokenDefaultArgs>
  = z
    .object({
      include: z.lazy(() => StoreRefreshTokenIncludeSchema).optional(),
      select: z.lazy(() => StoreRefreshTokenSelectSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenSelectSchema: z.ZodType<Prisma.StoreRefreshTokenSelect>
  = z
    .object({
      create_date: z.boolean().optional(),
      id: z.boolean().optional(),
      refresh_token: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UsersArgsSchema)]).optional(),
      user_id: z.boolean().optional(),
    })
    .strict();

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
    StoreRefreshToken: z
      .union([
        z.lazy(() => StoreRefreshTokenNullableScalarRelationFilterSchema),
        z.lazy(() => StoreRefreshTokenWhereInputSchema),
      ])
      .optional()
      .nullable(),
    update_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    username: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  })
  .strict();

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
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      StoreRefreshToken: z
        .lazy(() => StoreRefreshTokenOrderByWithRelationInputSchema)
        .optional(),
      update_date: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

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
          StoreRefreshToken: z
            .union([
              z.lazy(() => StoreRefreshTokenNullableScalarRelationFilterSchema),
              z.lazy(() => StoreRefreshTokenWhereInputSchema),
            ])
            .optional()
            .nullable(),
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
    );

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
    .strict();

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
    .strict();

export const StoreRefreshTokenWhereInputSchema: z.ZodType<Prisma.StoreRefreshTokenWhereInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => StoreRefreshTokenWhereInputSchema),
          z.lazy(() => StoreRefreshTokenWhereInputSchema).array(),
        ])
        .optional(),
      create_date: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      NOT: z
        .union([
          z.lazy(() => StoreRefreshTokenWhereInputSchema),
          z.lazy(() => StoreRefreshTokenWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StoreRefreshTokenWhereInputSchema)
        .array()
        .optional(),
      refresh_token: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      user: z
        .union([
          z.lazy(() => UsersScalarRelationFilterSchema),
          z.lazy(() => UsersWhereInputSchema),
        ])
        .optional(),
      user_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const StoreRefreshTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.StoreRefreshTokenOrderByWithRelationInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenWhereUniqueInputSchema: z.ZodType<Prisma.StoreRefreshTokenWhereUniqueInput>
  = z
    .union([
      z.object({
        id: z.string().uuid(),
        user_id: z.string(),
      }),
      z.object({
        id: z.string().uuid(),
      }),
      z.object({
        user_id: z.string(),
      }),
    ])
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => StoreRefreshTokenWhereInputSchema),
              z.lazy(() => StoreRefreshTokenWhereInputSchema).array(),
            ])
            .optional(),
          create_date: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          id: z.string().uuid().optional(),
          NOT: z
            .union([
              z.lazy(() => StoreRefreshTokenWhereInputSchema),
              z.lazy(() => StoreRefreshTokenWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => StoreRefreshTokenWhereInputSchema)
            .array()
            .optional(),
          refresh_token: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UsersScalarRelationFilterSchema),
              z.lazy(() => UsersWhereInputSchema),
            ])
            .optional(),
          user_id: z.string().optional(),
        })
        .strict(),
    );

export const StoreRefreshTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.StoreRefreshTokenOrderByWithAggregationInput>
  = z
    .object({
      _count: z
        .lazy(() => StoreRefreshTokenCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => StoreRefreshTokenMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => StoreRefreshTokenMinOrderByAggregateInputSchema)
        .optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StoreRefreshTokenScalarWhereWithAggregatesInput>
  = z
    .object({
      AND: z
        .union([
          z.lazy(() => StoreRefreshTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => StoreRefreshTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      create_date: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StoreRefreshTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => StoreRefreshTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StoreRefreshTokenScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      refresh_token: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      user_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UsersCreateInputSchema: z.ZodType<Prisma.UsersCreateInput> = z
  .object({
    address: z.string().optional().nullable(),
    career: z.string().optional().nullable(),
    create_date: z.coerce.date().optional().nullable(),
    delete_date: z.coerce.date().optional().nullable(),
    email: z.string().optional().nullable(),
    first_name: z.string(),
    id: z.string().uuid().optional(),
    id_card: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    last_name: z.string(),
    password: z.string(),
    phone_number: z.string().optional().nullable(),
    role: z.lazy(() => RoleUsersSchema).optional(),
    status: z.lazy(() => StatusUserSchema).optional(),
    StoreRefreshToken: z
      .lazy(() => StoreRefreshTokenCreateNestedOneWithoutUserInputSchema)
      .optional(),
    update_date: z.coerce.date().optional().nullable(),
    username: z.string(),
  })
  .strict();

export const UsersUncheckedCreateInputSchema: z.ZodType<Prisma.UsersUncheckedCreateInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      career: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      email: z.string().optional().nullable(),
      first_name: z.string(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      last_name: z.string(),
      password: z.string(),
      phone_number: z.string().optional().nullable(),
      role: z.lazy(() => RoleUsersSchema).optional(),
      status: z.lazy(() => StatusUserSchema).optional(),
      StoreRefreshToken: z
        .lazy(
          () => StoreRefreshTokenUncheckedCreateNestedOneWithoutUserInputSchema,
        )
        .optional(),
      update_date: z.coerce.date().optional().nullable(),
      username: z.string(),
    })
    .strict();

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
    StoreRefreshToken: z
      .lazy(() => StoreRefreshTokenUpdateOneWithoutUserNestedInputSchema)
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
  .strict();

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
      StoreRefreshToken: z
        .lazy(
          () => StoreRefreshTokenUncheckedUpdateOneWithoutUserNestedInputSchema,
        )
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
    .strict();

export const UsersCreateManyInputSchema: z.ZodType<Prisma.UsersCreateManyInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      career: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      email: z.string().optional().nullable(),
      first_name: z.string(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      last_name: z.string(),
      password: z.string(),
      phone_number: z.string().optional().nullable(),
      role: z.lazy(() => RoleUsersSchema).optional(),
      status: z.lazy(() => StatusUserSchema).optional(),
      update_date: z.coerce.date().optional().nullable(),
      username: z.string(),
    })
    .strict();

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
    .strict();

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
    .strict();

export const StoreRefreshTokenCreateInputSchema: z.ZodType<Prisma.StoreRefreshTokenCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional(),
      id: z.string().uuid().optional(),
      refresh_token: z.string(),
      user: z.lazy(
        () => UsersCreateNestedOneWithoutStoreRefreshTokenInputSchema,
      ),
    })
    .strict();

export const StoreRefreshTokenUncheckedCreateInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedCreateInput>
  = z
    .object({
      create_date: z.coerce.date().optional(),
      id: z.string().uuid().optional(),
      refresh_token: z.string(),
      user_id: z.string(),
    })
    .strict();

export const StoreRefreshTokenUpdateInputSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(
          () => UsersUpdateOneRequiredWithoutStoreRefreshTokenNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const StoreRefreshTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedUpdateInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StoreRefreshTokenCreateManyInputSchema: z.ZodType<Prisma.StoreRefreshTokenCreateManyInput>
  = z
    .object({
      create_date: z.coerce.date().optional(),
      id: z.string().uuid().optional(),
      refresh_token: z.string(),
      user_id: z.string(),
    })
    .strict();

export const StoreRefreshTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateManyMutationInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StoreRefreshTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedUpdateManyInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
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
    .strict();

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

export const StoreRefreshTokenNullableScalarRelationFilterSchema: z.ZodType<Prisma.StoreRefreshTokenNullableScalarRelationFilter>
  = z
    .object({
      is: z
        .lazy(() => StoreRefreshTokenWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => StoreRefreshTokenWhereInputSchema)
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

export const UsersCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersCountOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      career: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMaxOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      career: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UsersMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMinOrderByAggregateInput>
  = z
    .object({
      address: z.lazy(() => SortOrderSchema).optional(),
      career: z.lazy(() => SortOrderSchema).optional(),
      create_date: z.lazy(() => SortOrderSchema).optional(),
      delete_date: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      first_name: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      id_card: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      last_name: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      phone_number: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      update_date: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
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
    .strict();

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

export const UsersScalarRelationFilterSchema: z.ZodType<Prisma.UsersScalarRelationFilter>
  = z
    .object({
      is: z.lazy(() => UsersWhereInputSchema).optional(),
      isNot: z.lazy(() => UsersWhereInputSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.StoreRefreshTokenCountOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StoreRefreshTokenMaxOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.StoreRefreshTokenMinOrderByAggregateInput>
  = z
    .object({
      create_date: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
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

export const StoreRefreshTokenCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenCreateNestedOneWithoutUserInput>
  = z
    .object({
      connect: z.lazy(() => StoreRefreshTokenWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => StoreRefreshTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => StoreRefreshTokenCreateWithoutUserInputSchema),
          z.lazy(() => StoreRefreshTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StoreRefreshTokenUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedCreateNestedOneWithoutUserInput>
  = z
    .object({
      connect: z.lazy(() => StoreRefreshTokenWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => StoreRefreshTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => StoreRefreshTokenCreateWithoutUserInputSchema),
          z.lazy(() => StoreRefreshTokenUncheckedCreateWithoutUserInputSchema),
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

export const EnumStatusUserFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusUserFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => StatusUserSchema).optional(),
    })
    .strict();

export const EnumRoleUsersFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleUsersFieldUpdateOperationsInput>
  = z
    .object({
      set: z.lazy(() => RoleUsersSchema).optional(),
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

export const StoreRefreshTokenUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateOneWithoutUserNestedInput>
  = z
    .object({
      connect: z.lazy(() => StoreRefreshTokenWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => StoreRefreshTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => StoreRefreshTokenCreateWithoutUserInputSchema),
          z.lazy(() => StoreRefreshTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => StoreRefreshTokenWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => StoreRefreshTokenWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => StoreRefreshTokenUpdateToOneWithWhereWithoutUserInputSchema,
          ),
          z.lazy(() => StoreRefreshTokenUpdateWithoutUserInputSchema),
          z.lazy(() => StoreRefreshTokenUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => StoreRefreshTokenUpsertWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const StoreRefreshTokenUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedUpdateOneWithoutUserNestedInput>
  = z
    .object({
      connect: z.lazy(() => StoreRefreshTokenWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => StoreRefreshTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => StoreRefreshTokenCreateWithoutUserInputSchema),
          z.lazy(() => StoreRefreshTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => StoreRefreshTokenWhereInputSchema)])
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => StoreRefreshTokenWhereInputSchema)])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => StoreRefreshTokenUpdateToOneWithWhereWithoutUserInputSchema,
          ),
          z.lazy(() => StoreRefreshTokenUpdateWithoutUserInputSchema),
          z.lazy(() => StoreRefreshTokenUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => StoreRefreshTokenUpsertWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UsersCreateNestedOneWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutStoreRefreshTokenInput>
  = z
    .object({
      connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => UsersCreateOrConnectWithoutStoreRefreshTokenInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => UsersCreateWithoutStoreRefreshTokenInputSchema),
          z.lazy(() => UsersUncheckedCreateWithoutStoreRefreshTokenInputSchema),
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

export const UsersUpdateOneRequiredWithoutStoreRefreshTokenNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutStoreRefreshTokenNestedInput>
  = z
    .object({
      connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
      connectOrCreate: z
        .lazy(() => UsersCreateOrConnectWithoutStoreRefreshTokenInputSchema)
        .optional(),
      create: z
        .union([
          z.lazy(() => UsersCreateWithoutStoreRefreshTokenInputSchema),
          z.lazy(() => UsersUncheckedCreateWithoutStoreRefreshTokenInputSchema),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => UsersUpdateToOneWithWhereWithoutStoreRefreshTokenInputSchema,
          ),
          z.lazy(() => UsersUpdateWithoutStoreRefreshTokenInputSchema),
          z.lazy(() => UsersUncheckedUpdateWithoutStoreRefreshTokenInputSchema),
        ])
        .optional(),
      upsert: z
        .lazy(() => UsersUpsertWithoutStoreRefreshTokenInputSchema)
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
    .strict();

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
    .strict();

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

export const StoreRefreshTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenCreateWithoutUserInput>
  = z
    .object({
      create_date: z.coerce.date().optional(),
      id: z.string().uuid().optional(),
      refresh_token: z.string(),
    })
    .strict();

export const StoreRefreshTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedCreateWithoutUserInput>
  = z
    .object({
      create_date: z.coerce.date().optional(),
      id: z.string().uuid().optional(),
      refresh_token: z.string(),
    })
    .strict();

export const StoreRefreshTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenCreateOrConnectWithoutUserInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => StoreRefreshTokenCreateWithoutUserInputSchema),
        z.lazy(() => StoreRefreshTokenUncheckedCreateWithoutUserInputSchema),
      ]),
      where: z.lazy(() => StoreRefreshTokenWhereUniqueInputSchema),
    })
    .strict();

export const StoreRefreshTokenUpsertWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenUpsertWithoutUserInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => StoreRefreshTokenCreateWithoutUserInputSchema),
        z.lazy(() => StoreRefreshTokenUncheckedCreateWithoutUserInputSchema),
      ]),
      update: z.union([
        z.lazy(() => StoreRefreshTokenUpdateWithoutUserInputSchema),
        z.lazy(() => StoreRefreshTokenUncheckedUpdateWithoutUserInputSchema),
      ]),
      where: z.lazy(() => StoreRefreshTokenWhereInputSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateToOneWithWhereWithoutUserInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => StoreRefreshTokenUpdateWithoutUserInputSchema),
        z.lazy(() => StoreRefreshTokenUncheckedUpdateWithoutUserInputSchema),
      ]),
      where: z.lazy(() => StoreRefreshTokenWhereInputSchema).optional(),
    })
    .strict();

export const StoreRefreshTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateWithoutUserInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StoreRefreshTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StoreRefreshTokenUncheckedUpdateWithoutUserInput>
  = z
    .object({
      create_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UsersCreateWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersCreateWithoutStoreRefreshTokenInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      career: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      email: z.string().optional().nullable(),
      first_name: z.string(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      last_name: z.string(),
      password: z.string(),
      phone_number: z.string().optional().nullable(),
      role: z.lazy(() => RoleUsersSchema).optional(),
      status: z.lazy(() => StatusUserSchema).optional(),
      update_date: z.coerce.date().optional().nullable(),
      username: z.string(),
    })
    .strict();

export const UsersUncheckedCreateWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutStoreRefreshTokenInput>
  = z
    .object({
      address: z.string().optional().nullable(),
      career: z.string().optional().nullable(),
      create_date: z.coerce.date().optional().nullable(),
      delete_date: z.coerce.date().optional().nullable(),
      email: z.string().optional().nullable(),
      first_name: z.string(),
      id: z.string().uuid().optional(),
      id_card: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      last_name: z.string(),
      password: z.string(),
      phone_number: z.string().optional().nullable(),
      role: z.lazy(() => RoleUsersSchema).optional(),
      status: z.lazy(() => StatusUserSchema).optional(),
      update_date: z.coerce.date().optional().nullable(),
      username: z.string(),
    })
    .strict();

export const UsersCreateOrConnectWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutStoreRefreshTokenInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => UsersCreateWithoutStoreRefreshTokenInputSchema),
        z.lazy(() => UsersUncheckedCreateWithoutStoreRefreshTokenInputSchema),
      ]),
      where: z.lazy(() => UsersWhereUniqueInputSchema),
    })
    .strict();

export const UsersUpsertWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersUpsertWithoutStoreRefreshTokenInput>
  = z
    .object({
      create: z.union([
        z.lazy(() => UsersCreateWithoutStoreRefreshTokenInputSchema),
        z.lazy(() => UsersUncheckedCreateWithoutStoreRefreshTokenInputSchema),
      ]),
      update: z.union([
        z.lazy(() => UsersUpdateWithoutStoreRefreshTokenInputSchema),
        z.lazy(() => UsersUncheckedUpdateWithoutStoreRefreshTokenInputSchema),
      ]),
      where: z.lazy(() => UsersWhereInputSchema).optional(),
    })
    .strict();

export const UsersUpdateToOneWithWhereWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutStoreRefreshTokenInput>
  = z
    .object({
      data: z.union([
        z.lazy(() => UsersUpdateWithoutStoreRefreshTokenInputSchema),
        z.lazy(() => UsersUncheckedUpdateWithoutStoreRefreshTokenInputSchema),
      ]),
      where: z.lazy(() => UsersWhereInputSchema).optional(),
    })
    .strict();

export const UsersUpdateWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersUpdateWithoutStoreRefreshTokenInput>
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
    .strict();

export const UsersUncheckedUpdateWithoutStoreRefreshTokenInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutStoreRefreshTokenInput>
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
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UsersFindFirstArgsSchema: z.ZodType<Prisma.UsersFindFirstArgs> = z
  .object({
    cursor: UsersWhereUniqueInputSchema.optional(),
    distinct: z
      .union([UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array()])
      .optional(),
    include: UsersIncludeSchema.optional(),
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
  .strict();

export const UsersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersFindFirstOrThrowArgs>
  = z
    .object({
      cursor: UsersWhereUniqueInputSchema.optional(),
      distinct: z
        .union([UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array()])
        .optional(),
      include: UsersIncludeSchema.optional(),
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
    .strict();

export const UsersFindManyArgsSchema: z.ZodType<Prisma.UsersFindManyArgs> = z
  .object({
    cursor: UsersWhereUniqueInputSchema.optional(),
    distinct: z
      .union([UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array()])
      .optional(),
    include: UsersIncludeSchema.optional(),
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
  .strict();

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
  .strict();

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
  .strict();

export const UsersFindUniqueArgsSchema: z.ZodType<Prisma.UsersFindUniqueArgs>
  = z
    .object({
      include: UsersIncludeSchema.optional(),
      select: UsersSelectSchema.optional(),
      where: UsersWhereUniqueInputSchema,
    })
    .strict();

export const UsersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersFindUniqueOrThrowArgs>
  = z
    .object({
      include: UsersIncludeSchema.optional(),
      select: UsersSelectSchema.optional(),
      where: UsersWhereUniqueInputSchema,
    })
    .strict();

export const StoreRefreshTokenFindFirstArgsSchema: z.ZodType<Prisma.StoreRefreshTokenFindFirstArgs>
  = z
    .object({
      cursor: StoreRefreshTokenWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          StoreRefreshTokenScalarFieldEnumSchema,
          StoreRefreshTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: StoreRefreshTokenIncludeSchema.optional(),
      orderBy: z
        .union([
          StoreRefreshTokenOrderByWithRelationInputSchema.array(),
          StoreRefreshTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StoreRefreshTokenFindFirstOrThrowArgs>
  = z
    .object({
      cursor: StoreRefreshTokenWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          StoreRefreshTokenScalarFieldEnumSchema,
          StoreRefreshTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: StoreRefreshTokenIncludeSchema.optional(),
      orderBy: z
        .union([
          StoreRefreshTokenOrderByWithRelationInputSchema.array(),
          StoreRefreshTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenFindManyArgsSchema: z.ZodType<Prisma.StoreRefreshTokenFindManyArgs>
  = z
    .object({
      cursor: StoreRefreshTokenWhereUniqueInputSchema.optional(),
      distinct: z
        .union([
          StoreRefreshTokenScalarFieldEnumSchema,
          StoreRefreshTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
      include: StoreRefreshTokenIncludeSchema.optional(),
      orderBy: z
        .union([
          StoreRefreshTokenOrderByWithRelationInputSchema.array(),
          StoreRefreshTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenAggregateArgsSchema: z.ZodType<Prisma.StoreRefreshTokenAggregateArgs>
  = z
    .object({
      cursor: StoreRefreshTokenWhereUniqueInputSchema.optional(),
      orderBy: z
        .union([
          StoreRefreshTokenOrderByWithRelationInputSchema.array(),
          StoreRefreshTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenGroupByArgsSchema: z.ZodType<Prisma.StoreRefreshTokenGroupByArgs>
  = z
    .object({
      by: StoreRefreshTokenScalarFieldEnumSchema.array(),
      having: StoreRefreshTokenScalarWhereWithAggregatesInputSchema.optional(),
      orderBy: z
        .union([
          StoreRefreshTokenOrderByWithAggregationInputSchema.array(),
          StoreRefreshTokenOrderByWithAggregationInputSchema,
        ])
        .optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenFindUniqueArgsSchema: z.ZodType<Prisma.StoreRefreshTokenFindUniqueArgs>
  = z
    .object({
      include: StoreRefreshTokenIncludeSchema.optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      where: StoreRefreshTokenWhereUniqueInputSchema,
    })
    .strict();

export const StoreRefreshTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StoreRefreshTokenFindUniqueOrThrowArgs>
  = z
    .object({
      include: StoreRefreshTokenIncludeSchema.optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      where: StoreRefreshTokenWhereUniqueInputSchema,
    })
    .strict();

export const UsersCreateArgsSchema: z.ZodType<Prisma.UsersCreateArgs> = z
  .object({
    data: z.union([UsersCreateInputSchema, UsersUncheckedCreateInputSchema]),
    include: UsersIncludeSchema.optional(),
    select: UsersSelectSchema.optional(),
  })
  .strict();

export const UsersUpsertArgsSchema: z.ZodType<Prisma.UsersUpsertArgs> = z
  .object({
    create: z.union([UsersCreateInputSchema, UsersUncheckedCreateInputSchema]),
    include: UsersIncludeSchema.optional(),
    select: UsersSelectSchema.optional(),
    update: z.union([UsersUpdateInputSchema, UsersUncheckedUpdateInputSchema]),
    where: UsersWhereUniqueInputSchema,
  })
  .strict();

export const UsersCreateManyArgsSchema: z.ZodType<Prisma.UsersCreateManyArgs>
  = z
    .object({
      data: z.union([
        UsersCreateManyInputSchema,
        UsersCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UsersCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsersCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        UsersCreateManyInputSchema,
        UsersCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UsersDeleteArgsSchema: z.ZodType<Prisma.UsersDeleteArgs> = z
  .object({
    include: UsersIncludeSchema.optional(),
    select: UsersSelectSchema.optional(),
    where: UsersWhereUniqueInputSchema,
  })
  .strict();

export const UsersUpdateArgsSchema: z.ZodType<Prisma.UsersUpdateArgs> = z
  .object({
    data: z.union([UsersUpdateInputSchema, UsersUncheckedUpdateInputSchema]),
    include: UsersIncludeSchema.optional(),
    select: UsersSelectSchema.optional(),
    where: UsersWhereUniqueInputSchema,
  })
  .strict();

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
    .strict();

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
    .strict();

export const UsersDeleteManyArgsSchema: z.ZodType<Prisma.UsersDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: UsersWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenCreateArgsSchema: z.ZodType<Prisma.StoreRefreshTokenCreateArgs>
  = z
    .object({
      data: z.union([
        StoreRefreshTokenCreateInputSchema,
        StoreRefreshTokenUncheckedCreateInputSchema,
      ]),
      include: StoreRefreshTokenIncludeSchema.optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenUpsertArgsSchema: z.ZodType<Prisma.StoreRefreshTokenUpsertArgs>
  = z
    .object({
      create: z.union([
        StoreRefreshTokenCreateInputSchema,
        StoreRefreshTokenUncheckedCreateInputSchema,
      ]),
      include: StoreRefreshTokenIncludeSchema.optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      update: z.union([
        StoreRefreshTokenUpdateInputSchema,
        StoreRefreshTokenUncheckedUpdateInputSchema,
      ]),
      where: StoreRefreshTokenWhereUniqueInputSchema,
    })
    .strict();

export const StoreRefreshTokenCreateManyArgsSchema: z.ZodType<Prisma.StoreRefreshTokenCreateManyArgs>
  = z
    .object({
      data: z.union([
        StoreRefreshTokenCreateManyInputSchema,
        StoreRefreshTokenCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StoreRefreshTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StoreRefreshTokenCreateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        StoreRefreshTokenCreateManyInputSchema,
        StoreRefreshTokenCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StoreRefreshTokenDeleteArgsSchema: z.ZodType<Prisma.StoreRefreshTokenDeleteArgs>
  = z
    .object({
      include: StoreRefreshTokenIncludeSchema.optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      where: StoreRefreshTokenWhereUniqueInputSchema,
    })
    .strict();

export const StoreRefreshTokenUpdateArgsSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateArgs>
  = z
    .object({
      data: z.union([
        StoreRefreshTokenUpdateInputSchema,
        StoreRefreshTokenUncheckedUpdateInputSchema,
      ]),
      include: StoreRefreshTokenIncludeSchema.optional(),
      select: StoreRefreshTokenSelectSchema.optional(),
      where: StoreRefreshTokenWhereUniqueInputSchema,
    })
    .strict();

export const StoreRefreshTokenUpdateManyArgsSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateManyArgs>
  = z
    .object({
      data: z.union([
        StoreRefreshTokenUpdateManyMutationInputSchema,
        StoreRefreshTokenUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StoreRefreshTokenUpdateManyAndReturnArgs>
  = z
    .object({
      data: z.union([
        StoreRefreshTokenUpdateManyMutationInputSchema,
        StoreRefreshTokenUncheckedUpdateManyInputSchema,
      ]),
      limit: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();

export const StoreRefreshTokenDeleteManyArgsSchema: z.ZodType<Prisma.StoreRefreshTokenDeleteManyArgs>
  = z
    .object({
      limit: z.number().optional(),
      where: StoreRefreshTokenWhereInputSchema.optional(),
    })
    .strict();
