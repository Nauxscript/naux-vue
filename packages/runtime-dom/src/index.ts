import { createRenderer } from '@naux-vue/runtime-core'

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, key, oldVal, newVal) {
  if (key.match(/^on[A-Z]/)) {
    const eventName = key.slice(2).toLowerCase()
    el.addEventListener(eventName, newVal)
  }
  else {
    // eslint-disable-next-line no-console
    console.log(oldVal)
    // eslint-disable-next-line no-console
    console.log(newVal)
    // eslint-disable-next-line no-console
    console.log('------------')
    if (oldVal !== newVal) {
      if (newVal === null || newVal === undefined)
        el.removeAttribute(key, newVal)
      else
        el.setAttribute(key, newVal)
    }
  }
}

function insert(el, parent) {
  parent.append(el)
}

function createTextNode(text) {
  return document.createTextNode(text)
}

function setElementText(el, text) {
  // what's the difference between textContent and innerText (and innerHTML)
  // the most important defference is, use innerText to change a dom content will trigger reflow, but textContent woundn't.
  // refer to https://juejin.cn/post/7044436311033249805
  el.textContent = text
}

function remove(el) {
  const parent = el.parentNode
  parent && parent.removeChild(el)
}

const renderer = createRenderer({
  createElement,
  patchProp,
  insert,
  createTextNode,
  setElementText,
  remove,
}) as any

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '@naux-vue/runtime-core'
