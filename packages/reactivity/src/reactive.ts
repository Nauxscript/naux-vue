import { ReactiveFlags, mutableHandler, readonlyHandler } from './baseHandler'

export const createReactiveObject = (raw: any, baseHandler: ProxyHandler<any>) => {
  return new Proxy(raw, baseHandler)
}

export const reactive = (raw: any) => {
  return createReactiveObject(raw, mutableHandler())
}

export const readonly = (raw: any) => {
  return createReactiveObject(raw, readonlyHandler())
}

export const isReactive = (target: any) => {
  return !!target[ReactiveFlags.IS_REACTIVE]
}

export const isReadonly = (target: any) => {
  return !!target[ReactiveFlags.IS_READONLY]
}
