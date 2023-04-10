export const initSlots = (instance, children) => {
  normalizeObjectSlots(children, instance.slots)
}

function normalizeObjectSlots(children, slots) {
  for (const key in children) {
    const slot = children[key]
    slots[key] = normalizeSlotValue(slot)
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}
