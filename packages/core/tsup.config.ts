import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["./src/index.ts", "./src/schema/**", "./src/types/errors/**"],
  esbuildOptions(options) {
    options.sourcemap = false;
    options.minify = false;
    options.treeShaking = false;
  },
  external: ["@node-rs/argon2"],
  format: ["cjs", "esm"],
  killSignal: "SIGKILL",
  minify: false, // ปิด minification
  sourcemap: false, // ปิดการสร้าง source map
  splitting: false, // ปิดการแบ่งไฟล์
  treeshake: false,
});
