module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true,
        'browser': true,
        'jest/globals': true,
        'cypress/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
            'modules': true
        },
        'sourceType': 'module',
        'ecmaVersion': 12,
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    'rules': {
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
        'indent': [
            'error',
            2,
            { 'SwitchCase': 1 }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    }
}
