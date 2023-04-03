import { h } from '../../dist/naux-vue.esm-bundler.js'

window.self = null

export const App = {
  render() {
    window.self = this
    // return h('div', {}, `hello ${this.msg}`)
    // return h('div', {}, 'surprise madafaka!')
    return h('div', {}, [
      h('p', { class: 'blue' }, `surprise ${this.msg}`),
    ])
  },
  setup() {
    return {
      msg: 'madafaka',
    }
  },
}
