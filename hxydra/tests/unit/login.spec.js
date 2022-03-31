import { render, screen } from '@testing-library/vue'
import Login from '@/components/Login.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Login.vue', () => {
  beforeEach(() => {
    const breakpoint = {
      init: jest.fn(),
      framework: {},
      smAndDown: true,
    }
    const vuetify = new Vuetify()
    vuetify.framework.breakpoint = breakpoint
    const wrapper = render(Login, {
      vuetify,
    })
  })

  it('loaded Welcome message', () => {
    screen.getByText("Welcome to Kondo", {exact: false})
  })

  it('loaded username/pw fields', () => {
    screen.getByLabelText('username')
    screen.getByLabelText('password')
  })

  it('loaded login button', () => {
    screen.getByRole('link', {name:/Login/})
  })

})
