/* eslint-disable no-console */
import { getCurrentInstance, h, nextTick, ref } from '../dist/naux-vue.esm-bundler.js'

export const App = {
  name: 'App',
  setup() {
    const count = ref(0)
    const ctx = getCurrentInstance()
    const handleCountIncrease100Times = async () => {
      for (let i = 0; i < 100; i++)
        count.value++

      console.log(ctx)
      await nextTick()
      console.log(ctx)
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
