import { isObject } from "../shared"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // patch fn can recursive handle the vnode tree
  patch(vnode, container)
}

function patch(vnode, container) {
  // judge if the type of vnode is [element] or [component]
  // console.log('type', vnode.type)
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type)
  const { children, props } = vnode
  if (typeof children === 'string') {
    el.textContent = children
  } else if(Array.isArray(children)) {
    mountChildren(children, el)
  }
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      el.setAttribute(key, props[key])
    }
  }
  container.append(el)
}

function mountChildren(childrens, container) {
  childrens.forEach(children => {
    patch(children, container)
  })
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render()

  // subTree is vnode, so its should be keep calling the patch fn
  // here the vnode is actually a [element] type
  // so when the virtual node become element，they thould been mount
  // vnode => element => mountElement

  patch(subTree, container)
}


