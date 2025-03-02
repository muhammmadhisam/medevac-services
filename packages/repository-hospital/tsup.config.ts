import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs"],
  minify: false, // ปิด minification
  sourcemap: false, // ปิดการสร้าง source map
  splitting: false, // ปิดการแบ่งไฟล์
  treeshake: true,
});
