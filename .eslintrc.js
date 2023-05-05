module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    "no-undef": "off",
    "semi": 1,
    "quotes": [1, "double"],
  }
}
