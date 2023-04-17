import typescript from '@rollup/plugin-typescript'

export default {
  input: './packages/vue/src/index.ts',
  output: [
    {
      file: './packages/vue/dist/naux-vue.cjs.js',
      format: 'cjs',
    }, {
      file: './packages/vue/dist/naux-vue.esm-bundler.js',
      format: 'es',
    },
    // for example running
    {
      file: './packages/vue/examples/dist/naux-vue.esm-bundler.js',
      format: 'es',
    },
  ],
  plugins: [typescript()],
}
