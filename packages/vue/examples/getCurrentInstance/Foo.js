import { getCurrentInstance, h } from '../dist/naux-vue.esm-bundler.js'

export const Foo = {
  name: 'Foo',
  setup() {
    const instance = getCurrentInstance()
    // eslint-disable-next-line no-console
    console.log('Foo instance:', instance)
  },
  render() {
    return h('div', {}, 'this is Foo')
  },
}
