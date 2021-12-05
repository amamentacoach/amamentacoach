module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './src'],
      },
      typescript: {},
    },
  },
  rules: {
    'global-require': 'off',
    'no-console': 'error',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': 'error',
    'import/no-unused-modules': [
      'error',
      {
        unusedExports: true,
        ignoreExports: ['src/**/*.d.ts'],
      },
    ],
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'require-await': 'off',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/require-await': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'type',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: 'styles',
            group: 'index',
            position: 'after',
          },
          {
            pattern: '*.svg',
            group: 'object',
            patternOptions: {
              dot: true,
              nocomment: true,
              matchBase: true,
            },
          },
          {
            pattern: '*.png',
            group: 'object',
            patternOptions: {
              dot: true,
              nocomment: true,
              matchBase: true,
            },
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
