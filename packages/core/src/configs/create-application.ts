import type { TypeAppBindings } from "../types/global/application-binding";
import { Hono } from "hono";

export const createApplication = () => new Hono<TypeAppBindings>();

export type TypeApplication = ReturnType<typeof createApplication>;
