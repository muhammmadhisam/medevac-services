import type { TypeUserJwt } from "../jwt/generate.js"

export type TypeAppBindings = {
  Variables: {
    user: TypeUserJwt | undefined
  }
}
export type TypeVariablesApplication = keyof TypeAppBindings["Variables"]
