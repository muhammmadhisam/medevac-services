import { Layer, ManagedRuntime } from "effect";

import { DatabaseLayer } from "../databases/index.js";
import { VehiclesRepositoryContext } from "../repository/index.js";
import { VehicleServiceContext } from "../services/index.js";
import { JwtServiceContext } from "../services/jwt/jwt.service.js";

const PrismaClientLive = DatabaseLayer.Live;
const JwtServiceLive = JwtServiceContext.Live;
const VehicleServiceLive = VehicleServiceContext.Live.pipe(
  Layer.provide(VehiclesRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);

export const ServicesLive = Layer.mergeAll(
  JwtServiceLive,
  PrismaClientLive,
  VehicleServiceLive,
);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
