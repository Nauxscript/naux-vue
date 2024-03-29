import { shallowReadonly } from '@naux-vue/reactivity'
import { proxyRefs } from './../../reactivity/src/ref'
import { initProps } from './componentProps'
import { emit } from './componentEmit'
import { initSlots } from './componentSlots'

let compile

export function createComponentInstance(vnode: any, parent) {
  // eslint-disable-next-line no-console
  console.log(parent)
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    proxy: null,
    props: {},
    slots: {},
    emit: () => {},
    provides: parent ? parent.provides : {},
    parent,
    isMounted: false,
    subTree: null,
    next: null,
  }

  component.emit = emit.bind(null, component) as any

  return component
}

let currentInstance: any = null
export function getCurrentInstance() {
  return currentInstance
}

function setCurrentInstance(instance) {
  currentInstance = instance
}

export const setupComponent = (instance) => {
  // initial props
  initProps(instance, instance.vnode.props)
  // initial slots
  initSlots(instance, instance.vnode.children)

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const { setup } = Component
  if (setup) {
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    })
    setCurrentInstance(null)
    handleSetupResult(instance, setupResult)
  }
  else {
    finishComponentSetup(instance)
  }
}

function handleSetupResult(instance, setupResult: any) {
  // if type of setupResult is object, make it to the component data
  if (typeof setupResult === 'object')
    instance.setupState = proxyRefs(setupResult)

  // TODO: if its a function, take it as render function

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  if (!instance.render) {
    if (compile && !Component.render) {
      if (Component.template)
        Component.render = compile(Component.template)
    }
  }
  // if (Component.template && )
  instance.render = Component.render
}

export function registRuntimeCompile(_compile) {
  compile = _compile
}
