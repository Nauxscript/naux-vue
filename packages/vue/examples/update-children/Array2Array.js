import { h, ref } from '../dist/naux-vue.esm-bundler.js'

const prevChildren = [h('p', {}, 'prevChildren item p 1'), h('span', {}, 'prevChildren item span 2')]
const nextChildren = [h('p', {}, 'nextChildren item p 1'), h('p', {}, 'nextChildren item p 2')]

export const Array2Array = {
  setup() {
    const isChange = ref(false)
    window.ata = isChange
    return {
      isChange,
    }
  },
  render() {
    return !this.isChange ? h('ul', {}, prevChildren) : h('div', {}, nextChildren)
  },
}
