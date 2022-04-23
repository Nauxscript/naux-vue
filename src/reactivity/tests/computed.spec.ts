import { computed } from "../computed"
import { reactive } from "../reactive"

describe('computed', () => {
  test('happy path', () => {
    const user = reactive({
      age: 1
    })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })

  test('should compute lazily', () => {
    const origin = reactive({
      foo: 1
    })
    const getter = vi.fn(() => {
      return origin.foo
    })

    const computedValue = computed(getter)

    // cause computed is lazy, so the getter should be not called immediately
    expect(getter).not.toHaveBeenCalled()

    // only call getter when get the computed ref value
    expect(computedValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // computed value should be cache if the values it depend on isnt change
    computedValue.value;
    expect(getter).toHaveBeenCalledTimes(1)

    // lazy again
    origin.foo = 2
    expect(getter).toHaveBeenCalledTimes(1)

    // same as above
    expect(computedValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2)
    
    // same as above
    computedValue.value;
    expect(getter).toHaveBeenCalledTimes(2)

  })
})