import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    // return h('div', {}, `hello ${this.msg}`)
    // return h('div', {}, 'surprise madafaka!')
    return h('div', {}, [
      h('p', { class: 'blue' }, 'surprise '),
      h('p', { class: 'red' }, 'madafaka!'),
    ])
  },
  setup() {
    return {
      msg: 'naux-vue',
    }
  },
}
