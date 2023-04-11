/* eslint-disable no-console */
import { createTextVnode, h } from '../../dist/naux-vue.esm-bundler.js'
import { Foo } from './Foo.js'

export const App = {
  render() {
    const FooCom = h(Foo, {},
      {
        header: ({ scopeData }) => [h('p', {}, `header slot, data from:${scopeData}`), createTextVnode('this is a text in slot')],
        footer: () => h('p', {}, 'footer slot'),
      },
    )

    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'support basic slot \ name slot \ scope slot'),
      h('p', { class: 'blue' }, 'and implement the fragment and text node'),
      FooCom,
    ])
  },
  setup() {
    return {
      title: 'component-slots',
    }
  },
}
