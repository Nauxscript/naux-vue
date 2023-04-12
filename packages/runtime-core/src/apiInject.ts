import { getCurrentInstance } from './component'

export function provide(key: symbol | string | number, value) {
  const instance = getCurrentInstance()
  if (instance) {
    let { provides } = instance
    const parentProvides = instance.parent?.provides
    if (provides === parentProvides)
      provides = instance.provides = Object.create(parentProvides)

    provides[key] = value
  }
}

export function inject(key: symbol | string | number) {
  const instance = getCurrentInstance()
  if (instance) {
    const parentProvides = instance.parent.provides
    if (key in parentProvides)
      return parentProvides[key]
  }
}
