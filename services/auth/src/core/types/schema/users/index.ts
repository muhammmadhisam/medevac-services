import { PaginationSchema } from "@/core/types";

import { z } from "zod";
import {
  UsersCreateInputSchema,
  UsersOrderByWithAggregationInputSchema,
  UsersSchema,
  UsersUpdateInputSchema,
  UsersWhereInputSchema,
} from "../prisma";

export const UserItemSchema = UsersSchema.omit({ delete_date: true });
export const UserCreateSchema = UsersCreateInputSchema;
export const UserUpdateSchema = UsersUpdateInputSchema;
export const UserGetOneParamSchema = UsersWhereInputSchema;
export const UserGetAllParamSchema = z.object({
  orderBy: UsersOrderByWithAggregationInputSchema,
  pagination: PaginationSchema,
  where: UserGetOneParamSchema,
});
export type TypeUserCreate = Omit<z.infer<typeof UserCreateSchema>, "id">;
export type TypeUserUpdate = z.infer<typeof UserUpdateSchema>;
export type TypeReturnItem = z.infer<typeof UserItemSchema>;
export type TypeGetAllParam = z.infer<typeof UserGetAllParamSchema>;
export type TypeGetOneParam = z.infer<typeof UserGetOneParamSchema>;
