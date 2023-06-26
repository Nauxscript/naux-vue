import { hasOwn } from '@naux-vue/shared'

const publicPropertiesMap = {
  $el: i => i.vnode.el,
  $slots: i => i.slots,
  $props: i => i.props,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance

    if (hasOwn(setupState, key))
      return setupState[key]

    if (hasOwn(props, key))
      return props[key]

    const get = publicPropertiesMap[key]
    if (get)
      return get(instance)
  },
}
