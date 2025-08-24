import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPromise from 'eslint-plugin-promise';
import pluginSonarjs from 'eslint-plugin-sonarjs';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      'promise': pluginPromise,
      'sonarjs': pluginSonarjs,
      '@stylistic': stylistic,
      'js': pluginJs,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Disallow the use of `var` (use `let` or `const`)
      'no-var': 'error',
      // Enforce the use of `const` for variables that are never reassigned
      'prefer-const': 'error',
      // Disallow the use of variables before they are defined
      'no-use-before-define': 'error',
      // Enforce camelCase style for variable and function names
      'camelcase': 'error',
      // Disallow unreachable code after `return`, `throw`, `continue`, or `break` statements
      'no-unreachable': 'error',
      // Disallow unnecessary semicolons
      'no-extra-semi': 'error',
      // Disallow duplicate keys in object literals
      'no-dupe-keys': 'error',
      // Disallow redeclaration of variables (can't declare variable with the same name twice)
      'no-redeclare': 'error',
      // Disallow duplicate arguments in function definitions
      'no-dupe-args': 'error',
      // Disallow the use of `debugger`
      'no-debugger': 'error',
      // Disallow duplicate imports
      'no-duplicate-imports': 'error',
      // Disallow duplicate case labels in switch statements
      'no-duplicate-case': 'error',
      // Disallow functions inside loops (to avoid unexpected behavior)
      'no-loop-func': 'error',
      // Warn when `console` is used, but allow `console.warn`, `console.error`, `console.info`
      'no-console': [1, { 'allow': ['warn', 'error', 'info'] }],
      // Disallow the use of `undefined` (use `void 0` or `typeof x === 'undefined'` instead)
      'no-undefined': 'error',
      // Disallow nested ternary operators for readability
      'no-nested-ternary': 'error',
      // Enforce a maximum number of empty lines (no more than 1)
      '@stylistic/no-multiple-empty-lines': 'error',
      // Enforce spaces inside parentheses
      '@stylistic/space-in-parens': 'error',
      // This rule enforces a consistent indentation style of 2
      '@stylistic/indent': ['error', 2],
      // This rule requires the use of single quotes wherever possible
      '@stylistic/quotes': ['error', 'single'],
      // Requires semicolons at the end of statements
      '@stylistic/semi': ['error', 'always'],
      // Prefer `await` over `.then()` for promises
      'promise/prefer-await-to-then': 'error',
      // Disallow constant conditions (e.g., `if (true)` or `while (false)`)
      'no-constant-condition': 'error',
      // Ensure the correctness of `typeof` operator usage
      'valid-typeof': 'error',
      // Disallow duplicate strings (to avoid redundancy)
      'sonarjs/no-duplicate-string': 'error',
      // Disallow small switch statements (if case count is low, use if-else)
      'sonarjs/no-small-switch': 'error',
      // Enforce a maximum depth of 4 levels for nested blocks
      'max-depth': ['error', 4],
      // Disallow magic numbers (e.g., hardcoded numbers in the code), enforce `const` for constants
      'no-magic-numbers': [
        'error',
        {
          'ignore': [-1, 0, 1, 100],
          'ignoreArrayIndexes': true, // Allow numbers as array indexes
          'enforceConst': true // Enforce using constants instead of magic numbers
        }
      ],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: false,
        allowTypedFunctionExpressions: false,
        allowHigherOrderFunctions: false,
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: false }],
      '@typescript-eslint/strict-boolean-expressions': 'error'
    },
  }
]);
