import { UsersOptionalDefaultsSchema } from "@schema/index";
import { z } from "zod";
import { UsersId } from "../private/users";

export const UserJwtSchema = UsersOptionalDefaultsSchema.omit({
  create_date: true,
  delete_date: true,
  password: true,
  update_date: true,
  username: true,
})
  .required()
  .readonly();
export const JwtObjectSchema = z
  .object({
    exp: z.number().optional().default(3600),
    user: UserJwtSchema,
    user_id: z.string().transform(v => UsersId(v)),
  })
  .readonly();
export type TypeJwtObject = z.infer<typeof JwtObjectSchema>;
export type TypeUserJwt = z.infer<typeof UserJwtSchema>;

export const RefreshTokenObjectSchema = z
  .object({
    exp: z.number().optional().default(3600),
    user_id: z.string().transform(v => UsersId(v)),
  })
  .readonly();
export type TypeRefreshTokenObject = z.infer<typeof RefreshTokenObjectSchema>;
