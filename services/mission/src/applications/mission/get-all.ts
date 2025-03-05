import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { MissionServiceContext } from "@/core/services/mission/mission.service";
import {
  FailResponseSchema,
  PaginationSchema,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { MissionSchema } from "@schema/index";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";

const ResponseSchema = SuccessResponseSchema(
  MissionSchema.omit({ delete_date: true }).array(),
);

const RequestQuery = validator("query", PaginationSchema);
const Docs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Get all Mission",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get all Error",
    },
  },
  tags: ["Mission"],
});

export default (app: TypeApplication) =>
  app.get("/", Docs, RequestQuery, async (c) => {
    const query = c.req.valid("query");
    const program = MissionServiceContext.pipe(
      Effect.andThen((service) =>
        service.getAll({
          orderBy: { create_date: "desc" },
          pagination: { limit: query.limit, page: query.page * query.limit },
        }),
      ),
      Effect.andThen(({ data, total }) =>
        ResponseSchema.parse({
          data,
          message: "get data",
          meta_data: { total, ...query },
        }),
      ),
      Effect.andThen((data) => c.json(data, 200)),
      Effect.catchAll((error) =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
