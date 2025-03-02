import type { TypeApplication } from "@medevac/core";
import {
  FailResponseSchema,
  SuccessResponseSchema,
  UserJwtSchema,
} from "@medevac/core";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { authorizationMiddleware } from "../middleware/authorization.js";

const ResponseSchema = SuccessResponseSchema(UserJwtSchema);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Get Me Success",
    },
    401: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Me Fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Me  Error",
    },
  },
  tags: ["Authorization"],
});

export default (app: TypeApplication) =>
  app.get("/me", Docs, authorizationMiddleware, c =>
    c.json(c.get("user"), { status: 200 }));
