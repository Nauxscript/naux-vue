import { h } from '../../dist/naux-vue.esm-bundler.js'

/* eslint-disable no-console */
export const Foo = {
  setup(props) {
    // props = { count }
    // NB: count is unchangable
    console.log(props)
  },
  render() {
    return h('div', `the value of count passing from parent is: ${this.count}`)
  },
}
