import type {
  ErrorMsg,
  TypeFailResponse,
  TypeMetaDataResponse,
} from "@/core/types";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function createErrorFactory<T>(Self: new (payload: ErrorMsg) => T) {
  return (message?: string) => (error?: unknown) => {
    console.log({ error, message });
    return new Self({ error, message });
  };
}

export function createErrorFactoryResponseError<T>(
  Self: new (payload: TypeFailResponse) => T,
) {
  return (message: string) =>
    (
      error?: unknown | null,
      status: ContentfulStatusCode = 500,
      meta_data?: TypeMetaDataResponse,
    ) => {
      console.log({ error, message });
      return new Self({ error, message, meta_data, status });
    };
}
