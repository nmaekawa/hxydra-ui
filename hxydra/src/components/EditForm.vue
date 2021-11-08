<template>
  <v-container id="edit-form">
    <v-form
      ref="editform"
    >
      <v-container>
        <v-row>
          <v-col class="col-3">
            <v-text-field
              v-model="course.nickname"
              label="nickname"
              required
            ></v-text-field>
          </v-col><v-col class="col-3">
            <v-text-field
              label="Course Run"
              v-model="course.courseRun"
              placeholder="2T2021"
              required
            ></v-text-field>
          </v-col> <v-col class="col-3">
            <v-text-field
              :value="getVersionNum(course.nickname)"
              label="Version Number"
              type="number"
              required
            ></v-text-field>
          </v-col><v-col class="col-3">
            <v-text-field
              v-model="course.courseNumber"
              label="Course Number"
              placeholder="AA123x"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="course.title"
              label="Project Name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-6">
            <v-text-field
              v-model="course.commonProjectName"
              label="Common Project Name"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-6">
            <v-text-field
              label="Course ID"
              v-model="course.courseId"
              placeholder="HarvardX/PH207x/2012_Fall"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-4">
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
          </v-col><v-col class="col-4">
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
          <v-col class="mx-a col-4">
            <v-layout row wrap>
              <v-menu
                v-model="publishedDatePop"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
                max-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    label="Published Date"
                    prepend-icon="mdi-calendar-month"
                    :value="publishedDateDisplay"
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="course.publishedDate"
                  no-title
                  @change="publishedDatePop = false"
                >
                </v-date-picker>
              </v-menu>
            </v-layout>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col class="col-3">
            <v-select
              :items="projectstatus"
              label="Status"
              v-model="course.status"
              multiple
            ></v-select>
          </v-col>
          <v-col class="col-9">
            <v-text-field
              v-model="course.aboutPageUrl"
              label="About Page Url"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="course.publicCourseUrl"
              label="Public Course Url"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-3">
            <v-text-field
              v-model="course.effortMin"
              label="Estimated hrs per week (Min)"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-text-field
              v-model="course.effortMax"
              label="Estimated hrs per week (Max)"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-text-field
              v-model="course.courseLength"
              label="Course Length"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-text-field
              v-model="course.passRate"
              label="Pass Rate"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-3">
            <v-select
              :items="enrollmenttype"
              label="Enrollment Type"
              v-model="course.enrollmentType"
            ></v-select>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="deliveryplatform"
              label="Delivery Platform"
              v-model="course.deliveryPlatform"
            ></v-select>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="technicalplatform"
              label="Technical Platform"
              v-model="course.technicalPlatform"
            ></v-select>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="school"
              label="Revenue Schools"
              v-model="course.revenueSchool"
              multiple
            ></v-select>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="school"
              label="Affiliation"
              v-model="course.affiliation"
              multiple
            ></v-select>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="platformdiscipline"
              label="Discipline(s)"
              v-model="course.discipline"
              multiple
            ></v-select>
          </v-col>
          <v-col class="col-3">
            <v-select
              :items="platformdiscipline"
              label="edX Subjects"
              v-model="course.edXSubject"
              multiple
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-a col-6">
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
                  v-model="course.IDVCutOffDate"
                  no-title
                  @change="IDVCutOffDatePop = false"
                >
                </v-date-picker>
              </v-menu>
            </v-layout>
          </v-col>
          <v-col class="mx-a col-6">
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
                  v-model="course.enrollmentCutOffDate"
                  no-title
                  @change="enrollmentCutOffDatePop = false"
                >
                </v-date-picker>
              </v-menu>
            </v-layout>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-3">
            <v-checkbox
              v-model="course.IDVCertAvailable"
              label="IDV Certificate Available"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-3">
            <v-checkbox
              v-model="course.has_cert_honor_code"
              label="Certificate?"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-3">
            <v-checkbox
              v-model="course.selfPaced"
              label="Self-Paced"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-3">
            <v-checkbox
              v-model="course.facultyAgreementsSigned"
              label="Faculty Agreements Signed"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-card flat>
                <v-data-table
                  :headers="teamHeaders"
                  :items="course.teamMembers"
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
                          :items="roles"
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
                          :items="roles"
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
      roles: [],
      launchDatePop: false,
      endDatePop: false,
      publishedDatePop: false,
      IDVCutOffDatePop: false,
      enrollmentCutOffDatePop: false,
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
              console.log('woo', e, s['tech_name'], this[s['tech_name']])
              this[s['tech_name']] = e.data.map(f => f[s['key']])
              console.log("wee", this[s['tech_name']])
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
          process.env.BASE_URL + 'people.json'
        );
        this.people = data.map(p => (p.first_name + ' ' + p.last_name))
        console.log(this.people)
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
        
      }
    },
    mounted() {
      this.getChoices()
      this.getPeople()
    },
    computed: {
      launchDateDisplay() {
        return this.course.launch_date
      },
      endDateDisplay() {
        return this.course.end_date
      },
      publishedDateDisplay() {
        return this.course.publishedDate
      },
      IDVCutOffDateDisplay() {
        return this.course.IDVCutOffDate
      },
      enrollmentCutOffDateDisplay() {
        return this.course.enrollmentCutOffDate
      }
    }
  }
</script>