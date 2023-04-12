import { h, inject, provide } from '../../dist/naux-vue.esm-bundler.js'
const motherKey = Symbol('Mother')

const Daughter = {
  name: 'Mother',
  render() {
    return h('div', {}, [
      h('h3', {}, this.title),
      h('Daughter Content:', {}, `data from App:${this.appData.msg}`),
      h('Daughter Content:', {}, `data from Mother:${this.appData.msg}`),
    ])
  },
  setup() {
    const appData = inject('App')
    const motherData = inject(motherKey)
    return {
      title: 'this is Daughter component',
      appData,
      motherData,
    }
  },
}

const Mother = {
  name: 'Mother',
  render() {
    return h('div', {}, [
      h('h3', {}, this.title),
      h('Mother Content:', {}, `data from App:${this.appData.msg}`),
      h(Daughter),
    ])
  },
  setup() {
    const appData = inject('App')
    provide(motherKey, {
      msg: 'data from App',
    })
    return {
      title: 'this is Mother component',
      appData,
    }
  },
}

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'implement getCurrentInstance API, can only use in setup'),
      h(Mother),
    ])
  },
  setup() {
    provide('App', {
      msg: 'data from App',
    })
    return {
      title: 'provide & inject API',
    }
  },
}
