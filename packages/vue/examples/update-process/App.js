import { h, ref } from '../dist/naux-vue.esm-bundler.js'

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'implement component automatic update when the data change'),
      h('p', {}, `👓: ${this.count}s`),
      h('button', {
        onClick: this.handleAdd,
      }, '+1s'),
    ])
  },
  setup() {
    const count = ref(0)
    const handleAdd = () => {
      count.value++
      // eslint-disable-next-line no-console
      console.log('plus a sec')
    }
    return {
      title: 'component update process',
      count,
      handleAdd,
    }
  },
}
