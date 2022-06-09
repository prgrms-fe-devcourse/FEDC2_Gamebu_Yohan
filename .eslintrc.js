module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', 'jsx'] }],
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 0,
    'comma-dangle': 0,
    'no-unused-vars': 1,
    'import/no-unresolved': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'consistent-return': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
  },
};
