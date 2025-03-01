import { createErrorFactoryResponseError } from "@/core/helpers/index.js"
import { Data } from "effect"
import { z } from "zod"

export * from "./pagination.js"
export * from "./param.js"
export const MetaDataResponseSchema = z.object({
  cache_hit: z.boolean().optional(),
  code: z.string().optional(),
  data: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.unknown()]),
    )
    .optional(),
  limit: z.number().optional(),
  message: z.string().optional(),
  page: z.number().optional(),
  total: z.number().optional(),
})

export type TypeMetaDataResponse = z.infer<typeof MetaDataResponseSchema>

export function SuccessResponseSchema<T extends z.ZodTypeAny>(data: T) {
  return z.object({
    data: z.union([data, z.array(data)]),
    message: z.string().optional(),
    meta_data: MetaDataResponseSchema.omit({
      cache_hit: true,
      code: true,
      data: true,
      message: true,
    }).optional(),
  })
}

export type TypeSuccessResponse = z.infer<
  ReturnType<typeof SuccessResponseSchema>
>

export const FailResponseSchema = z.object({
  error: z.unknown().nullable(),
  message: z.string().optional(),
  meta_data: MetaDataResponseSchema.omit({
    cache_hit: true,
    code: true,
    data: true,
    message: true,
  }).optional(),
  status: z.number().default(500),
})

export type TypeFailResponse = z.infer<typeof FailResponseSchema>

export class TypeFailResponseError extends Data.TaggedError(
  "FailResponseError",
)<TypeFailResponse> {
  static new = createErrorFactoryResponseError(this)
}

export type TypeResponse = TypeSuccessResponse | TypeFailResponse
export type TypeGetAllData<T> = {
  total: number
  data: T[]
}
