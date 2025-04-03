import type { TypeApplication } from "@/core/configs/create-application.js";
import { ServicesRuntime } from "@/core/runtime";

import { SubMissionTagServiceContext } from "@/core/services";
import {
  FailResponseSchema,
  SubMissionId,
  SuccessResponseSchema,
} from "@/core/types/index.js";
import { SubMissionTagOptionalDefaultsSchema } from "@/core/types/schema/prisma";
import { Effect } from "effect";
import { describeRoute } from "hono-openapi";

import { resolver, validator } from "hono-openapi/zod";
import { z } from "zod";
import { authorizationMiddleware } from "../middleware";

const ResponseSchema = SuccessResponseSchema(
  SubMissionTagOptionalDefaultsSchema.omit({ delete_date: true }),
);
const RequestBody = validator(
  "json",
  SubMissionTagOptionalDefaultsSchema.omit({
    create_date: true,
    delete_date: true,
    id: true,
    sub_mission_id: true,
    update_date: true,
  }),
);
const RequestParam = validator(
  "param",
  z.object({
    sub_mission_id: z.string().transform(v => SubMissionId(v)),
  }),
);
const Docs = describeRoute({
  responses: {
    201: {
      content: {
        "application/json": {
          schema: resolver(ResponseSchema),
        },
      },
      description: "Create SubMissionTag",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(FailResponseSchema),
        },
      },
      description: "Create SubMissionTag Error",
    },
  },
  tags: ["SubMissionTag"],
});

export default (app: TypeApplication) =>
  app.post(
    "/",
    authorizationMiddleware,
    Docs,
    RequestParam,
    RequestBody,
    async (c) => {
      const data = c.req.valid("json");
      const param = c.req.valid("param");
      const program = SubMissionTagServiceContext.pipe(
        Effect.andThen(service =>
          service.create({
            ...data,
            SubMission: { connect: { id: param.sub_mission_id } },
          }),
        ),
        Effect.andThen(data =>
          ResponseSchema.parse({ data, message: "เพิ่มข้อมูลเรียบร้อย" }),
        ),
        Effect.andThen(data => c.json(data, 201)),
        Effect.catchAll(error =>
          Effect.succeed(c.json(error, { status: error.status })),
        ),
      );
      const result = await ServicesRuntime.runPromise(program);
      return result;
    },
  );
