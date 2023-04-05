export const emit = (instance, event: string, ...args) => {
  // eslint-disable-next-line no-console
  console.log('componentEmit', event)
  const { props } = instance

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const toHandlerKey = (str: string) => (str ? `on${capitalize(str)}` : '')
  const handler = props[toHandlerKey(capitalize(event))]
  handler && handler(...args)
}
