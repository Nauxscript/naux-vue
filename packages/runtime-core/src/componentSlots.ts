import { ShapeFlags } from '@naux-vue/shared'
export const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN)
    normalizeObjectSlots(children, instance.slots)
}

function normalizeObjectSlots(children, slots) {
  for (const key in children) {
    const slot = children[key]
    slots[key] = scope => normalizeSlotValue(slot(scope))
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}
