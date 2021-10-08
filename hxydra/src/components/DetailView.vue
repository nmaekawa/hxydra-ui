<template>
  <v-container>
    <v-row>
      <v-col class="col-lg-6 col-md-6 col-sm-12">
        <v-container>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Nickname:
            </v-col>
            <v-col class="col-lg-3 col-md-9 col-sm-4 col-9">
              {{course.nickname}}
            </v-col>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Course Run:
            </v-col>
            <v-col class="col-lg-3 col-md-9 col-sm-4 col-9">
              {{course.courseRun}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Course Number:
            </v-col>
            <v-col class="col-lg-3 col-md-9 col-sm-4 col-9">
              {{course.courseNumber}}
            </v-col>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Course ID:
            </v-col>
            <v-col class="col-lg-3 col-md-9 col-sm-4 col-9">
              {{course.courseId}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Project Title:
            </v-col>
            <v-col class="col-lg-8 col-md-9 col-sm-10 col-9">
              {{course.projectTitle}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Common Name:
            </v-col>
            <v-col class="col-lg-8 col-md-9 col-sm-10 col-9">
              {{course.commonProjectName}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Status
            </v-col>
            <v-col class="col-lg-8 col-md-9 col-sm-10 col-9">
              {{course.status}}
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <v-container>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Launch Date:
            </v-col>
            <v-col class="col-lg-3 col-md-8 col-sm-4 col-9">
              {{course.launchDate}}
            </v-col>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Subactivity:
            </v-col>
            <v-col class="col-lg-3 col-md-8 col-sm-4 col-9">
              {{course.subactivity}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              End Date:
            </v-col>
            <v-col class="col-lg-3 col-md-8 col-sm-4 col-9">
              {{course.endDate}}
            </v-col>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Published Date:
            </v-col>
            <v-col class="col-lg-3 col-md-8 col-sm-4 col-9">
              {{course.publishedDate}}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              About Page URL:
            </v-col>
            <v-col class="col-lg-8 col-md-8 col-sm-10 col-9">
              <a :href="course.aboutPageUrl">{{course.aboutPageUrl}}</a>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption col-lg-2 col-md-3 col-sm-2 col-3">
              Public Course URL:
            </v-col>
            <v-col class="col-lg-8 col-md-8 col-sm-10 col-9">
              <a :href="course.publicCourseUrl">{{course.publicCourseUrl}}</a>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-lg-12">
        <v-card>
          <v-toolbar dark>
            <template v-slot:extension>
              <v-tabs
                v-model="tab"
                align-with-title
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab
                  key="details"
                >
                  Details
                </v-tab>
                <v-tab
                  key="team"
                >
                  Team
                </v-tab>
                <v-tab
                  key="affiliation"
                >
                  Affiliation
                </v-tab>
                <v-tab
                  key="dissub"
                >
                  Discipline/edX Subject
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="tab">
            <v-tab-item
              key="details"
            >
              <v-card flat>
                <v-container>
                  <v-row>
                    <v-col class="col-lg-4 col-md-4 col-sm-12 col-12">
                      <v-container>
                        <v-row>
                          <v-col v-if="course.IDVCertAvailable" class="col-1 col-sm-1 col-md-2 col-lg-2 text-right pr-2">
                            <v-icon color="green">mdi-check-circle</v-icon>
                          </v-col>
                          <v-col v-else class="col-1 col-sm-1 col-md-2 col-lg-2 text-right pr-2">
                            <v-icon>mdi-close-octagon</v-icon>
                          </v-col>
                          <v-col class="col-10 col-sm-10 col-md-10 col-lg-10">
                            IDV Verified Certificate
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col v-if="course.selfPaced" class="col-1 col-sm-1 col-md-2 col-lg-2 text-right pr-2">
                            <v-icon color="green">mdi-check-circle</v-icon>
                          </v-col>
                          <v-col v-else class="col-1 col-sm-1 col-md-2 col-lg-2 text-right pr-2">
                            <v-icon>mdi-close-octagon</v-icon>
                          </v-col>
                          <v-col class="col-10 col-sm-10 col-md-10 col-lg-10">
                            Self-paced
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col v-if="course.facultyAgreementsSigned" class="col-1 col-sm-1 col-md-2 col-lg-2 text-right pr-2">
                            <v-icon color="green">mdi-check-circle</v-icon>
                          </v-col>
                          <v-col v-else class="col-1 col-sm-1 col-md-2 col-lg-2 text-right pr-2">
                            <v-icon>mdi-close-octagon</v-icon>
                          </v-col>
                          <v-col class="col-10 col-sm-10 col-md-10 col-lg-10">
                            Faculty Agreements Signed
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                    <v-col class="col-lg-4 col-md-4 col-sm-12 col-12">
                      <v-container>
                        <v-row>
                          <v-col class="col-6">
                            Enrollment Type: 
                          </v-col>
                          <v-col class="col-6" v-if="course.enrollmentType !== ''">
                            {{course.enrollmentType}}
                          </v-col>
                          <v-col v-else class="col-6">
                            N/A
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            Est. Effort (Min - Max): 
                          </v-col>
                          <v-col class="col-6">
                            {{course.effortMin}} - {{course.effortMax}} hrs
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            Course Length: 
                          </v-col>
                          <v-col class="col-6">
                            {{course.courseLength}} weeks
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            Pass Rate to Certify: 
                          </v-col>
                          <v-col v-if="course.passRate !== ''" class="col-6">
                            {{course.passRate}}
                          </v-col>
                          <v-col v-else class="col-6">
                            N/A
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            Enrollment Cutoff Date: 
                          </v-col>
                          <v-col v-if="course.IDVCutOffDate !== ''" class="col-6">
                            {{course.IDVCutOffDate}}
                          </v-col>
                          <v-col v-else class="col-6">
                            N/A
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            IDV Price: 
                          </v-col>
                          <v-col v-if="course.IDVPrice !== -1" class="col-6">
                            {{course.IDVPrice}}
                          </v-col>
                          <v-col v-else class="col-6">
                            N/A
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            IDV Cutoff Date: 
                          </v-col>
                          <v-col v-if="course.IDVCutOffDate !== ''" class="col-6">
                            {{course.IDVCutOffDate}}
                          </v-col>
                          <v-col v-else class="col-6">
                            N/A
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                    <v-col class="col-lg-4 col-md-4 col-sm-12 col-12">
                      <v-container>
                        <v-row>
                          <v-col class="col-6">
                            Delivery Platform: 
                          </v-col>
                          <v-col v-if="course.deliveryPlatform !== ''" class="col-6">
                            {{course.deliveryPlatform}}
                          </v-col>
                          <v-col v-else class="col-8">
                            N/A
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            Technical Platform: 
                          </v-col>
                          <v-col v-if="course.technicalPlatform !== ''" class="col-6">
                            {{course.technicalPlatform}}
                          </v-col>
                          <v-col v-else>
                            N/A
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="col-6">
                            Revenue School: 
                          </v-col>
                          <v-col v-if="course.revenueSchool !== ''" class="col-6">
                            {{course.revenueSchool}}
                          </v-col>
                          <v-col v-else>
                            N/A
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item
              key="team"
            >
              <v-card flat>
                <v-data-table
                  :headers="teamHeaders"
                  :search="searchTeam"
                  :items="course.teamMembers"
                  :items-per-page="10"
                  :footer-props="{
                    showFirstLastPage: false,
                    itemsPerPageOptions: [5, 10, 20]
                  }
                  "
                >
                  <template v-slot:top>
                    <v-text-field
                      v-model="searchTeam"
                      label="Search"
                      class="mx-4"
                    ></v-text-field>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>
            <v-tab-item
              key="affiliation"
            >
              <v-card flat>
                <v-card-text>
                  Schools:
                  <v-chip v-for="c in course.affiliation" v-bind:key="c">
                    {{ c }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              key="dissub"
            >
              <v-card flat>
                <v-card-text>
                  Disciplines:
                  <v-chip v-for="d in course.discipline" v-bind:key="d">
                    {{ d }}
                  </v-chip>
                </v-card-text>
                <v-card-text>
                  edX Subjects:
                  <v-chip v-for="e in course.edXSubject" v-bind:key="e">
                    {{ e }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'EditForm',
    props: {
      course: Object
    },
    data: () => ({
      enrollmentTypes: [],
      searchTeam: '',
      tPlatforms: [],
      dPlatforms: [],
      revenueSchools: [],
      affiliations: [],
      disciplines: [],
      edXSubjects: [],
      statuses: [],
      teamHeaders: [{
        text: 'Name',
        sortable: true,
        value: 'name'
      }, {
        text: 'Role on Team',
        sortable: true,
        value: 'role'
      }],
      tab: undefined,
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
      filter (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
      getChoices () {
        this.enrollmentTypes = ['', 'Open', 'Limited', 'Other', 'Audit']
        this.tPlatforms = ['edX', 'edX White Label', 'Canvas', 'HBSO', 'Other']
        this.dPlatforms = ['edX', 'edge.edX', 'HXPLUS', 'i-book', 'e-book', 'Other', 'GetSmarter', 'HBSO']
        this.revenueSchools = ['HSPH']
        this.affiliations = ['Harvard Business School', 'Harvard School of Public Health']
        this.disciplines = ['Architecture', 'Health Sciences']
        this.edXSubjects = []
        this.statuses = ['Active', 'Archive', 'Closed', 'Cancelled', 'Paused', 'Seedling', 'LOI', 'Proposal', 'In Development', 'Maintenance']
      },
      getVersionNum (nickname) {
        const regEx = /_v([0-9]+)/g
        const arr = [...nickname.matchAll(regEx)]
        return arr[0][1];
      }
    },
    mounted() {
      this.getChoices()
    }
  }
</script>