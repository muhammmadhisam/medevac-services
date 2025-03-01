import { z } from "zod"

export const SignInSchema = z.object({
  password: z.string(),
  username: z.string(),
})
export type TypeSignIn = z.infer<typeof SignInSchema>
