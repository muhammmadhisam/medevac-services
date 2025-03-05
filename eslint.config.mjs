import antfu from "@antfu/eslint-config";
import perfectionist from "eslint-plugin-perfectionist";

export default antfu({
  ignores: ["./.husky"],
  plugins: [perfectionist.configs["recommended-alphabetical"]],
  rules: {
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "jsonc/sort-keys": "off",
    "no-console": "off",
    "no-redeclare": "off",
    "no-use-before-define": "off",
    "node/prefer-global/process": "off",
    "perfectionist/sort-objects": "error",
    "ts/consistent-type-definitions": "off",
    "unicorn/throw-new-error": "off",
  },
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  typescript: true,
});
