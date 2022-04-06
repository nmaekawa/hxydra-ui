import { render, screen, fireEvent, getByLabelText } from '@testing-library/vue'
import CreateForm from '@/components/DetailView.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('DetailView.vue', () => {
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
    wrapper = render(CreateForm, {
      vuetify,
      props: {
        course: {"prefix":"Test","sequence":1,"version":1,"run":0,"nickname":"Test_v1","title":"Test 2/1/2019","is_sequence":false,"is_fuzzy_launch_date":false,"fuzzy_launch_date":null,"launch_date":null,"end_date":null,"estimated_effort_min":"0.00","estimated_effort_max":"0.00","common_name":"vicky's test","legacy":true,"status":"open","collection":[],"faculty_agreement_signed":false,"sow_approval_date":"2018-01-05T05:00:00Z","subactivity":null,"application_open_date":null,"application_close_date":null,"marketing_launch_date":null,"duration_weeks":4,"team":[],"hx_discipline":[],"delivery_platform":"UNDEF","technical_platform":"UNDEF","platform_discipline":[],"enrollment_date":null,"enrollment_page_url":null,"enrollment_type":null,"self_paced":false,"cert_available":false,"cert_price":"0.00","cert_rate_to_certify":0,"cert_enrollment_date":null,"program_code":null,"program_run":null,"program_id":null,"public_url":null,"revenue_school":[],"sponsoring_school":[],"data":null}
      }
    })
  })

  it('loaded labels', async () => {
    screen.getByText('Project Title:')
    screen.getByText('Common Name:')
    screen.getByText('Course Run:')
    screen.getByText('Course Number:')
    screen.getByText('Course ID:')
    screen.getByText('Status:')
    screen.getByText('Subactivity:')
    screen.getByText('Launch Date:')
    screen.getByText('End Date:')
    screen.getByText('SOW Approval Date:')
    screen.getByText('Application Open Date:')
    screen.getByText('Application Close Date:')
    screen.getByText('Marketing Date:')
    screen.getByText('Course Enrollment Date:')
    screen.getByText('Cert Enrollment Date:')
    screen.getByText('Enrollment Page URL:')
    screen.getByText('Public URL:')
    screen.getByText('IDV Verified Certificate')
    screen.getByText('Self-paced')
    screen.getByText('Faculty Agreements Signed')
    screen.getByText('Enrollment Type:')
    screen.getByText('Est. Effort (Min - Max):')
    screen.getByText('Course Length:')
    screen.getByText('Pass Rate to Certify:')
    screen.getByText('Cert Price:')
    screen.getByText('Delivery Platform:')
    screen.getByText('Technical Platform:')
    screen.getByText('Revenue School(s):')
    screen.getByText('Sponsoring School(s):')
  })

  it('loaded given course object', async () => {
    screen.getByText('Test 2/1/2019')
    screen.getByText("vicky\'s test")
    screen.getByText('Test_v1')
    screen.getByText('open')
    screen.getByText('2018-01-05')
    screen.getByText('0.00 - 0.00 hrs')
    screen.getByText('4 weeks')
    expect(screen.getAllByText('UNDEF').length).toBe(2)
    expect(screen.getAllByText('N/A').length).toBe(2)

    let teams_button = screen.getByText('Team')
    await fireEvent.click(teams_button)
    await Vue.nextTick()
    screen.getByText('Role on Team')
    screen.getByText('Rows per page:')
    screen.getByText('Name')
    screen.getByText('Search')

    let disc_button = screen.getByText('Discipline/edX Subject')
    await fireEvent.click(disc_button)
    await Vue.nextTick()

    screen.getByText('Platform Discipline:')
    screen.getByText('HX Disciplines (Marketing):')
  })
})