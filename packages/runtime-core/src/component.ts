export function createComponentInstance(vnode: any) {
  const coponent = {
    vnode,
    type: vnode.type,
    setupState: {},
  }
  return coponent
}

export const setupComponent = (instance) => {
  // initial props
  // TODO: initProps()
  // initial slots
  // TODO: initSlots()

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const { setup } = Component
  if (setup) {
    const setupResult = setup()

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
