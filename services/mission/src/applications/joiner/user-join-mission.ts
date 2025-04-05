import type { TypeApplication } from "@/core/configs/create-application.js";
import { authorizationMiddleware } from "@/applications/middleware";
import { ServicesRuntime } from "@/core/runtime";
import { JoinerServiceContext } from "@/core/services/joiner/joiner.service";
import {
  FailResponseSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { JoinerItemSchema } from "@/core/types/schema/joiner";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";

import { z } from "zod";

const ResponseSchema = SuccessResponseSchema(JoinerItemSchema);
const RequestParam = validator("param", z.object({ mission_id: z.string() }));
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Join Mission Success",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Join Mission Error",
    },
  },
  tags: ["Join"],
});

export default (app: TypeApplication) =>
  app.patch(
    "/join-mission",
    authorizationMiddleware,
    Docs,
    RequestParam,
    async (c) => {
      const { mission_id } = c.req.valid("param");
      const user = c.get("user");
      if (!user)
        return c.json({ data: "unauthorization" }, { status: 401 });
      const program = JoinerServiceContext.pipe(
        Effect.andThen(service =>
          service.create({
            Mission: { connect: { id: mission_id } },
            user_id: user.id,
          }),
        ),
        Effect.andThen(data =>
          ResponseSchema.parse({ data, message: "เข้าร่วมภารกิจสำเร็จ" }),
        ),
        Effect.andThen(data => c.json(data, 200)),
        Effect.catchAll(error =>
          Effect.succeed(c.json(error, { status: error.status })),
        ),
      );
      const result = await ServicesRuntime.runPromise(program);
      return result;
    },
  );
