import { h } from '../../dist/naux-vue.esm-bundler.js'

/* eslint-disable no-console */
export const Foo = {
  setup(props, { emit }) {
    // props = { count }
    // NB: count is unchangable
    props.count++
    console.log(props)
    const handleBtnClick = () => {
      console.log('button is clicked')
      emit('add', 1, 2)
    }
    return {
      handleBtnClick,
    }
  },
  render() {
    const button = h('button', {
      onClick: this.handleBtnClick,
    }, 'emit button')
    return h('div', {}, [
      h('div', {}, `the value of count passing from parent is: ${this.count}`),
      button,
    ])
  },
}
