// eslint-disable-next-line @typescript-eslint/no-var-requires
const noImports = require('./.eslintrc-import');

module.exports = {
  extends: [
    'airbnb',
    // 'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
  ],

  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/object-curly-spacing': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': 0,
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/no-empty-function': 0,
    ...noImports,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.js'),
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
