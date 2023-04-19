import { h, ref } from '../dist/naux-vue.esm-bundler.js'

const nextChildren = [h('li', {}, 'nextChildren item li 1'), h('li', {}, 'nextChildren item li 2')]
const prevChildren = 'prevChildren'

export const Text2Array = {
  setup() {
    const isChange = ref(false)
    window.tta = isChange
    return {
      isChange,
    }
  },
  render() {
    return !this.isChange ? h('ul', {}, prevChildren) : h('div', {}, nextChildren)
  },
}
