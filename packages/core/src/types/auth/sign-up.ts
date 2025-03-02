import { z } from "zod";

export const SignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
  role: z.string(),
  username: z.string(),
});
export type TypeSignUp = z.infer<typeof SignUpSchema>;
