import { h } from '../../dist/naux-vue.esm-bundler.js'

export const App = {
  render() {
    // return h('Container', {}, [
    //   h('Text', {
    //     x: 50,
    //     y: 220,
    //   }, `${this.title} example`),
    //   h('Text', {}, 'support custom renderer, use pixiJs to render vnode in canvas in this example'),
    // ])
    return h('Rect', {
      x: this.x,
      y: this.y,
    }, [])
  },
  setup() {
    return {
      title: 'custom-renderer',
      x: 100,
      y: 100,
    }
  },
}
