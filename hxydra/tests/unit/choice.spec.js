import { render, screen, fireEvent, getByLabelText } from '@testing-library/vue'
import Choice from '@/components/Choice.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Choice.vue', () => {
  let wrapper
  beforeEach(() => {
    const breakpoint = {
      init: jest.fn(),
      framework: {},
      smAndDown: true,
    }
    const vuetify = new Vuetify()
    vuetify.framework.breakpoint = breakpoint
    wrapper = render(Choice, {
      vuetify,
    })
  })

  it('loaded sections successfully', async () => {
    screen.getByText(/Enrollment Type/)
    screen.getByText(/Technical Platform/)
    screen.getByText(/Delivery Platform/)
    screen.getByText(/School/)
    screen.getByText(/Platform Discipline/)
    screen.getByText(/HX Discipline/)
    screen.getByText(/Project Status/)
    screen.getByText(/Role/)
    screen.getByText(/People/)
  })

  it('runs setup_option values properly', async() => {
    const localThis = {
      setup_options: [{
        'proper_name': 'Enrollment Type',
        'tech_name': 'enrollmenttype',
        'key': 'name',
      }, {
        'proper_name': 'Technical Platform',
        'tech_name': 'technicalplatform',
        'key': 'name'
      }, {
        'proper_name': 'Delivery Platform',
        'tech_name': 'deliveryplatform',
        'key': 'name'
      }, {
        'proper_name': 'School',
        'tech_name': 'school',
        'key': 'name',
        'par': 'description',
        'proper_par_name': 'Full School Name'
      }, {
        'proper_name': 'Platform Discipline',
        'tech_name': 'platformdiscipline',
        'key': 'name',
        'par': 'platform',
        'proper_par_name': 'Platform Name'
      }, {
        'proper_name': 'HX Discipline',
        'tech_name': 'hxdiscipline',
        'key': 'name'
      }, {
        'proper_name': 'Project Status',
        'tech_name': 'projectstatus',
        'key': 'name'
      }, {
        'proper_name': 'Role',
        'tech_name': 'role',
        'key': 'name'
      }]
    }
    expect(Choice.computed.values.call(localThis)).toStrictEqual({"deliveryplatform": undefined, "enrollmenttype": undefined, "hxdiscipline": undefined, "platformdiscipline": undefined, "projectstatus": undefined, "role": undefined, "school": undefined, "technicalplatform": undefined})
 
    const localThis2 = {
      setup_options: [{
        'proper_name': 'Enrollment Type',
        'tech_name': 'enrollmenttype',
        'key': 'name',
      }, {
        'proper_name': 'Technical Platform',
        'tech_name': 'technicalplatform',
        'key': 'name'
      }, {
        'proper_name': 'Delivery Platform',
        'tech_name': 'deliveryplatform',
        'key': 'name'
      }, {
        'proper_name': 'School',
        'tech_name': 'school',
        'key': 'name',
        'par': 'description',
        'proper_par_name': 'Full School Name'
      }, {
        'proper_name': 'Platform Discipline',
        'tech_name': 'platformdiscipline',
        'key': 'name',
        'par': 'platform',
        'proper_par_name': 'Platform Name'
      }, {
        'proper_name': 'HX Discipline',
        'tech_name': 'hxdiscipline',
        'key': 'name'
      }, {
        'proper_name': 'Project Status',
        'tech_name': 'projectstatus',
        'key': 'name'
      }, {
        'proper_name': 'Role',
        'tech_name': 'role',
        'key': 'name'
      }],
      enrollmenttype: [{"name":"audit"},{"name":"flipped"},{"name":"limited"},{"name":"open"},{"name":"other"},{"name":"spoc"}],
      technicalplatform: [{"name":"canvas","description":null},{"name":"edx","description":null},{"name":"hbso","description":null},{"name":"moodle","description":null},{"name":"other","description":null},{"name":"UNDEF","description":null}],
      deliveryplatform: [{"name":"Canvas","description":null},{"name":"edge-edX","description":null},{"name":"edX","description":null},{"name":"GetSmarter","description":null},{"name":"HBSO","description":null},{"name":"HXPLUS","description":null},{"name":"other","description":null},{"name":"UNDEF","description":null}],
      school: [{"name":"FAS","description":"Faculty of Arts & Sciences"},{"name":"GSD","description":"Graduate School of Design"},{"name":"HarvardX","description":"HarvardX"},{"name":"HBS","description":"Harvard Business School"},{"name":"HDS","description":"Harvard Divinity School"},{"name":"HGSE","description":"Harvard Graduate School of Education"},{"name":"HKS","description":"Harvard Kennedy School"},{"name":"HLS","description":"Harvard Law School"},{"name":"HMS","description":"Harvard Medical School"},{"name":"HSPH","description":"Harvard School of Public Health"},{"name":"SEAS","description":"School of Engineering and Applied Sciences"}],
      platformdiscipline: [{"pk":39,"name":"Architecture","platform":"Canvas"},{"pk":1,"name":"Architecture","platform":"edX"},{"pk":2,"name":"Art & Culture","platform":"edX"},{"pk":3,"name":"Biology & Life Sciences","platform":"edX"},{"pk":4,"name":"Business & Management","platform":"edX"},{"pk":5,"name":"Chemistry","platform":"edX"},{"pk":6,"name":"Communication","platform":"edX"},{"pk":7,"name":"Computer Science","platform":"edX"},{"pk":8,"name":"Data Analysis & Statistics","platform":"edX"},{"pk":9,"name":"Design","platform":"edX"},{"pk":10,"name":"Economics & Finance","platform":"edX"},{"pk":11,"name":"Education & Teacher Training","platform":"edX"},{"pk":12,"name":"Electronics","platform":"edX"},{"pk":13,"name":"Energy & Earth Sciences","platform":"edX"},{"pk":14,"name":"Engineering","platform":"edX"},{"pk":15,"name":"Environmental Studies","platform":"edX"},{"pk":16,"name":"Ethics","platform":"edX"},{"pk":17,"name":"Food & Nutrition","platform":"edX"},{"pk":18,"name":"Health & Safety","platform":"edX"},{"pk":19,"name":"History","platform":"edX"},{"pk":20,"name":"Humanities","platform":"edX"},{"pk":21,"name":"Language","platform":"edX"},{"pk":22,"name":"Law","platform":"edX"},{"pk":23,"name":"Literature","platform":"edX"},{"pk":24,"name":"Math","platform":"edX"},{"pk":25,"name":"Medicine","platform":"edX"},{"pk":26,"name":"Music","platform":"edX"},{"pk":31,"name":"Other","platform":"edX"},{"pk":27,"name":"Philosophy & Ethics","platform":"edX"},{"pk":28,"name":"Physics","platform":"edX"},{"pk":29,"name":"Science","platform":"edX"},{"pk":30,"name":"Social Sciences","platform":"edX"},{"pk":43,"name":"Data Analysis & Statistics","platform":"GetSmarter"},{"pk":44,"name":"Education & Teacher Training","platform":"GetSmarter"},{"pk":45,"name":"Law","platform":"GetSmarter"},{"pk":32,"name":"Analytics","platform":"HBSO"},{"pk":33,"name":"Business Essentials","platform":"HBSO"},{"pk":34,"name":"Business in Society","platform":"HBSO"},{"pk":35,"name":"Entrepreneurship & Innovation","platform":"HBSO"},{"pk":36,"name":"Finance & Accounting","platform":"HBSO"},{"pk":37,"name":"Leadership & Management","platform":"HBSO"},{"pk":38,"name":"Strategy","platform":"HBSO"},{"pk":40,"name":"Biology & Life Sciences","platform":"HXPLUS"},{"pk":41,"name":"Law","platform":"HXPLUS"},{"pk":42,"name":"Literature","platform":"HXPLUS"},{"pk":46,"name":"Architecture","platform":"other"},{"pk":47,"name":"Biology & Life Sciences","platform":"other"},{"pk":48,"name":"Computer Science","platform":"other"},{"pk":49,"name":"Law","platform":"other"},{"pk":50,"name":"Medicine","platform":"other"},{"pk":51,"name":"Science","platform":"other"}],
      hxdiscipline: [{"name":"Alumni"},{"name":"Arts & Humanities"},{"name":"Business"},{"name":"Computer Sciences & Engineering"},{"name":"Health Sciences"},{"name":"Mathematics"},{"name":"Natural Sciences"},{"name":"Social Sciences"}],
      projectstatus: [{"name":"seedling"},{"name":"letter-of-interest"},{"name":"scope-of-work"},{"name":"in-development"},{"name":"live"},{"name":"closed"},{"name":"archived"},{"name":"cancelled"},{"name":"paused"},{"name":"open"}],
      role: [{"name":"seedling"},{"name":"letter-of-interest"},{"name":"scope-of-work"},{"name":"in-development"},{"name":"live"},{"name":"closed"},{"name":"archived"},{"name":"cancelled"},{"name":"paused"},{"name":"open"}],
    }
    expect(Choice.computed.values.call(localThis2)).toStrictEqual({"deliveryplatform": [{"name":"Canvas","description":null},{"name":"edge-edX","description":null},{"name":"edX","description":null},{"name":"GetSmarter","description":null},{"name":"HBSO","description":null},{"name":"HXPLUS","description":null},{"name":"other","description":null},{"name":"UNDEF","description":null}], "enrollmenttype": [{"name":"audit"},{"name":"flipped"},{"name":"limited"},{"name":"open"},{"name":"other"},{"name":"spoc"}], "hxdiscipline": [{"name":"Alumni"},{"name":"Arts & Humanities"},{"name":"Business"},{"name":"Computer Sciences & Engineering"},{"name":"Health Sciences"},{"name":"Mathematics"},{"name":"Natural Sciences"},{"name":"Social Sciences"}], "platformdiscipline": [{"pk":39,"name":"Architecture","platform":"Canvas"},{"pk":1,"name":"Architecture","platform":"edX"},{"pk":2,"name":"Art & Culture","platform":"edX"},{"pk":3,"name":"Biology & Life Sciences","platform":"edX"},{"pk":4,"name":"Business & Management","platform":"edX"},{"pk":5,"name":"Chemistry","platform":"edX"},{"pk":6,"name":"Communication","platform":"edX"},{"pk":7,"name":"Computer Science","platform":"edX"},{"pk":8,"name":"Data Analysis & Statistics","platform":"edX"},{"pk":9,"name":"Design","platform":"edX"},{"pk":10,"name":"Economics & Finance","platform":"edX"},{"pk":11,"name":"Education & Teacher Training","platform":"edX"},{"pk":12,"name":"Electronics","platform":"edX"},{"pk":13,"name":"Energy & Earth Sciences","platform":"edX"},{"pk":14,"name":"Engineering","platform":"edX"},{"pk":15,"name":"Environmental Studies","platform":"edX"},{"pk":16,"name":"Ethics","platform":"edX"},{"pk":17,"name":"Food & Nutrition","platform":"edX"},{"pk":18,"name":"Health & Safety","platform":"edX"},{"pk":19,"name":"History","platform":"edX"},{"pk":20,"name":"Humanities","platform":"edX"},{"pk":21,"name":"Language","platform":"edX"},{"pk":22,"name":"Law","platform":"edX"},{"pk":23,"name":"Literature","platform":"edX"},{"pk":24,"name":"Math","platform":"edX"},{"pk":25,"name":"Medicine","platform":"edX"},{"pk":26,"name":"Music","platform":"edX"},{"pk":31,"name":"Other","platform":"edX"},{"pk":27,"name":"Philosophy & Ethics","platform":"edX"},{"pk":28,"name":"Physics","platform":"edX"},{"pk":29,"name":"Science","platform":"edX"},{"pk":30,"name":"Social Sciences","platform":"edX"},{"pk":43,"name":"Data Analysis & Statistics","platform":"GetSmarter"},{"pk":44,"name":"Education & Teacher Training","platform":"GetSmarter"},{"pk":45,"name":"Law","platform":"GetSmarter"},{"pk":32,"name":"Analytics","platform":"HBSO"},{"pk":33,"name":"Business Essentials","platform":"HBSO"},{"pk":34,"name":"Business in Society","platform":"HBSO"},{"pk":35,"name":"Entrepreneurship & Innovation","platform":"HBSO"},{"pk":36,"name":"Finance & Accounting","platform":"HBSO"},{"pk":37,"name":"Leadership & Management","platform":"HBSO"},{"pk":38,"name":"Strategy","platform":"HBSO"},{"pk":40,"name":"Biology & Life Sciences","platform":"HXPLUS"},{"pk":41,"name":"Law","platform":"HXPLUS"},{"pk":42,"name":"Literature","platform":"HXPLUS"},{"pk":46,"name":"Architecture","platform":"other"},{"pk":47,"name":"Biology & Life Sciences","platform":"other"},{"pk":48,"name":"Computer Science","platform":"other"},{"pk":49,"name":"Law","platform":"other"},{"pk":50,"name":"Medicine","platform":"other"},{"pk":51,"name":"Science","platform":"other"}], "projectstatus": [{"name":"seedling"},{"name":"letter-of-interest"},{"name":"scope-of-work"},{"name":"in-development"},{"name":"live"},{"name":"closed"},{"name":"archived"},{"name":"cancelled"},{"name":"paused"},{"name":"open"}], "role": [{"name":"seedling"},{"name":"letter-of-interest"},{"name":"scope-of-work"},{"name":"in-development"},{"name":"live"},{"name":"closed"},{"name":"archived"},{"name":"cancelled"},{"name":"paused"},{"name":"open"}], "school": [{"name":"FAS","description":"Faculty of Arts & Sciences"},{"name":"GSD","description":"Graduate School of Design"},{"name":"HarvardX","description":"HarvardX"},{"name":"HBS","description":"Harvard Business School"},{"name":"HDS","description":"Harvard Divinity School"},{"name":"HGSE","description":"Harvard Graduate School of Education"},{"name":"HKS","description":"Harvard Kennedy School"},{"name":"HLS","description":"Harvard Law School"},{"name":"HMS","description":"Harvard Medical School"},{"name":"HSPH","description":"Harvard School of Public Health"},{"name":"SEAS","description":"School of Engineering and Applied Sciences"}], "technicalplatform": [{"name":"canvas","description":null},{"name":"edx","description":null},{"name":"hbso","description":null},{"name":"moodle","description":null},{"name":"other","description":null},{"name":"UNDEF","description":null}]})
    const schoolVerify = Choice.computed.schoolCheck.call(localThis2)
    expect(schoolVerify[0].call(localThis2, undefined)).toBe(true)
    expect(schoolVerify[0].call(localThis2, 'HKS')).toBe(true)
    expect(schoolVerify[0].call(localThis2, 'HKS,ABC')).toBe("Affiliation(s) must be a valid school acronym, i.e. HBS, HKS")
  })

  it('runs filter method correctly', async () => {
    const testString = 'ABcd'
    expect(Choice.methods.filter(testString, 'A')).toBe(true)
    expect(Choice.methods.filter(testString, 'b')).toBe(true)
    expect(Choice.methods.filter(testString, 'C')).toBe(true)
    expect(Choice.methods.filter(testString, 'd')).toBe(true)
    expect(Choice.methods.filter(testString, 'e')).toBe(false)
    expect(Choice.methods.filter(null, 'A')).toBe(false)
    expect(Choice.methods.filter(testString, null)).toBe(false)
    expect(Choice.methods.filter(['A'], 'A')).toBe(false)
  })
  
  it('runs getPeople correctly', async () => {
  })

})