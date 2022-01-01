// eslint-disable-next-line @typescript-eslint/no-var-requires
const noImports = require("./.eslintrc-import");

module.exports = {
  extends: [
    "airbnb",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "prettier/react",
  ],

  rules: {
    "no-console": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-filename-extension": 0,
    "react/require-default-props": 0,
    "no-underscore-dangle": 0,
    "prettier/prettier": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "@typescript-eslint/no-empty-function": 0,
    "no-plusplus": 0,
    "no-shadow": 0,
    "no-restricted-syntax": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/object-curly-spacing": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unused-vars": [2, { vars: "all", args: "none" }],
    ...noImports,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
};
