module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
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
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', 'jsx'] }],
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 0,
    'comma-dangle': 0,
    'no-unused-vars': 1,
    'import/no-unresolved': 0,
  },
};
