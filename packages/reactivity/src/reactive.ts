export const reactive = (raw: any) => {
  const proxy = new Proxy(raw, {
    get(target, propertyKey) {
      const res = Reflect.get(target, propertyKey)
      return res
    },
    set(target, propertyKey, newValue) {
      const res = Reflect.set(target, propertyKey, newValue)
      return res
    },
  })
  return proxy
}
