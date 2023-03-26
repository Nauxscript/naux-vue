import typescript from '@rollup/plugin-typescript'

export default {
  input: './packages/vue/src/index.ts',
  output: [
    {
      file: './packages/vue/dist/naux-vue.cjs',
      format: 'cjs',
    }, {
      file: './packages/vue/dist/naux-vue.mjs',
      format: 'es',
    },
  ],
  plugins: [typescript()],
}
