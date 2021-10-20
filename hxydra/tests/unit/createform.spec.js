import { render, screen, fireEvent, getByLabelText } from '@testing-library/vue'
import CreateForm from '@/components/CreateForm.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('CreateForm.vue', () => {
  beforeEach(() => {
    const breakpoint = {
      init: jest.fn(),
      framework: {},
      smAndDown: true,
    }
    const vuetify = new Vuetify()
    vuetify.framework.breakpoint = breakpoint
    const wrapper = render(CreateForm, {
      vuetify,
    })
  })

  it('loaded form inputs', async () => {
    // make sure all inputs exist first
    let prefix = screen.getByLabelText('Project Prefix')
    let vno = screen.getByLabelText('Version Number')
    let rno = screen.getByLabelText('Run Number')
    let cno = screen.getByLabelText('Add sequence #')
    await fireEvent.click(cno)
    let sno = screen.getByLabelText('Sequence Number')
    screen.getByLabelText('Project Name')
    screen.getByLabelText('Launch Date')
    screen.getByLabelText('End Date')
    screen.getByLabelText('Estimated Min hrs per week')
    screen.getByLabelText('Estimated Max hrs per week')
    screen.getByLabelText('Certificate?')
  })
  
  it('calculates nickname', async () => {
    // get items that change nickname
    let prefix = screen.getByLabelText('Project Prefix')
    let vno = screen.getByLabelText('Version Number')
    let rno = screen.getByLabelText('Run Number')
    let cno = screen.getByLabelText('Add sequence #')
    await fireEvent.click(cno)
    let sno = screen.getByLabelText('Sequence Number')

    // change some values to test the automatic nickname maker
    await fireEvent.update(vno, 5)
    await fireEvent.update(prefix, 'Test')
    await fireEvent.update(rno, 8)
    await fireEvent.update(sno, 15)
    screen.getByText(/Test_15_v5_r8/)

    await fireEvent.update(vno, 1)
    await fireEvent.update(prefix, 'TestX')
    await fireEvent.update(rno, 2)
    await fireEvent.update(sno, 3)
    screen.getByText(/TestX_3_v1_r2/)
  })
})