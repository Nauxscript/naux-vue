import { h, ref } from '../dist/naux-vue.esm-bundler.js'

export const App = {
  name: 'App',
  setup() {
    const count = ref(0)
    const handleCountIncrease100Times = () => {
      for (let i = 0; i < 100; i++)
        count.value++
    }
    return {
      handleCountIncrease100Times,
      count,
    }
  },
  render() {
    return h('div', {}, [
      h('p', {}, `count: ${this.count}`),
      h('button', {
        onClick: this.handleCountIncrease100Times,
      }, 'count + 100'),
    ])
  },

}
