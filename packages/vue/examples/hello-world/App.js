/* eslint-disable no-console */
import { h } from '../../dist/naux-vue.esm-bundler.js'
import { Foo } from './Foo.js'

window.self = null

export const App = {
  render() {
    window.self = this
    // return h('div', {}, `hello ${this.msg}`)
    // return h('div', {}, 'surprise madafaka!')
    const FooCom = h(Foo, {
      count: 1,
      onAdd(a, b) {
        console.log('parent onAdd', a, b)
      },
      onFooAdd(msg) {
        console.log(`parent onFooAdd: ${msg}`)
      },
    },
    // [h('p', {}, 'slot content 1'), h('p', {}, 'slot content 2')],
    h('p', {}, 'slot content 1'),
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
