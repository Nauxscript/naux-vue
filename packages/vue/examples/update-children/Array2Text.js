import { h, ref } from '../dist/naux-vue.esm-bundler.js'

const prevChildren = [h('li', {}, 'prevChildren item li 1'), h('li', {}, 'prevChildren item li 2')]
const nextChildren = 'nextChildren'

export const Array2Text = {
  setup() {
    const isChange = ref(false)
    window.isChange = isChange
    return {
      isChange,
    }
  },
  render() {
    return !this.isChange ? h('ul', {}, prevChildren) : h('div', {}, nextChildren)
  },
}
