import { shallowReadonly } from '@naux-vue/reactivity'
import { initProps } from './componentProps'
import { emit } from './componentEmit'

export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    proxy: null,
    props: {},
    emit: () => {},
  }

  component.emit = emit.bind(null, component) as any

  return component
}

export const setupComponent = (instance) => {
  // initial props
  initProps(instance, instance.vnode.props)
  // initial slots
  // TODO: initSlots()

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const { setup } = Component
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    })

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: any) {
  // if type of setupResult is object, make it to the component data
  if (typeof setupResult === 'object')
    instance.setupState = setupResult

  // TODO: if its a function, take it as render function

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  instance.render = Component.render
}
