<template>
  <v-card class="mx-10 px-10">
    <v-snackbar
      v-model="errorBox"
      data-testid="errorBox"
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
      ref="createform"
      v-model="valid"
    >
      <v-container>
        <v-row>
          <v-col class="col-3">
            <v-text-field
              v-model="prefix"
              :counter="5"
              :rules="nicknameRules"
              label="Project Prefix"
              hint="Cannot be changed after creation. Must be unique"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="version"
              label="Version Number"
              type="number"
              :rules="posIntRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="run"
              label="Run Number"
              type="number"
              :rules="posIntRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="sequence_num"
              label="Sequence Number"
              :rules="posIntRules"
              hint="Still required for standalone courses"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="project_title"
              label="Project Name"
              :rules="titleRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-4 ml-3">
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
                    hint="Approximate date is acceptable, can be changed later."
                    persistent-hint="true"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="launch_date"
                  no-title
                  @change="launchDatePop = false"
                >
                </v-date-picker>
              </v-menu>
            </v-layout>
          </v-col>
          <v-col class="col-4 ml-5">
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
                    hint="Approximate date is acceptable, can be changed later."
                    persistent-hint="true"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="end_date"
                  no-title
                  @change="endDatePop = false"
                >
                </v-date-picker>
              </v-menu>
            </v-layout>
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col class="col-3">
            <v-text-field
              v-model="hrs_per_week_min"
              label="Estimated Min hrs per week"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-text-field
              v-model="hrs_per_week_max"
              label="Estimated Max hrs per week"
              type="number"
              required
            ></v-text-field>
          </v-col> -->
          <v-col class="col-6">
            <v-checkbox
              v-model="cert_available"
              label="Certificate?"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="green accent-1">
            <strong>Nickname:</strong> {{ nickname }}
          </v-col>
        </v-row>
      </v-container>
      <!-- Custom Date Picker Here -->
    </v-form>
    <v-container class="text-center">
      <v-row>
        <v-col>
          <v-btn
            color="#483682"
            dark
            @click="createProject"
          >Create</v-btn>
        </v-col>
        <v-col>
          <v-btn
            href="/projects"
          >Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'EditForm',

    data: () => ({
      prefix: 'XMple',
      prefix_help: false,
      valid: false,
      created: 'date',
      created_by: 'string',
      modified: 'date',
      modified_by: 'string',
      project_title: 'Example Title',
      course_id: 'string',
      description: 'Example description of the project',
      //description_brief: 'string',
      type: 'string',
      //section_count: 'number',
      hrs_per_week_min: 1,
      hrs_per_week_max: 1,
      launch_date: '2021-12-01',
      end_date: '2022-12-01',
      cert_available: true,
      is_public: 'boolean',
      is_active: 'boolean',
      url: 'string',
      rerun: 'string',
      version: 1,
      run: 1,
      sequence_num: 1,
      revenue_school: 'string',
      types: [],
      launchDatePop: false,
      endDatePop: false,
      add_seq: false,
      errorMessage: "",
      errorBox: false
    }),
    methods: {
      getTypes () {
        this.types = ['course', 'modules']
      },
      createProject () {
        if (this.validate()) {
          let options = {
            prefix: this.prefix,
            title: this.project_title,
            version: this.version,
            run: this.run,
            sequence: this.sequence_num,
            launch_date: new Date(this.launch_date),
            end_date: new Date(this.end_date),
            // estimated_effort_min: this.hrs_per_week_min,
            // estimated_effort_max: this.hrs_per_week_max,
            nickname: this.nickname,
            cert_available: this.cert_available
          }
          let self = this
          this.$http.post(
            'https://naomi.hxydra.hxtech.org/v1/catalog/project/',
            options
          )
            .then(() => window.location.href = window.location.protocol + '//' + window.location.host + '/projects/')
            .catch(function(e) {
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
        }
      },
      validate () {
        return this.$refs.createform.validate()
      }
    },
    mounted() {
      this.getTypes()
    },
    computed: {
      launchDateDisplay() {
        return this.launch_date
      },
      endDateDisplay() {
        return this.end_date
      },
      nickname() {

        let sequence_val = "_" + this.sequence_num
        return this.prefix + sequence_val + "_v" + this.version + "_r" + this.run
      },
      nicknameRules () {
        const rules = []
        const ruleMax = v => (v || '').length <= 5 || 'A maximum of 5 chars is allowed'
        const ruleMin = v => (v || '').length > 0 || 'A minum of 1 char is required'
        rules.push(ruleMax)
        rules.push(ruleMin)
        return rules
      },
      posIntRules () {
        const rules = []
        const ruleMin = v => v > 0 || 'Cannot be zero or negative'
        rules.push(ruleMin)
        return rules
      },
      titleRules () {
        const rules = []
        const ruleMax = v => (v || '').length <= 255 || 'A maximum of 255 chars is allowed'
        const ruleMin = v => (v || '').length > 0 || 'A minum of 1 char is required'
        rules.push(ruleMin)
        rules.push(ruleMax)
        return rules
      }
    }
  }
</script>