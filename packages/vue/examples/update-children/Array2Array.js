import { h, ref } from '../dist/naux-vue.esm-bundler.js'

// const prevChildren = [h('p', {}, 'prevChildren item p 1'), h('span', {}, 'prevChildren item span 2')]
// const nextChildren = [h('p', {}, 'nextChildren item p 1'), h('p', {}, 'nextChildren item p 2')]

// diff cases
// case 1: starting on left
// before: ( A B ) C
// after: ( A B ) D E
const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]
const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'D' }, 'D'), h('p', { key: 'E' }, 'E')]

// case 2: starting on right
// before: A ( B C )
// after: D E ( B C )
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]
// const nextChildren = [h('p', { key: 'D' }, 'D'), h('p', { key: 'E' }, 'E'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]

// case 3: prevChildren's number is more than nextChildren's
// before: ( A B ) C
// after: ( A B )
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]
// const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B')]

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
