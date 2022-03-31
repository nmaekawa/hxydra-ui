import { render, screen, fireEvent, getByLabelText } from '@testing-library/vue'
import CreateForm from '@/components/CreateForm.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('CreateForm.vue', () => {
  let wrapper
  beforeEach(() => {
    const breakpoint = {
      init: jest.fn(),
      framework: {},
      smAndDown: true,
    }
    const vuetify = new Vuetify()
    vuetify.framework.breakpoint = breakpoint
    wrapper = render(CreateForm, {
      vuetify,
    })
  })

  it('loaded form inputs', async () => {
    // make sure all inputs exist first
    let prefix = screen.getByLabelText('Project Prefix')
    let vno = screen.getByLabelText('Version Number')
    let rno = screen.getByLabelText('Rerun Number')
    let cno = screen.getByLabelText('Part of a sequence?')
    await fireEvent.click(cno)
    let sno = screen.getByLabelText('Sequence Number')
    screen.getByLabelText('Project Name')
    screen.getByLabelText('Exact Launch Date')
    screen.getByLabelText('Exact End Date')
    screen.getByLabelText('Approximate Launch & End Date')
  })

  it('calculates nickname', async () => {
    // get items that change nickname
    let prefix = screen.getByLabelText('Project Prefix')
    let vno = screen.getByLabelText('Version Number')
    let rno = screen.getByLabelText('Rerun Number')
    let cno = screen.getByLabelText('Part of a sequence?')
    await fireEvent.click(cno)
    let sno = screen.getByLabelText('Sequence Number')

    // change some values to test the automatic nickname maker
    await fireEvent.update(prefix, 'Test')
    await fireEvent.update(sno, 15)
    screen.getByText(/Test_15_v1_r00/)

    await fireEvent.update(prefix, 'TestX')
    await fireEvent.update(sno, 3)
    screen.getByText(/TestX_03_v1_r00/)
  })

  it('checks for sequence number', async () => {
    let cno = screen.getByLabelText('Part of a sequence?')
    await fireEvent.click(cno)
    let sno = screen.getByLabelText('Sequence Number')
    await fireEvent.update(sno, '')
    await Vue.nextTick()
    screen.getByText(/start at 1/i)
    await fireEvent.update(sno, 1)
    await Vue.nextTick()
    // to finish up later
  })
})