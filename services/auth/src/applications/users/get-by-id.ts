import type { TypeApplication } from "@/core/configs/create-application.js";
import { DatabaseLayer } from "@/core/databases";
import { UsersRepositoryContext } from "@/core/repository";
import { ServicesRuntime } from "@/core/runtime";
import {
  FailResponseSchema,
  SuccessResponseSchema,
  UsersId,
} from "@/core/types/index.js";
import { UsersSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";

import { z } from "zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  UsersSchema.omit({ delete_date: true }),
);
const RequestParam = validator(
  "param",
  z.object({
    id: z.string().transform(v => UsersId(v)),
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
      description: "Get Users by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Users by id Notfound ",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get Users by id fail",
    },
  },
  tags: ["Users"],
});

export default (app: TypeApplication) =>
  app.get("/:id", Docs, RequestParam, authorizationMiddleware, async (c) => {
    const { id } = c.req.valid("param");
    const program = Effect.all([UsersRepositoryContext]).pipe(
      Effect.andThen(([r]) => r.getOne({ id })),
      Effect.andThen(d =>
        ResponseSchema.parse({ data: d, message: "สำเร็จ" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchTags({
        GetOneUsersError: () =>
          Effect.succeed(
            c.json({
              message: "เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง",
              status: 500,
            }),
          ),
        NoSuchElementException: () =>
          Effect.succeed(
            c.json({ message: "ไม่ผมข้อมูลผู้ใช้นี้", status: 404 }),
          ),
      }),
      Effect.provide(UsersRepositoryContext.Live),
      Effect.provide(DatabaseLayer.Live),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
