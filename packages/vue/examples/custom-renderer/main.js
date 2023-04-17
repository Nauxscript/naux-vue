import { createRenderer } from '../dist/naux-vue.esm-bundler.js'
import { App } from './App.js'

const appContainer = new window.PIXI.Application({ width: 640, height: 640, background: '#ffffff' })
document.body.appendChild(appContainer.view)
const renderer = createRenderer({
  createElement(type) {
    let ele
    switch (type) {
      case 'Rect':
        ele = new window.PIXI.Graphics()
        ele.beginFill(0xFF0000)
        ele.drawRect(0, 0, 100, 100)
        ele.endFill()
        break
      case 'Container':
        ele = new window.PIXI.Container()
        ele.x = 0
        ele.y = 0
        break
      default:
        break
    }
    if (ele)
      return ele
  },
  patchProp(el, key, val) {
    el[key] = val
  },
  insert(el, parent) {
    parent.addChild(el)
  },
  createTextNode(text) {
    return new window.PIXI.Text(text)
  },
  setElementText(el, text) {
    el.addChild(new window.PIXI.Text(text))
  },
})

renderer.createApp(App).mount(appContainer.stage)
