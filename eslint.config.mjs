// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'

export default withNuxt(
  [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...vue.configs['flat/recommended'],
  ],
  {
    plugins: { prettier },
    rules: { 'prettier/prettier': 'error' },
  },
)
