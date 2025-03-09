import { Layer, ManagedRuntime } from "effect";
import { DatabaseLayer } from "../databases/index.js";
import {
  StoreRefreshTokensRepositoryContext,
  UsersRepositoryContext,
} from "../repository/index.js";
import { AuthServiceContext } from "../services/auth/index.js";
import { JwtServiceContext } from "../services/jwt/jwt.service.js";
import { StoreRefreshTokenServiceContext } from "../services/store-refresh-token/store-refresh-token.service.js";

const PrismaClientLive = DatabaseLayer.Live;
export const StoreRefrestTokenServiceLive
  = StoreRefreshTokenServiceContext.Live.pipe(
    Layer.provide(StoreRefreshTokensRepositoryContext.Live),
    Layer.provide(PrismaClientLive),
  );
const JwtServiceLive = JwtServiceContext.Live;
const AuthServiceLive = AuthServiceContext.Live.pipe(
  Layer.provide(UsersRepositoryContext.Live),
  Layer.provide(StoreRefrestTokenServiceLive),
  Layer.provide(JwtServiceLive),
  Layer.provide(PrismaClientLive),
);
export const ServicesLive = Layer.mergeAll(AuthServiceLive, JwtServiceLive);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
