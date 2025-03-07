import type { ContentfulStatusCode } from "hono/utils/http-status";

export type ResponseCode = ContentfulStatusCode;
export const ResponseCode = (status: number) => status as ResponseCode;
