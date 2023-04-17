import { h, renderSlots } from '../dist/naux-vue.esm-bundler.js'

/* eslint-disable no-console */
export const Foo = {
  setup() {},
  render() {
    console.log(this.$slots)
    // const slots = renderSlots(this.$slots)
    const scopeData = 'scope data'
    return h('div', {}, [
      renderSlots(this.$slots, 'header', {
        scopeData,
      }),
      h('div', {}, 'Foo content'),
      renderSlots(this.$slots, 'footer'),
    ])
  },
}
