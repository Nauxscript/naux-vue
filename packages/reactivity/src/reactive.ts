import { ReactiveFlags, mutableHandler, readonlyHandler, shallowReadonlyHandler } from './baseHandler'

export const createReactiveObject = (raw: any, baseHandler: ProxyHandler<any>) => {
  return new Proxy(raw, baseHandler)
}

export const reactive = (raw: any) => {
  return createReactiveObject(raw, mutableHandler())
}

export const readonly = (raw: any) => {
  return createReactiveObject(raw, readonlyHandler())
}

export const shallowReadonly = (raw: any) => {
  return createReactiveObject(raw, shallowReadonlyHandler())
}

export const isReactive = (target: any) => {
  return !!target[ReactiveFlags.IS_REACTIVE]
}

export const isReadonly = (target: any) => {
  return !!target[ReactiveFlags.IS_READONLY]
}

export const isProxy = (target: any) => {
  return isReactive(target) || isReadonly(target)
}
