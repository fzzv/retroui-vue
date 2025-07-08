import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'import/first': 'off',
    'import/order': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 5 }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
})
