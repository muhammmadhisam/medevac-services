import { Layer, ManagedRuntime } from "effect";
import { DatabaseLayer } from "../databases/index.js";
import { UsersRepositoryContext } from "../repository/index.js";
import { AuthServiceContext } from "../services/auth/index.js";
import { JwtServiceContext } from "../services/jwt/jwt.service.js";

const PrismaClientLive = DatabaseLayer.Live;
const JwtServiceLive = JwtServiceContext.Live;
const AuthServiceLive = AuthServiceContext.Live.pipe(
  Layer.provide(UsersRepositoryContext.Live),
  Layer.provide(JwtServiceLive),
  Layer.provide(PrismaClientLive),
);
export const ServicesLive = Layer.mergeAll(AuthServiceLive, JwtServiceLive);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
