import type { TypeApplication } from "@/core/configs/create-application.js";
import { authorizationMiddleware } from "@/applications/middleware";
import { ServicesRuntime } from "@/core/runtime";
import { JoinerServiceContext } from "@/core/services/joiner/joiner.service";
import {
  FailResponseSchema,
  JoinerMissionId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { JoinerItemSchema } from "@/core/types/schema/joiner";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(JoinerItemSchema);

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
  app.delete("/un-join-mission", authorizationMiddleware, Docs, async (c) => {
    const user = c.get("user");
    if (!user)
      return c.json({ data: "unauthorization" }, { status: 401 });
    const program = JoinerServiceContext.pipe(
      Effect.let("service", service => service),
      Effect.bind("data", ({ service }) =>
        service.getOne({
          Mission: { Joiners: { some: { user_id: user.id } } },
        })),
      Effect.flatMap(({ data, service }) =>
        service.remove(JoinerMissionId(data.id)),
      ),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "ออกจากการร่วมภารกิจสำเร็จ" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
