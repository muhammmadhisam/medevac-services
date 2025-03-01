import { z } from "zod"
import { AccessToken } from "../private/access-token"
import { RefreshToken } from "../private/refresh-token"

export const TokenSchema = z
  .object({
    access_token: z.string().transform(v => AccessToken(v)),
    refresh_token: z.string().transform(v => RefreshToken(v)),
  })
  .readonly()

export type TypeToken = z.infer<typeof TokenSchema>
