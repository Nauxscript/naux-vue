import { getCurrentInstance, h } from '../../dist/naux-vue.esm-bundler.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'implement getCurrentInstance API, can only use in setup'),
      h(Foo, {}),
    ])
  },
  setup() {
    const instance = getCurrentInstance()
    // eslint-disable-next-line no-console
    console.log('App instance:', instance)
    return {
      title: 'getCurrentInstance API',
    }
  },
}
