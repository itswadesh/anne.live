module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],

  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'warn',
      { endOfLine: 'auto' },
      { usePrettierrc: true },
    ],
    'vue/no-mutating-props': 'off', // Remove in future
    'vue/require-prop-type-constructor': 'off', // Remove in future
    'vue/no-use-v-if-with-v-for': 'off', // Remove in future
    'nuxt/no-env-in-hooks': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-prototype-builtins': 'off',
    'no-proto': 'off',
    'array-callback-return': 'off',
    'node/handle-callback-err': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-v-html': 'off',
    'prefer-const': 'warn',
    'no-case-declarations': 'warn',
    'no-console': 'off',
    'vue/script-setup-uses-vars': 'off',
  },
}
