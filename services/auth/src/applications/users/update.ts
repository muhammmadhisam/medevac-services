import type { TypeApplication } from "@/core/configs/create-application.js";
import { DatabaseLayer } from "@/core/databases/index.js";
import { UsersRepositoryContext } from "@/core/repository/index.js";
import {
  FailResponseSchema,
  SuccessResponseSchema,
  UsersId,
} from "@/core/types/index.js";
import {
  UsersOptionalDefaultsSchema,
  UsersPartialSchema,
} from "@/core/types/schema/prisma/index.js";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  UsersOptionalDefaultsSchema.omit({ create_date: true, password: true }),
);
const RequestBody = validator(
  "json",
  UsersPartialSchema.omit({
    create_date: true,
    id: true,
    password: true,
    role: true,
    update_date: true,
    username: true,
  }),
);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Update Success",
    },
    401: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "SignIn Fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Update  Error",
    },
  },
  tags: ["Users"],
});

export default (app: TypeApplication) =>
  app.put("/update", Docs, RequestBody, authorizationMiddleware, async (c) => {
    const data = c.req.valid("json");
    const user = c.get("user");
    if (!user)
      return c.json({ data: "unauthorization" }, { status: 401 });
    const program = Effect.all([UsersRepositoryContext]).pipe(
      Effect.andThen(([r]) => r.update(UsersId(user.id), data)),
      Effect.andThen(d =>
        ResponseSchema.parse({ data: d, message: "แก้ไขข้อมูลสำเร็จ" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchTags({
        UpdateUsersError: () =>
          Effect.succeed(
            c.json({ message: "แก้ไขข้อมูลไม่สำเร็จ", status: 500 }),
          ),
      }),
      Effect.provide(UsersRepositoryContext.Live),
      Effect.provide(DatabaseLayer.Live),
    );
    const result = await Effect.runPromise(program);
    return result;
  });
