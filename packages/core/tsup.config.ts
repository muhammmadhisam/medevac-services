import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["./src/**"],
  external: ["@node-rs/argon2"],
  format: ["cjs", "esm"],
  minify: false, // ปิด minification
  sourcemap: false, // ปิดการสร้าง source map
  splitting: false, // ปิดการแบ่งไฟล์
  treeshake: true,
})
