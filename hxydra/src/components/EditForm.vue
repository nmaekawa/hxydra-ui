<template>
  <v-container id="edit-form">
    <v-snackbar
      v-model="errorBox"
      data-testid="errorBox"
      centered
    >
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          dark
          v-bind="attrs"
          @click="errorBox = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-form
      ref="editform"
    >
      <v-container>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="course.title"
              label="Project Name"
              :rules="titleLength"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-5">
          <v-col class="col-7">
            <v-text-field
              v-model="course.common_name"
              label="Common Project Name"
              :rules="commonNameLength"
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
                clearable
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
                      clearable
                      @click:clear="course.sow_approval_date = ''"
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
                      clearable
                      @click:clear="course.faculty_agreement_date = ''"
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
                      clearable
                      @click:clear="course.advertise_date = ''"
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
                      label="Course Enrollment Date"
                      prepend-icon="mdi-calendar-month"
                      :value="enrollmentCutOffDateDisplay"
                      v-on="on"
                      clearable
                      @click:clear="course.enrollment_date = ''"
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
                      label="Cert Enrollment Date"
                      prepend-icon="mdi-calendar-month"
                      :value="IDVCutOffDateDisplay"
                      v-on="on"
                      clearable
                      @click:clear="course.cert_enrollment_date = ''"
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
                      clearable
                      @click:clear="course.marketing_live_date = ''"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="course.marketing_live_date"
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
              :rules="lessThanMax"
              oninput="if (this.value < 1) {this.value = 0}"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-4">
            <v-text-field
              v-model="course.estimated_effort_max"
              label="Estimated hrs per week (Max)"
              type="number"
              :rules="greaterThanMin"
              oninput="if (this.value < 1) {this.value = 0}"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-4">
            <v-text-field
              v-model="course.duration_weeks"
              label="Course Length"
              type="number"
              :rules="posIntRules"
              oninput="if (this.value < 1) {this.value = 0}"
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
                      <td>
                        {{item['person']['first_name']}} {{item['person']['last_name']}}
                      </td>
                      <td>
                        <v-autocomplete
                          v-model="item.role"
                          :items="role"
                          :filter="filter"
                          label="Role"
                        >
                        </v-autocomplete>
                      </td>
                      <td>
                        <v-container>
                          <v-row>
                            <v-col class="col-12">
                              <v-btn
                                @click="deletePerson(item)"
                              >
                                <v-icon
                                  small
                                >
                                  mdi-delete
                                </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:foot>
                    <td class="pa-5">
                      <v-autocomplete
                        :items="people"
                        :filter="filter"
                        item-text="name"
                        label="Add Person"
                        v-model="addPerson"
                      ></v-autocomplete>
                    </td>
                    <td class="pa-5">
                      <v-autocomplete
                          :items="role"
                          :filter="filter"
                          label="Add role"
                          v-model="addRole"
                        >
                        </v-autocomplete>
                    </td>
                    <td class="pa-5 d-flex justify-center">
                      <v-btn
                       color="primary"
                       @click="addTeam"
                      >Add</v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-row>
      <v-col class="col-6 d-flex justify-center">
    <v-btn
      color="primary"
      @click="saveChanges"
    >Update</v-btn></v-col>
    <v-col class="col-6 d-flex justify-center"><v-btn @click="closeEdit">Cancel</v-btn></v-col>
    </v-row>
  </v-container>
</template>
<style>
  #edit-form table {
    border: 1px solid black;
  }
  .v-menu__content::-webkit-scrollbar{
    -webkit-appearance: none;
    width:  7px;
  }
  .v-menu__content::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
  .v-menu__content {
    background: white;
  }
</style>

<script>
  export default {
    name: 'EditForm',
    props: {
      course: Object
    },
    data: () => ({
      errorBox: false,
      errorMessage: '',
      addPerson: '',
      addRole: '',
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
        value: 'name',
        width: '60%'
      }, {
        text: 'Role on Team',
        sortable: true,
        value: 'role',
        width: '30%'
      }, {
        text: 'Actions',
        sortable: false,
        width: '10%'
      }],
      searchTeam: '',
      people: [],
      full_people: [],
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
                    'text': f[s['key']]
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
        this.full_people = data
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
        this.$emit('closeEdit', false)
      },
      saveChanges () {
        let self = this;
        let options = JSON.parse(JSON.stringify(this.course))
        if (options.fuzzy_launch_date && options.fuzzy_launch_date.length > 0) {
          options.is_fuzzy_launch_date = true
          options.launch_date = null
          options.end_date = null
        } else {
          options.is_fuzzy_launch_date = false
          options.launch_date = self.normalizeDate(options.launch_date)
          options.end_date = self.normalizeDate(options.end_date)
        }

        options.faculty_agreement_date = self.normalizeDate(options.faculty_agreement_date)
        options.sow_approval_date = self.normalizeDate(options.sow_approval_date)
        options.advertise_date = self.normalizeDate(options.advertise_date)
        options.enrollment_date = self.normalizeDate(options.enrollment_date)
        options.cert_enrollment_date = self.normalizeDate(options.cert_enrollment_date)
        options.marketing_live_date = self.normalizeDate(options.marketing_live_date)
        if (options.subactivity === '') {
          options.subactivity = null
        }

        this.$http.put(
            'https://devo2.hxydra.hxtech.org/v1/kondo/project/' + this.course.nickname + '/',
            options
          ).then(data => {
            console.log("Updated", data)
            this.$emit('closeEdit', this.course)
          }).catch(e => {
            console.log('uh', e)
            self.errorBox = true
              let mess = `(${e.response.status}) ${e.response.statusText}`
              switch(e.response.status) {
                case 400:
                  self.errorMessage = mess + ` - Missing/Invalid Parameter`
                  break
                case 409:
                  self.errorMessage = mess + ` - Nickname already exists`
                  break
                case 401:
                  self.errorMessage = mess + ` - Log in required`
                  break
                case 403:
                  self.errorMessage = mess + ` - Requires Permission`
                  break
                default:
                  self.errorMessage = mess
              }
          })
        
      },
      getDate(d_str) {
        if (typeof(d_str) == 'undefined' || d_str === '' || d_str === null) {
          return ''
        }
        return new Date(d_str).toISOString().substring(0,10)
      },
      normalizeDate(dateStr) {
        if (dateStr && dateStr.length > 0) {
          return new Date(dateStr)
        } else {
          return null
        }
      },
      addTeam() {
        let personItem = this.full_people.filter(e => (e.first_name + " " + e.last_name) == this.addPerson)[0]
        this.course.team.push({
          project: this.course.nickname,
          person: personItem,
          role: this.addRole
        })
        this.addPerson = ""
        this.addRole = ""
      },
      deletePerson(item) {
        this.course.team = this.course.team.filter(e => e.pk != item.pk)
        console.log(item)
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
        return this.getDate(this.course.marketing_live_date)
      },
      filteredPlatformDiscipline() {
        return this.platformdiscipline.filter(d => d.par == this.course.delivery_platform)
      },
      posIntRules () {
        const rules = []
        const ruleMin = v => v > -1 || 'Cannot be negative'
        rules.push(ruleMin)
        return rules
      },
      lessThanMax() {
        const rules = []
        const ruleMin = v => v > -1 || 'Cannot be negative'
        const ruleLtMax = v => v <= this.course.estimated_effort_max || 'Cannot be more than max'
        rules.push(ruleMin)
        rules.push(ruleLtMax)
        return rules
      },
      greaterThanMin() {
        const rules = []
        const ruleGtMin = v => v >= this.course.estimated_effort_min || 'Cannot be less than min effort'
        rules.push(ruleGtMin)
        return rules
      },
      titleLength() {
        const rules = []
        const maxTitle = v => v.length < 500 || 'Must be max 500 chars'
        rules.push(maxTitle)
        return rules
      },
      commonNameLength() {
        const rules = []
        const maxNameLength = v => v.length < 50 || 'Must be max 50 chars'
        rules.push(maxNameLength)
        return rules
      }
    }
  }
</script>