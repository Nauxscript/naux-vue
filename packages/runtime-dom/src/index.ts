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

const renderer = createRenderer({
  createElement,
  patchProp,
  insert,
}) as any

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '@naux-vue/runtime-core'
