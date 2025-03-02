import type { Options } from "tsup";

export default {
  clean: true,
  dts: true,
  entry: ["./src/index.ts"],
  format: ["cjs", "esm", "iife"],
  minify: false, // ปิด minification
  sourcemap: false, // ปิดการสร้าง source map
  splitting: false, // ปิดการแบ่งไฟล์
  treeshake: true,
} satisfies Options;
