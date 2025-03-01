interface Env {}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      PORT: string
      DOMAIN_URL?: string
      DATABASE_URL?: string
      NODE_ENV: "development" | "production" | "test"
      LOG_LEVEL?: "trace" | "debug" | "info" | "warn" | "error" | "fatal"
      REDIS_URL: string
      REDIS_EXPIRE?: number
      SECRET_TOKEN: string
    }
  }
}

export {}
export type IEnv = Env
