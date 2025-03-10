import { Layer, ManagedRuntime } from "effect";

import { DatabaseLayer } from "../databases/index.js";
import {
  MissionsRepositoryContext,
  SubMissionsRepositoryContext,
} from "../repository/index.js";
import {
  MissionServiceContext,
  SubMissionServiceContext,
} from "../services/index.js";
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
export const ServicesLive = Layer.mergeAll(
  JwtServiceLive,
  PrismaClientLive,
  MissionServiceLive,
  SubMissionServiceLive,
);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
