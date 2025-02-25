import antfu from "@antfu/eslint-config"
import perfectionist from "eslint-plugin-perfectionist"

export default antfu({
  ignores: ["lib/**", ".github/**", "./.husky"],
  plugins: [perfectionist.configs["recommended-alphabetical"]],
  rules: {
    "no-console": "off",
    "perfectionist/sort-objects": "error",
    "ts/consistent-type-definitions": "off",
    "unicorn/throw-new-error": "off",
    "unused-imports/no-unused-imports": "error",
  },
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  typescript: true,
})
