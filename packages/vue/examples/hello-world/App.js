import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    return h('div', `hello ${this.msg}`)
  },
  setup() {
    return {
      msg: 'naux-vue',
    }
  },
}
