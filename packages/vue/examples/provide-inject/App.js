import { h, inject, provide } from '../../dist/naux-vue.esm-bundler.js'
const motherKey = Symbol('Mother')

const Daughter = {
  name: 'Mother',
  render() {
    return h('div', {}, [
      h('h3', {}, this.title),
      h('p', {}, `Daughter Content: data from key【App2】set by App component: ${this.appData2.msg}`),
      h('p', {}, `Daughter Content: data from key【App】set by Mother component: ${this.appData.msg}`),
      h('p', {}, `Daughter Content: data from key【Symbol('Mother')】set by Mother compoent: ${this.motherData.msg}`),
      h('p', {}, `Daughter Content: data from key【DefaultInjectByFactory】set by Mother compoent: ${this.defaultInjectData.msg}`),
    ])
  },
  setup() {
    const appData = inject('App')
    const appData2 = inject('App2')
    const motherData = inject(motherKey)
    const defaultInjectData = inject('DefaultInjectByFactory', {
      msg: '【Default inject data return from a factory function】',
    })
    return {
      title: 'this is Daughter component',
      appData,
      appData2,
      motherData,
      defaultInjectData,
    }
  },
}

const Mother = {
  name: 'Mother',
  render() {
    return h('div', {}, [
      h('h3', {}, this.title),
      h('p', {}, `Mother Content: data from key【App】set by App component:${this.appData.msg}`),
      h('p', {}, `Mother Content: data from key【DefaultInject】:${this.defaultInjectData.msg}`),
      h(Daughter),
    ])
  },
  setup() {
    provide('App', {
      msg: '【Mother data but use "app" key that the same key as App component】',
    })
    provide(motherKey, {
      msg: '【Mother data】',
    })
    const appData = inject('App')
    const defaultInjectData = inject('DefaultInject', {
      msg: '【Default inject data】',
    })
    return {
      title: 'this is Mother component',
      appData,
      defaultInjectData,
    }
  },
}

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'implement provide & inject API, can only use in setup'),
      h(Mother),
    ])
  },
  setup() {
    provide('App', {
      msg: '【App data】',
    })
    provide('App2', {
      msg: '【another App data】',
    })
    return {
      title: 'provide & inject API',
    }
  },
}
