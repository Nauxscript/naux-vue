export const emit = (instance, event: string, ...args) => {
  const { props } = instance

  const camelize = (str: string) => str.replace(/-(\w)/g, (_, c) => {
    return c ? c.toUpperCase() : ''
  })

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const toHandlerKey = (str: string) => (str ? `on${capitalize(camelize(str))}` : '')
  const handler = props[toHandlerKey(event)]
  handler && handler(...args)
}
