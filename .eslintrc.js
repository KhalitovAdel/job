module.exports = {
    root: true,
    extends: ['prettier'],
    plugins: ['@nrwl/nx', 'prettier', 'simple-import-sort', 'unused-imports', 'import'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            rules: {
                '@nrwl/nx/enforce-module-boundaries': [
                    'error',
                    {
                        enforceBuildableLibDependency: true,
                        allow: [],
                        depConstraints: [
                            {
                                sourceTag: '*',
                                onlyDependOnLibsWithTags: ['*'],
                            },
                        ],
                    },
                ],
                'no-console': 1,
                'unused-imports/no-unused-imports': 1,
                'no-unused-vars': [
                    'error',
                    {
                        args: 'all',
                        ignoreRestSiblings: true,
                        caughtErrors: 'all',
                        varsIgnorePattern: '^_+$',
                        argsIgnorePattern: '^_+$',
                    },
                ],
                'no-dupe-keys': 1,
                'no-use-before-define': 1,
                'import/newline-after-import': 1,
                'prettier/prettier': ['error', { singleQuote: true, printWidth: 120, tabWidth: 4 }],
                'lines-between-class-members': 1,
                'padding-line-between-statements': [
                    2,
                    { blankLine: 'always', prev: 'function', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'function' },
                    { blankLine: 'always', prev: 'export', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'export' },
                    { blankLine: 'always', prev: 'multiline-const', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'return' },
                ],
                'simple-import-sort/imports': 1,
                '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true, fixToUnknown: true }],
                '@typescript-eslint/no-var-requires': 0,
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:@nrwl/nx/typescript'],
            rules: {},
        },
        {
            files: ['*.js', '*.jsx'],
            extends: ['plugin:@nrwl/nx/javascript'],
            rules: {},
        },
    ],
};
