import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: false, // ปิด minification
  sourcemap: false, // ปิดการสร้าง source map
  splitting: true, // ปิดการแบ่งไฟล์
  treeshake: true,
});
