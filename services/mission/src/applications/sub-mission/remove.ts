import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";
import { SubMissionServiceContext } from "@/core/services/sub-mission/sub-mission.service";
import {
  FailResponseSchema,
  MissionId,
  SubMissionId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { SubMissionSchema } from "@schema/index";
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
      description: "Remove SubMission by id",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Remove SubMission by id fail",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Remove SubMission by id fail",
    },
  },
  tags: ["SubMission"],
});

export default (app: TypeApplication) =>
  app.delete("/:id", authorizationMiddleware, Docs, RequestParam, async (c) => {
    const query = c.req.valid("param");
    const program = SubMissionServiceContext.pipe(
      Effect.andThen(service => service.remove(SubMissionId(query.id))),
      Effect.andThen(data =>
        ResponseSchema.parse({ data, message: "remove by id" }),
      ),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchAll(error =>
        Effect.succeed(c.json(error, { status: error.status as 500 })),
      ),
    );
    const result = await ServicesRuntime.runPromise(program);
    return result;
  });
