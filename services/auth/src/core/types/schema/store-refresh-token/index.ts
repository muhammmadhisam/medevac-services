import { PaginationSchema } from "@/core/types";

import {
  StoreRefreshTokenCreateInputSchema,
  StoreRefreshTokenOrderByWithAggregationInputSchema,
  StoreRefreshTokenSchema,
  StoreRefreshTokenUpdateInputSchema,
  StoreRefreshTokenWhereInputSchema,
} from "@schema/index";
import { z } from "zod";

export const StoreRefreshTokenItemSchema = StoreRefreshTokenSchema;
export const StoreRefreshTokenCreateSchema = StoreRefreshTokenCreateInputSchema;
export const StoreRefreshTokenUpdateSchema = StoreRefreshTokenUpdateInputSchema;
export const StoreRefreshTokenGetOneParamSchema
  = StoreRefreshTokenWhereInputSchema;
export const StoreRefreshTokenGetAllParamSchema = z.object({
  orderBy: StoreRefreshTokenOrderByWithAggregationInputSchema,
  pagination: PaginationSchema,
  where: StoreRefreshTokenGetOneParamSchema,
});
export type TypeStoreRefreshTokenCreate = z.infer<
  typeof StoreRefreshTokenCreateSchema
>;
export type TypeStoreRefreshTokenUpdate = z.infer<
  typeof StoreRefreshTokenUpdateSchema
>;
export type TypeReturnItem = z.infer<typeof StoreRefreshTokenItemSchema>;
export type TypeGetAllParam = z.infer<
  typeof StoreRefreshTokenGetAllParamSchema
>;
export type TypeGetOneParam = z.infer<
  typeof StoreRefreshTokenGetOneParamSchema
>;
