import { h } from '../../dist/naux-vue.esm-bundler.js'

const examples = ['component-props', 'component-emits', 'component-slots', 'getCurrentInstance', 'provide-inject', 'custom-renderer']

export const App = {
  render() {
    const examplesList = () => {
      return this.examples.map((name) => {
        return h('li', {}, [h('a', { href: `../${name}/index.html` }, name)])
      })
    }
    return h('div', {}, [
      h('p', {}, `surprise ${this.msg}`),
      h('ul', {}, examplesList()),
    ])
  },
  setup() {
    return {
      msg: 'madafaka',
      examples,
    }
  },
}
