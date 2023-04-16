/* eslint-disable no-console */
import { createRenderer } from '../../dist/naux-vue.esm-bundler.js'
import { App } from './App.js'

const appContainer = new window.PIXI.Application({ width: 640, height: 640 })
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
      // case 'Container':
      //   ele = new window.PIXI.Container()
      //   break
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
    console.log(el)
    console.log(parent)
    // if (parent.stage)
    // parent.stage.addChild(el)
    // else
    parent.addChild(el)
  },
})

renderer.createApp(App).mount(appContainer.stage)
// const appContainer = document.getElementById('app')
// createApp(App).mount(appContainer)
