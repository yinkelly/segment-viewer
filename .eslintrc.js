module.exports = {
  extends: [
    'eslint:all',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    'quotes': ['error', 'single'],
    'quote-props': ['warn', 'as-needed'],
    'indent': ['warn', 2],
    'semi': ['warn', 'never'],
    'sort-keys': 'off',
    'sort-imports': 'off',
    'no-new': 'off',
    'one-var': 'off',
    'padded-blocks': 'off',
    'dot-location': 'off',
    'dot-notation': 'off',
    'capitalized-comments': 'off',
    'multiline-comment-style': 'off',
    'object-curly-spacing': ["error", "always"],
    'vue/html-closing-bracket-newline': 'warn',
    'vue/html-closing-bracket-spacing': 'warn',
    'vue/prop-name-casing': 'warn',
    'vue/script-indent': 'warn',
    'vue/require-default-prop': 'off'
  }
}
