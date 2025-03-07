import { Duration } from "effect";

export const TOKEN_ACCESS_TIME = Duration.toSeconds(Duration.hours(1));
export const TOKEN_REFRESH_TIME = Duration.toSeconds(Duration.minutes(10));
