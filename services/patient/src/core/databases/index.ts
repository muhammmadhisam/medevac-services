import { PrismaClient } from "@prisma/client";
import { Context, Layer } from "effect";

const prismaClient = new PrismaClient({ log: ["error", "info", "warn"] });
prismaClient
  .$connect()
  .then(() => console.log("connection database  success"))
  .catch((error) => {
    console.log("connection database   fail");
    console.error({ error });
    process.exit(0);
  });
export class DatabaseLayer extends Context.Tag("database-layer-context")<
  DatabaseLayer,
  PrismaClient
>() {
  static Live = Layer.succeed(this, prismaClient);
}

export const DatabasePrimaLive = Layer.succeed(DatabaseLayer, prismaClient);
