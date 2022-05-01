export const App = {
  render(h) {
    h('div', this.msg + 'Happy Path')
  },
  setup() {
    return {
      msg: 'Nauxscript Mini Vue'
    }
  }
}