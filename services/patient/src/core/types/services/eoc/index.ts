import type { TypeFailResponse } from "@/core/types";
import type { Effect } from "effect";
import type { TypeEocTriageView } from "../../schema/eoc";

export type TypeEocService = {
  TriageView: (
    date: Date,
  ) => Effect.Effect<TypeEocTriageView, TypeFailResponse>;
};
