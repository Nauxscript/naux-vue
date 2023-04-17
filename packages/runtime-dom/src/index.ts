import { createRenderer } from '@naux-vue/runtime-core'

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, key, val) {
  if (key.match(/^on[A-Z]/)) {
    const eventName = key.slice(2).toLowerCase()
    el.addEventListener(eventName, val)
  }
  else { el.setAttribute(key, val) }
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
