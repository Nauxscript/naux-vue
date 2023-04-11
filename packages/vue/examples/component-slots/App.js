/* eslint-disable no-console */
import { createTextVnode, h } from '../../dist/naux-vue.esm-bundler.js'
import { Foo } from './Foo.js'

export const App = {
  render() {
    const FooCom = h(Foo, {
      count: 1,
      onAdd(a, b) {
        console.log('parent onAdd', a, b)
      },
      onFooAdd(msg) {
        console.log(`parent onFooAdd: ${msg}`)
      },
    },
    {
      header: ({ scopeData }) => [h('p', {}, `header slot, data from:${scopeData}`), createTextVnode('this is a text in slot')],
      footer: () => h('p', {}, 'footer slot'),
    },
    )

    return h('div', {}, [
      h('p', {
        class: 'blue',
        onClick: () => {
          console.log('click')
        },
        onMouseover() {
          console.log('mouseover')
        },
      }, `surprise ${this.msg}`),
      FooCom,
    ])
  },
  setup() {
    return {
      msg: 'madafaka',
    }
  },
}
