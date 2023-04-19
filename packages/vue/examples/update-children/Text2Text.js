import { h, ref } from '../dist/naux-vue.esm-bundler.js'

const nextChildren = 'nextChildren'
const prevChildren = 'prevChildren'

export const Text2Text = {
  setup() {
    const isChange = ref(false)
    window.isChange = isChange
    return {
      isChange,
    }
  },
  render() {
    return !this.isChange ? h('div', {}, prevChildren) : h('div', {}, nextChildren)
  },
}
