import { h } from '../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'support binding events or setting props on a component'),
      h('p', {
        onClick: () => {
          alert('click')
        },
        onMouseover() {
          // eslint-disable-next-line no-console
          console.log('mouseover')
        },
      }, 'click me plz, or see console when mouse over me'),
    ])
  },
  setup() {
    return {
      title: 'component-props',
    }
  },
}
