import { z } from "zod";

const ZEnv = z.object({
  DATABASE_URL: z.string(),
  DOMAIN_URL: z.string().optional(),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal"])
    .default("info"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform((v) => Number.parseInt(v)),
  REDIS_EXPIRE: z
    .string()
    .transform((v) => Number.parseInt(v))
    .optional(),
  REDIS_URL: z.string().optional(),
  SECRET_TOKEN: z.string(),
});
export type TEnv = z.infer<typeof ZEnv>;
export const GetEnv = () => ZEnv.parse(process.env);
