import { h, ref } from '../dist/naux-vue.esm-bundler.js'

// const prevChildren = [h('p', {}, 'prevChildren item p 1'), h('span', {}, 'prevChildren item span 2')]
// const nextChildren = [h('p', {}, 'nextChildren item p 1'), h('p', {}, 'nextChildren item p 2')]

// diff cases
// diff 1: starting on left
// before: ( A B ) C
// after: ( A B ) D E
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]
// const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'D' }, 'D'), h('p', { key: 'E' }, 'E')]

// diff 2: starting on right
// before: A ( B C )
// after: D E ( B C )
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]
// const nextChildren = [h('p', { key: 'D' }, 'D'), h('p', { key: 'E' }, 'E'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C')]

// case 1: prevChildren's number is more than nextChildren's, create the new children

// case 1.1
// before: ( A B )
// after: ( A B ) C
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B')]
// const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C'), h('p', { key: 'D' }, 'D')]

// case 1.2 introducing a new variable [anchor] to insert the new children into specific position
// before: ( A B )
// after: C D ( A B )
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B')]
// const nextChildren = [h('p', { key: 'C' }, 'C'), h('p', { key: 'D' }, 'D'), h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B')]

// case 1.3
// before: C D ( A B )
// after: ( A B )
// const prevChildren = [h('p', { key: 'C' }, 'C'), h('p', { key: 'D' }, 'D'), h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B')]
// const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B')]

// case 2 handle with the shortest changed children

// case 2.1
// before: A B ( C D ) E F G
// after: A B ( D H ) E F G
// const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C'), h('p', { key: 'D', id: 'new-id' }, 'D'), h('p', { key: 'E' }, 'E'), h('p', { key: 'F' }, 'F'), h('p', { key: 'G' }, 'G')]
// const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'D', id: 'new-id' }, 'D'), h('p', { key: 'H' }, 'H'), h('p', { key: 'E' }, 'E'), h('p', { key: 'F' }, 'F'), h('p', { key: 'G' }, 'G')]

// case 2.1
// before: A B ( C D E ) F G
// after: A B ( D C ) F G
const prevChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'C' }, 'C'), h('p', { key: 'D', id: 'new-id' }, 'D'), h('p', { key: 'E' }, 'E'), h('p', { key: 'F' }, 'F'), h('p', { key: 'G' }, 'G')]
const nextChildren = [h('p', { key: 'A' }, 'A'), h('p', { key: 'B' }, 'B'), h('p', { key: 'D', id: 'new-id' }, 'D'), h('p', { key: 'C' }, 'C'), h('p', { key: 'F' }, 'F'), h('p', { key: 'G' }, 'G')]

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
