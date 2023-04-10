export const initSlots = (instance, children) => {
  const slots = {}
  for (const key in children) {
    const slot = children[key]
    slots[key] = Array.isArray(slot) ? slot : [slot]
  }
  instance.slots = slots
}
