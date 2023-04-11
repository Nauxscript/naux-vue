import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, 'component-props example'),
      h('p', { class: 'red' }, 'support binding events or setting props on a component'),
      h('p', {
        class: 'blue',
        onClick: () => {
          alert('click')
        },
        onMouseover() {
          // eslint-disable-next-line no-console
          console.log('mouseover')
        },
      }, `click me plz, count:${this.count}`),
    ])
  },
  setup() {
    return {
      count: 1,
    }
  },
}
