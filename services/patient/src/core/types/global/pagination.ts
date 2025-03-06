import { z } from "zod";

function transformToNumber(i: unknown) {
  return (default_value: number) => {
    if (typeof i === "string")
      return Number.parseInt(i);
    if (typeof i === "number")
      return i;
    return default_value;
  };
}

export const PaginationSchema = z
  .object({
    limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform(v => transformToNumber(v)(10))
      .default("10"),
    page: z
      .union([z.string(), z.number()])
      .optional()
      .transform(v => transformToNumber(v)(0))
      .default("0"),
  })
  .refine(
    () => {
      // Example refinement logic if needed
      return true;
    },
    { message: "Invalid pagination data" },
  );

export type TypePagination = z.infer<typeof PaginationSchema>;
