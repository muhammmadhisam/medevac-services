import { z } from "zod";
import { RoleUsersSchema } from "../schema/prisma";

export const SignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
  role: RoleUsersSchema,
  username: z.string(),
});
export type TypeSignUp = z.infer<typeof SignUpSchema>;
