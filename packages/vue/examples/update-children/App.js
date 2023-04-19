import { h } from '../dist/naux-vue.esm-bundler.js'
import { Array2Text } from './Array2Text.js'
import { Array2Array } from './Array2Array.js'
import { Text2Array } from './Text2Array.js'
import { Text2Text } from './Text2Text.js'

export const App = {
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'there are following four cases when patching a component\'s children '),
      h('h3', {}, 'change array children to text children'),
      h(Array2Text),
      h('h3', {}, 'change array children to another array children'),
      h(Array2Array),
      h('h3', {}, 'change text children to array children'),
      h(Text2Array),
      h('h3', {}, 'change text children to another text children'),
      h(Text2Text),
    ])
  },
  setup() {
    return {
      title: 'update-children',
    }
  },
}
