import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {
  render() {
    return h('div', {
      id: 'root',
      class: ['bg-red', 'hard']
    }, [
      h('p', {class: 'blue'}, 'hi'),
      h('p', {class: 'green'}, 'Nauxscript !')
    ])
  },
  setup() {
    return {
      msg: 'Nauxscript Mini Vue'
    }
  }
}