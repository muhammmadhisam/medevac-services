import { Layer, ManagedRuntime } from "effect";

import { DatabaseLayer } from "../databases/index.js";
import {
  JoinerRepositoryContext,
  MissionsRepositoryContext,
  SubMissionsRepositoryContext,
  SubMissionTagRepositoryContext,
} from "../repository/index.js";
import {
  MissionServiceContext,
  SubMissionServiceContext,
  SubMissionTagServiceContext,
} from "../services/index.js";
import { JoinerServiceContext } from "../services/joiner/joiner.service.js";
import { JwtServiceContext } from "../services/jwt/jwt.service.js";

const PrismaClientLive = DatabaseLayer.Live;
const JwtServiceLive = JwtServiceContext.Live;
const MissionServiceLive = MissionServiceContext.Live.pipe(
  Layer.provide(MissionsRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);
const SubMissionServiceLive = SubMissionServiceContext.Live.pipe(
  Layer.provide(SubMissionsRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);
const JoinerServiceLive = JoinerServiceContext.Live.pipe(
  Layer.provide(JoinerRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);
const SubMissionTagServiceLive = SubMissionTagServiceContext.Live.pipe(
  Layer.provide(SubMissionTagRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);
export const ServicesLive = Layer.mergeAll(
  JwtServiceLive,
  PrismaClientLive,
  MissionServiceLive,
  SubMissionServiceLive,
  SubMissionTagServiceLive,
  JoinerServiceLive,
);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
