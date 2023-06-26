import { h } from '../dist/naux-vue.esm-bundler.js'

export const Child = {
  name: 'Child',
  render() {
    return h('div', {}, `the value of count passing from parent is:${this.$props.msg}`)
  },
}
