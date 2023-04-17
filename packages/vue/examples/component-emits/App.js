/* eslint-disable no-console */
import { h } from '../../dist/naux-vue.esm-bundler.js'
import { Foo } from './Foo.js'

window.self = null

export const App = {
  render() {
    window.self = this
    const FooCom = h(Foo, {
      count: 1,
      onAdd(a, b) {
        console.log('parent onAdd', a, b)
      },
      onFooAdd(msg) {
        console.log(`parent onFooAdd: ${msg}`)
      },
    })

    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'support emit and passing props from parent to child, and forbid to change the prop'),
      h('p', {
        onClick: () => {
          console.log('click')
        },
        onMouseover() {
          console.log('mouseover')
        },
      }, 'click or mouseover me'),
      FooCom,
    ])
  },
  setup() {
    return {
      title: 'compoent-emits',
    }
  },
}
