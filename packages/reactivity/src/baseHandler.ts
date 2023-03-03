import { extend, isObject } from '@naux-vue/shared'
import { reactive, readonly, track, trigger } from '..'

export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export const createGetter = (isReadonly = false, isShallowReadonly = false) => {
  return function get(target: any, propertyKey: string | symbol) {
    const res = Reflect.get(target, propertyKey)
    if (propertyKey === ReactiveFlags.IS_REACTIVE)
      return !isReadonly

    if (propertyKey === ReactiveFlags.IS_READONLY)
      return isReadonly

    if (isShallowReadonly)
      return res

    if (!isReadonly)
      track(target, propertyKey)

    if (isObject(res))
      return isReadonly ? readonly(res) : reactive(res)
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
const shallowReadonlyGet = createGetter(true, true)

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

export const shallowReadonlyHandler = () => extend(readonlyHandler(), {
  get: shallowReadonlyGet,
})
