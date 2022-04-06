import { render, screen, fireEvent, getByLabelText } from '@testing-library/vue'
import App from '@/App.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('src/App.vue', () => {
  let wrapper
  beforeEach(() => {
    //look up this for more mock help
    const breakpoint = {
      init: jest.fn(),
      framework: {},
      smAndDown: true,
    }
    const vuetify = new Vuetify()
    vuetify.framework.breakpoint = breakpoint
    wrapper = render(App, {
      vuetify,
    })
  })

  it('load the page', async() => {
    expect(App.data()).toStrictEqual({})
  })
})