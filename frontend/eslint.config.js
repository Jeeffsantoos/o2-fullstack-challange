import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: { globals: globals.browser },
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			react: pluginReact,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			eqeqeq: 'warn',
			camelcase: 'warn',
			'no-unreachable': 'error',
			'no-unreachable-loop': 'error',
			'no-empty-function': 'error',
			'no-inline-comments': 'error',
			'no-nested-ternary': 'error',
			'no-unused-vars': 'warn',
			'prefer-const': ['warn', { ignoreReadBeforeAssign: true }],
			'max-params': ['warn', { max: 3 }],
			'no-else-return': 'warn',
			'no-empty': 'error',
		},
	},
]);
