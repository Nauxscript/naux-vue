const publicPropertiesMap = {
  $el: i => i.vnode.el,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance

    const hasOwn = (target, key) => Reflect.has(target, key)

    if (hasOwn(setupState, key))
      return setupState[key]

    if (hasOwn(props, key))
      return props[key]

    const get = publicPropertiesMap[key]
    if (get)
      return get(instance)
  },
}
