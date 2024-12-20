module.exports = {
  plugins: ['import', 'promise', '@typescript-eslint', 'prettier', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  extends: [
    'prettier',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'mocha/no-mocha-arrows': 'off',
    'no-return-await': 'off',
    'no-await-in-loop': 'off',
    'no-continue': 'off',
    'no-prototype-builtins': 'off',
    'import/no-cycle': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    'no-restricted-syntax': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // other selectors...
    ],
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'prettier/prettier': 'error',
    // React
    'react/jsx-filename-extension': 'off',
  },
};
