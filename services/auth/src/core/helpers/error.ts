import type {
  ErrorMsg,
  TypeFailResponse,
  TypeMetaDataResponse,
} from "@/core/types";
import type { ResponseCode } from "../types/global/application-statust-cose";

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
      status?: ResponseCode,
      meta_data?: TypeMetaDataResponse,
    ) => {
      console.log({ error, message });
      return new Self({ error, message, meta_data, status: status || 500 });
    };
}
