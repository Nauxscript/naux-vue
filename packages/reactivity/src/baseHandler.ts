import { track, trigger } from '..'

export const createGetter = (isReadoly = false) => {
  return function get(target: any, propertyKey: string | symbol) {
    const res = Reflect.get(target, propertyKey)
    if (!isReadoly)
      track(target, propertyKey)
    return res
  }
}

export const createSetter = () => {
  return function get(target: any, propertyKey: string | symbol, newValue: any) {
    const res = Reflect.set(target, propertyKey, newValue)
    trigger(target, propertyKey)
    return res
  }
}

const get = createGetter()
const readonlyGet = createGetter(true)

export const mutableHandler = () => ({
  get,
  set: createSetter(),
})

export const readonlyHandler = () => ({
  get: readonlyGet,
  set() {
    console.warn('readonly obj cannot be set!')
    return true
  },
})
