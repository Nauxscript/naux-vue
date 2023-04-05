const publicPropertiesMap = {
  $el: i => i.vnode.el,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance
    if (key in setupState)
      return setupState[key]

    if (key in props)
      return props[key]

    const get = publicPropertiesMap[key]
    if (get)
      return get(instance)
  },
}
