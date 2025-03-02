import type { StatusCode } from "hono/utils/http-status";

export type ResponseCode = StatusCode;
export const ResponseCode = (status: number) => status as ResponseCode;
