/* eslint-disable no-console */
import { h, ref } from '../dist/naux-vue.esm-bundler.js'

export const App = {
  name: 'App',
  render() {
    return h('div', {
      id: 'testing',
      ...this.data,
    }, [
      h('h2', { class: 'red' }, `${this.title} example`),
      h('p', { class: 'blue' }, 'implement component automatic update when the data change'),
      h('p', {}, `👓: ${this.count}s`),
      h('p', {
      }, 'element with props, check it in devtool element panel'),
      h('button', {
        onClick: this.handleChangeFoo,
      }, 'foo change to damn foo'),
      h('button', {
        onClick: this.handleChangeFooToNull,
      }, 'foo change to null'),
      h('button', {
        onClick: this.handleChangeData,
      }, 'data change'),
    ])
  },
  setup() {
    const count = ref(0)
    const data = ref({
      foo: 'foo',
      bar: 'bar',
    })
    const handleAdd = () => {
      count.value++
      console.log('plus a sec')
    }

    const handleChangeFoo = () => {
      data.value.foo = 'damn foo'
      console.log('foo change to damn foo')
    }

    const handleChangeFooToNull = () => {
      data.value.foo = null
      console.log('foo change to null')
    }

    const handleChangeData = () => {
      data.value = {
        foo: 'damn good foo',
      }
      console.log('data change')
    }

    return {
      title: 'component update process',
      count,
      data,
      handleAdd,
      handleChangeFoo,
      handleChangeFooToNull,
      handleChangeData,
    }
  },
}
