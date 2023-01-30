import { mutableHandler, readonlyHandler } from './baseHandler'

export const reactive = (raw: any) => {
  const proxy = new Proxy(raw, mutableHandler())
  return proxy
}

export const readonly = (raw: any) => {
  const proxy = new Proxy(raw, readonlyHandler())
  return proxy
}
