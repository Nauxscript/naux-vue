import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    return h('div', {}, [
      h('p', {}, `surprise ${this.msg}`),
    ])
  },
  setup() {
    return {
      msg: 'madafaka',
    }
  },
}
