import { h } from '../../dist/naux-vue.esm-bundler.js'

export const Foo = {
  setup() {
    const instance = getCurrentInstance()
    console.log('Foo instance:', instance)
  },
  render() {
    return h('div', {}, 'this is Foo')
  },
}
