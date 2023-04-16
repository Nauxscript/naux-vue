import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'support custom renderer, use pixiJs to render vnode in canvas in this example'),
    ])
  },
  setup() {
    return {
      title: 'custom-renderer',
    }
  },
}
