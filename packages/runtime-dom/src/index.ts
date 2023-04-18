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
  el.innerText = text
}

const renderer = createRenderer({
  createElement,
  patchProp,
  insert,
  createTextNode,
  setElementText,
}) as any

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '@naux-vue/runtime-core'
