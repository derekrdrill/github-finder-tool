import prettierConfig from '@vue/eslint-config-prettier';

const esLintConfig = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: ['stylelint-scss'],
  rules: {
    // Disables eslint throwing an error on script setup vue files
    'import/first': 'off',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};

export default [esLintConfig, prettierConfig];
