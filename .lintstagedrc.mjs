const config = {
  "*.{js,ts,jsx,tsx,json}": ["prettier --plugin-search-dir . --write ."],
  "*.{js,ts,jsx,tsx}": "eslint --fix .",
}

export default config
