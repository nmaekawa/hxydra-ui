<template>
  <v-container id="edit-form">
    <v-form
      ref="editform"
    >
      <v-container>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="course.title"
              label="Project Name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-5">
          <v-col class="col-7">
            <v-text-field
              v-model="course.common_name"
              label="Common Project Name"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="course.subactivity"
              label="Subactivity"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="projectstatus"
              label="Status"
              v-model="course.status"
              multiple
            ></v-select>
          </v-col>
        </v-row>
        <v-card class="pa-5 mb-5">
          <v-card-subtitle>Course Run Metadata</v-card-subtitle>
          <v-row>
            <v-col class="col-3">
              <v-text-field
                v-model="course.prefix"
                label="Project Prefix"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="col-2">
              <v-text-field
                v-model="course.sequence"
                label="Seq #"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="col-2">
              <v-text-field
                v-model="course.version"
                label="Version"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="col-2">
              <v-text-field
                v-model="course.run"
                label="Rerun #"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="col-3">
              <v-text-field
                v-model="course.nickname"
                label="nickname"
                required
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-3">
              <v-text-field
                label="Course Run"
                v-model="course.program_run"
                placeholder="e.g., 2T2021"
                required
              ></v-text-field>
            </v-col><v-col class="col-3">
              <v-text-field
                v-model="course.program_code"
                label="Course Number"
                placeholder="e.g., AA123x"
                required
              ></v-text-field>
            </v-col>
            <v-col class="col-6">
              <v-text-field
                v-model="course.program_id"
                label="Course ID"
                placeholder="e.g., HarvardX/AA123x/2T2021"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="pa-5 mb-5">
          <v-card-subtitle>Dates</v-card-subtitle>
          <v-row>
            <v-col class="col-4 mt-3">
              <v-layout row wrap>
                <v-menu
                  v-model="launchDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Launch Date"
                      prepend-icon="mdi-calendar-month"
                      :value="launchDateDisplay"
                      v-on="on"
                      clearable
                      @click:clear="course.launch_date = ''"
                      :disabled="course.fuzzy_launch_date !== null && course.fuzzy_launch_date.length > 0"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.launch_date"
                    no-title
                    @change="launchDatePop = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-layout>
            </v-col><v-col class="col-4 mt-3">
              <v-layout row wrap>
                <v-menu
                  v-model="endDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="End Date"
                      prepend-icon="mdi-calendar-month"
                      :value="endDateDisplay"
                      v-on="on"
                      clearable
                      @click:clear="course.end_date = ''"
                      :disabled="course.fuzzy_launch_date !== null && course.fuzzy_launch_date.length > 0"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.end_date"
                    no-title
                    @change="endDatePop = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
            <v-col class="col-4">
              <v-text-field
                label="Approximate Launch & End Date"
                v-model="course.fuzzy_launch_date"
                :disabled="course.launch_date !== null && (course.launch_date.length > 0 || course.end_date.length > 0)"

              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mx-a col-4">
              <v-layout row wrap>
                <v-menu
                  v-model="sowDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="SOW Approval Date"
                      prepend-icon="mdi-calendar-month"
                      :value="sowDateDisplay"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.sow_approval_date"
                    no-title
                    @change="sowDatePop = false"
                  ></v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
            <v-col class="mx-a col-4">
              <v-layout row wrap>
                <v-menu
                  v-model="facDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Faculty Agreement Signed Date"
                      prepend-icon="mdi-calendar-month"
                      :value="facDateDisplay"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.faculty_agreement_date"
                    no-title
                    @change="facDatePop = false"
                  ></v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
            <v-col class="mx-a col-4">
              <v-layout row wrap>
                <v-menu
                  v-model="advertiseDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Advertise Date"
                      prepend-icon="mdi-calendar-month"
                      :value="advertiseDateDisplay"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.advertise_date"
                    no-title
                    @change="advertiseDatePop = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mx-a col-4">
              <v-layout row wrap>
                <v-menu
                  v-model="enrollmentCutOffDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Enrollment Cutoff Date"
                      prepend-icon="mdi-calendar-month"
                      :value="enrollmentCutOffDateDisplay"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.enrollment_date"
                    no-title
                    @change="enrollmentCutOffDatePop = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
            <v-col class="mx-a col-4">
              <v-layout row wrap>
                <v-menu
                  v-model="IDVCutOffDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="IDV Cutoff Date"
                      prepend-icon="mdi-calendar-month"
                      :value="IDVCutOffDateDisplay"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.cert_enrollment_date"
                    no-title
                    @change="IDVCutOffDatePop = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
            <v-col class="mx-a col-4">
              <v-layout row wrap>
                <v-menu
                  v-model="marketingDatePop"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Marketing Date"
                      prepend-icon="mdi-calendar-month"
                      :value="marketingDateDisplay"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.marketing_date"
                    no-title
                    @change="marketingDatePop = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-layout>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="pa-5 mb-5">
          <v-card-subtitle>Certificate</v-card-subtitle>
          <v-row>
            <v-col class="col-3">
              <v-checkbox
                v-model="course.cert_available"
                label="Certificate Available"
              >
              </v-checkbox>
            </v-col>
            <v-col class="col-3">
              <v-text-field
                number
                v-model="course.cert_price"
                label="Certificate Price"
                :disabled="!course.cert_available"
              >
              </v-text-field>
            </v-col>
            <v-col class="col-3">
              <v-text-field
                number
                v-model="course.cert_rate_to_certify"
                label="Rate to Certify"
                :disabled="!course.cert_available"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="pa-5 mb-5">
          <v-card-subtitle>Other Info</v-card-subtitle>
          <v-row>
            <v-col class="col-3">
                <v-checkbox
                  v-model="course.self_paced"
                  label="Self-Paced"
                >
                </v-checkbox>
              </v-col>
          </v-row>
          <v-row>
          <v-col class="col-4">
            <v-text-field
              v-model="course.estimated_effort_min"
              label="Estimated hrs per week (Min)"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-4">
            <v-text-field
              v-model="course.estimated_effort_max"
              label="Estimated hrs per week (Max)"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-4">
            <v-text-field
              v-model="course.duration_weeks"
              label="Course Length"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
          <v-row>
          <v-col class="col-4">
            <v-select
              :items="enrollmenttype"
              label="Enrollment Type"
              v-model="course.enrollment_type"
            ></v-select>
          </v-col>
          <v-col class="col-4">
            <v-select
              :items="deliveryplatform"
              label="Delivery Platform"
              v-model="course.delivery_platform"
            ></v-select>
          </v-col>
          <v-col class="col-4">
            <v-select
              :items="technicalplatform"
              label="Technical Platform"
              v-model="course.technical_platform"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-6">
            <v-select
              :items="school"
              label="Revenue Schools"
              v-model="course.revenue_school"
              multiple
            ></v-select>
          </v-col>
          <v-col class="col-6">
            <v-select
              :items="school"
              label="Affiliation"
              v-model="course.sponsoring_school"
              multiple
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-6">
            <v-select
              :items="hxdiscipline"
              label="HX Disciplines (Marketing)"
              v-model="course.hx_discipline"
              multiple
            >
            </v-select>
          </v-col>
          <v-col class="col-6">
            <v-select
              :items="filteredPlatformDiscipline"
              label="Platform Disciplines"
              v-model="course.platform_discipline"
              no-data-text="No Disciplines for chosen Delivery Platform"
              multiple
            ></v-select>
          </v-col>
        </v-row>
        </v-card>
        <v-card class="pa-5 mb-5">
          <v-card-subtitle>URLs</v-card-subtitle>
          <v-row>
            <v-col class="col-12">
                <v-text-field
                  v-model="course.enrollment_page_url"
                  label="Enrollment Page Url"
                >
                </v-text-field>
              </v-col>
            <v-col class="col-12">
              <v-text-field
                v-model="course.public_url"
                label="Public Url"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col class="col-12">
            <v-card flat>
                <v-data-table
                  :headers="teamHeaders"
                  :items="course.team"
                  :items-per-page="10"
                  :footer-props="{
                    showFirstLastPage: false,
                    itemsPerPageOptions: [5, 10, 20]
                  }
                  "
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td class="col-7">
                        {{item['name']}}
                      </td>
                      <td class="col-3">
                        <v-autocomplete
                          v-model="item.role"
                          :items="role"
                          :filter="filter"
                          label="Role"
                        >
                        </v-autocomplete>
                      </td>
                      <td class="col-2">
                        <v-container>
                          <v-row>
                            <v-col class="col-12">
                              <v-icon
                                small
                              >
                                mdi-delete
                              </v-icon>
                            </v-col>
                          </v-row>
                        </v-container>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:foot>
                    <td class="col-7">
                      <v-autocomplete
                        :items="people"
                        :filter="filter"
                        item-text="name"
                        label="Add Person"
                      ></v-autocomplete>
                    </td>
                    <td class="col-3">
                      <v-autocomplete
                          :items="role"
                          :filter="filter"
                          label="Add role"
                        >
                        </v-autocomplete>
                    </td>
                    <td class="col-2">
                      <v-btn
                       color="primary"
                      >Add</v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      color="primary"
      @click="saveChanges"
    >Create</v-btn>
    <v-btn @click="closeEdit">Cancel</v-btn>
  </v-container>
</template>
<style>
  #edit-form table {
    border: 1px solid black;
  }
</style>

<script>
  export default {
    name: 'EditForm',
    props: {
      course: Object
    },
    data: () => ({
      enrollmentTypes: [],
      revenueSchools: [],
      affiliations: [],
      disciplines: [],
      edXSubjects: [],
      role: [],
      launchDatePop: false,
      endDatePop: false,
      advertiseDatePop: false,
      IDVCutOffDatePop: false,
      enrollmentCutOffDatePop: false,
      sowDatePop: false,
      facDatePop: false,
      marketingDatePop: false,
      teamHeaders: [{
        text: 'Name',
        sortable: true,
        value: 'name'
      }, {
        text: 'Role on Team',
        sortable: true,
        value: 'role'
      }, {
        text: 'Actions',
        sortable: false
      }],
      searchTeam: '',
      people: [],
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
      enrollmenttype: [],
      technicalplatform: [],
      deliveryplatform: [],
      school: [],
      platformdiscipline: [],
      hxdiscipline: [],
      projectstatus: [],
      api_url_prefix: 'https://devo2.hxydra.hxtech.org/v1/kondo/',
      people_api_url: 'https://devo2.hxydra.hxtech.org/v1/kondo/person/',
      // course: {
      //   id: 'auto_id',
      //   created: 'date',
      //   created_by: 'string',
      //   modified: 'date',
      //   modified_by: 'string',
      //   project_title: 'Example Title',
      //   course_id: 'string',
      //   course_run: '',
      //   nickname: 'string',
      //   description: 'Example description of the project',
      //   //description_brief: 'string',
      //   type: 'string',
      //   //section_count: 'number',
      //   hrs_per_week: 1,
      //   launch_date: '2021-12-01',
      //   end_date: '2022-12-01',
      //   has_cert_honor_code: true,
      //   is_public: 'boolean',
      //   is_active: 'boolean',
      //   //v_discussion: '?',
      //   //pass_rate_to_certify: 'number',
      //   //count_asset_encumbrance
      //   //count_asset_encumbrance_approved
      //   //count_asset_encumbrance_denied
      //   //count_asset_encumbrance_has_use_rationale
      //   //count_asset_encumbrance_has_use_rationale_not_assessed
      //   //count_asset_encumbrance_needs_info
      //   //count_asset_encumbrance_ready_to_approve
      //   //count_assets
      //   //count_calendar
      //   //count_deliverables_expected
      //   //count_deliverables_under_construction
      //   url: 'string',
      //   rerun: 'string',
      //   version: 1,
      //   revenue_school: 'string',
      //   types: [],
      // }
    }),
    methods: {
      getChoices () {
        // TODO: Try to get all these list values in one go
        for (const s of this.setup_options) {
          console.log("what")
          this.$http.get(this.api_url_prefix +s['tech_name']+'/')
            .then(e => {
              if ('par' in s){
                this[s['tech_name']] = e.data.map(function(f) {
                  return {
                    'par': f[s['par']],
                    'text': f[s['key']] + ' (' + f[s['par']] + ')'
                  }
                })
              } else {
                this[s['tech_name']] = e.data.map(function(f) {
                  return {
                    'text': f[s['key']]
                  }
                })
              }
            })
            //.then(g => this.values[s['tech_name']] = g)
        }
      },
      getVersionNum (nickname) {
        const regEx = /_v([0-9]+)/g
        const arr = [...nickname.matchAll(regEx)]
        return arr[0][1];
      },
      async getPeople () {
        //eventually this should call a new API call that gets the full list of people
        const { data } = await this.$http.get(
          this.people_api_url
        );
        this.people = data.map(p => (p.first_name + ' ' + p.last_name))
        console.log("PEOPLE", this.people)
      },
      filter (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
      closeEdit () {
        console.log("Emitting closeEdit")
        this.$emit('closeEdit', '')
      },
      saveChanges () {
        console.log('why', this.course)
        this.$http.put(
            'https://devo2.hxydra.hxtech.org/v1/kondo/project/' + this.course.nickname + '/',
            this.course
          ).then(data => {
            console.log("Updated", data)
          }).catch(e => {
            console.log(e)
          }).finally( () => {
            this.$emit('closeEdit', '')
          })
        
      },
      getDate(d_str) {
        if (typeof(d_str) == 'undefined' || d_str === '' || d_str === null) {
          return ''
        }
        return new Date(d_str).toISOString().substring(0,10)
      }
    },
    mounted() {
      this.getChoices()
      this.getPeople()
    },
    computed: {
      launchDateDisplay() {
        return this.getDate(this.course.launch_date)
      },
      endDateDisplay() {
        return this.getDate(this.course.end_date)
      },
      advertiseDateDisplay() {
        return this.getDate(this.course.advertise_date)
      },
      IDVCutOffDateDisplay() {
        return this.getDate(this.course.cert_enrollment_date)
      },
      enrollmentCutOffDateDisplay() {
        return this.getDate(this.course.enrollment_date)
      },
      sowDateDisplay() {
        return this.getDate(this.course.sow_approval_date)
      },
      facDateDisplay() {
        return this.getDate(this.course.faculty_agreement_date)
      },
      marketingDateDisplay() {
        return this.getDate(this.course.marketing_date)
      },
      filteredPlatformDiscipline() {
        console.log(this.course.delivery_platform, this.platformdiscipline)
        return this.platformdiscipline.filter(d => d.par == this.course.delivery_platform)
      }
    }
  }
</script>