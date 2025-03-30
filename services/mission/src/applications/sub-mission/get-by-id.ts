import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { SubMissionServiceContext } from "@/core/services/sub-mission/sub-mission.service";
import {
  FailResponseSchema,
  MissionId,
  SubMissionId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { SubMissionSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  SubMissionSchema.omit({ delete_date: true }),
);
const RequestParam = validator(
  "param",
  z.object({
    id: z.string().transform(v => SubMissionId(v)),
    mission_id: z.string().transform(v => MissionId(v)),
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
      description: "Get SubMission by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get SubMission by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Get SubMission by id fail",
    },
  },
  tags: ["SubMission"],
});

export default (app: TypeApplication) =>
  app.get("/:id", authorizationMiddleware, Docs, RequestParam, async (c) => {
    const query = c.req.valid("param");
    const program = SubMissionServiceContext.pipe(
      Effect.andThen(service =>
        service.getOne({
          ...query,
        }),
      ),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "get data by id" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
