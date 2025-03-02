import { PaginationSchema } from "@/core/types"

import {
  UsersCreateInputSchema,
  UsersOrderByWithAggregationInputSchema,
  UsersSchema,
  UsersUpdateInputSchema,
  UsersWhereInputSchema,
} from "@medevac/schema-auth"
import { z } from "zod"

export const UserItemSchema = UsersSchema.omit({ delete_date: true })
export const UserCreateSchema = UsersCreateInputSchema
export const UserUpdateSchema = UsersUpdateInputSchema
export const UserGetOneParamSchema = UsersWhereInputSchema
export const UserGetAllParamSchema = z.object({
  orderBy: UsersOrderByWithAggregationInputSchema,
  pagination: PaginationSchema,
  where: UserGetOneParamSchema,
})
export type TypeUserCreate = z.infer<typeof UserCreateSchema>
export type TypeUserUpdate = z.infer<typeof UserUpdateSchema>
export type TypeReturnItem = z.infer<typeof UserItemSchema>
export type TypeGetAllParam = z.infer<typeof UserGetOneParamSchema>
export type TypeGetOneParam = z.infer<typeof UserGetAllParamSchema>
