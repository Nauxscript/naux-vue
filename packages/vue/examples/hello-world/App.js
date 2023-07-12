import { h } from '../dist/naux-vue.esm-bundler.js'

const examples = [
  'component-props',
  'component-emits',
  'component-slots',
  'getCurrentInstance',
  'provide-inject',
  'custom-renderer',
  'update-process',
  'update-children',
  'update-component',
  'nextTick',
  'compiler-base',
  'compiler-multiple-types',
]

export const App = {
  render() {
    const examplesList = () => {
      return this.examples.map((name) => {
        return h('li', {}, [h('a', { href: `../${name}/index.html` }, name)])
      })
    }
    return h('div', {}, [
      h('p', {}, `Welcome to ${this.title}`),
      h('p', {}, `${this.title} is a mini version of VUE to explore HOW VUE3 WORK`),
      h('p', {}, 'there is some examples of vue component core features below:'),
      h('ul', {}, examplesList()),
    ])
  },
  setup() {
    return {
      title: 'Naux-vue',
      examples,
    }
  },
}
