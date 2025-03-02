import { UsersOptionalDefaultsSchema } from "@medevac/schema-auth"
import { z } from "zod"

import { UsersId } from "../private/users.js"

export const UserJwtSchema = UsersOptionalDefaultsSchema.omit({
  create_date: true,
  delete_date: true,
  password: true,
  update_date: true,
  username: true,
})
  .required()
  .readonly()
export const JwtObjectSchema = z
  .object({
    exp: z.number().optional().default(3600),
    user: UserJwtSchema,
    user_id: z
      .union([z.string(), z.number()])
      .transform(v => (typeof v === "string" ? Number.parseInt(v) : v))
      .transform(v => UsersId(v)),
  })
  .readonly()
export type TypeJwtObject = z.infer<typeof JwtObjectSchema>
export type TypeUserJwt = z.infer<typeof UserJwtSchema>

export const RefreshTokenObjectSchema = z
  .object({
    exp: z.number().optional().default(3600),
    user_id: z.number().transform(v => UsersId(v)),
  })
  .readonly()
export type TypeRefreshTokenObject = z.infer<typeof RefreshTokenObjectSchema>
