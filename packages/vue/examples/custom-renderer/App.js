import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    return h('Container', {}, [
      h('Container', {
        x: 0,
        y: 0,
      }, ` ${this.title} example: \n support custom renderer, \n use pixiJs to render vnode in canvas in this example`),
      h('Rect', {
        x: this.x,
        y: this.y,
      }),
    ])
  },
  setup() {
    return {
      title: 'custom-renderer',
      x: 100,
      y: 200,
    }
  },
}
