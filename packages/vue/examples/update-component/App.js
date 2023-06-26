import { h, ref } from '../dist/naux-vue.esm-bundler.js'
import { Child } from './Child.js'

export const App = {
  name: 'App',
  setup() {
    const count = ref(0)
    const msg = ref('123')
    const handleChangeMsg = () => {
      msg.value = '456'
    }
    const handleCountIncrease = () => {
      count.value++
    }
    return {
      msg,
      count,
      handleChangeMsg,
      handleCountIncrease,
    }
  },
  render() {
    return h('div', {}, [
      h('p', {}, 'This is the App compoent'),
      h('button', {
        onClick: this.handleChangeMsg,
      }, 'change msg'),
      h(Child, {
        msg: this.msg,
      }),
      h('button', {
        onClick: this.handleCountIncrease,
      }, 'change count'),
      h('p', {}, `count: ${this.count}`),
    ])
  },
}
