import { z } from "zod"

export const ParamSchema = z.object({
  id: z.string().transform(v => Number.parseInt(v)),
})
