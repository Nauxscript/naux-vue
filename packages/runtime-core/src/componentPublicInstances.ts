const publicPropertiesMap = {
  $el: i => i.vnode.el,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key in instance.setupState)
      return instance.setupState[key]
    const get = publicPropertiesMap[key]
    if (get)
      return get(instance)
  },
}
