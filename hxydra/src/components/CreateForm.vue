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
              v-model="sequence_num"
              label="Sequence Number"
              :rules="sequenceRules"
              hint="Still required for standalone courses"
              type="number"
              :disabled="!add_seq"
              required
            ></v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-checkbox
              v-model="add_seq"
              label="Part of a sequence?"
              @click="sequence_num = 1"
            >
            </v-checkbox>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="version"
              label="Version Number"
              type="number"
              :rules="posIntRules"
              required
              disabled
            ></v-text-field>
          </v-col>
          <v-col class="col-2">
            <v-text-field
              v-model="run"
              label="Rerun Number"
              type="number"
              :rules="posIntRules"
              required
              disabled
            ></v-text-field>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="project_title"
              label="Project Title"
              :rules="titleRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              v-model="common_project_name"
              label="Common Name"
              :rules="titleRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-text-field
              label="Approximate Launch & End Date"
              v-model="approx_date"
              :disabled="launch_date.length > 0 || end_date.length > 0"

            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-10">
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
                    label="Exact Launch Date"
                    prepend-icon="mdi-calendar-month"
                    v-model="launch_date"
                    v-on="on"
                    persistent-hint
                    :disabled="approx_date.length > 0"
                    clearable
                    :rules="dateAfterRule"
                    @click:clear="launch_date = ''"
                    v-on:keydown="preventNonNums"
                    @change="validate"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  autofocus
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
                    label="Exact End Date"
                    prepend-icon="mdi-calendar-month"
                    v-model="end_date"
                    v-on="on"
                    persistent-hint
                    :disabled="approx_date.length > 0"
                    clearable
                    @click:clear="end_date = ''"
                    :rules="dateBeforeRule"
                    v-on:keydown="preventNonNums"
                    @change="validate"
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
          <!-- <v-col class="col-6">
            <v-checkbox
              v-model="cert_available"
              label="Certificate?"
            >
            </v-checkbox>
          </v-col> -->
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
            tabindex="0"
          >Create</v-btn>
        </v-col>
        <v-col>
          <v-btn
            tabindex="0"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            tabindex="0"
            href="/kondo_projects"
          >Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'CreateForm',

    data: () => ({
      prefix: '',
      prefix_help: false,
      valid: false,
      created: 'date',
      created_by: 'string',
      modified: 'date',
      modified_by: 'string',
      project_title: '',
      course_id: 'string',
      common_project_name: '',
      type: 'string',
      hrs_per_week_min: 1,
      hrs_per_week_max: 1,
      launch_date: '',
      end_date: '',
      cert_available: true,
      is_public: 'boolean',
      is_active: 'boolean',
      url: 'string',
      rerun: 'string',
      version: 1,
      run: 0,
      sequence_num: 1,
      revenue_school: 'string',
      launchDatePop: false,
      endDatePop: false,
      add_seq: false,
      errorMessage: "",
      errorBox: false,
      approx_date: "",
      api_url: process.env.VUE_APP_KONDO_API_URL + "project/"
    }),
    methods: {
      preventNonNums (event) {
        if ('0123456789-'.indexOf(event.key) == -1 &&event.key != 'Tab' && event.key != 'Ctrl' && event.key != 'Alt' && event.key != 'Shift' && event.key != 'Backspace' && event.key != 'Delete') {
          event.preventDefault()
        }
      },
      createProject () {
        console.log(this.api_url, this.$refs.createform)
        let fuzz = this.approx_date.length > 0
        let approx_val = ''
        let start_date = undefined
        let end_date = undefined
        if (fuzz) {
          approx_val = this.approx_date
        } else {
          start_date = new Date(this.launch_date)
          end_date = new Date(this.end_date)
        }
        if (this.validate()) {
          let options = {
            prefix: this.prefix,
            title: this.project_title,
            version: this.version,
            run: this.run,
            sequence: this.sequence_num,
            launch_date: start_date,
            end_date: end_date,
            nickname: this.nickname,
            is_fuzzy_launch_date: fuzz,
            fuzzy_launch_date: approx_val,
            common_name: this.common_project_name
          }
          let self = this
          axios.post(
            this.api_url,
            options
          )
            .then(() => window.location.href = window.location.protocol + '//' + window.location.host + '/kondo_projects/?course_created=' +options.nickname)
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
    computed: {
      nickname() {
        let sequence_val = "_" + this.sequence_num.toString().padStart(2, '0')
        return this.prefix + sequence_val + "_v" + this.version + "_r" + this.run.toString().padStart(2, '0')
      },
      nicknameRules () {
        const rules = []
        const ruleMax = v => (v || '').length <= 5 || 'A maximum of 5 chars is allowed'
        const ruleMin = v => (v || '').length > 0 || 'A minum of 1 char is required'
        rules.push(ruleMax)
        rules.push(ruleMin)
        return rules
      },
      dateAfterRule () {
        const rules = []
        const ruleAddEnd = v => !v || (v && (this.end_date !== null) && (this.end_date !== undefined) && (this.end_date !== '')) || 'Must add end date'
        const ruleAft = v => !v || v <= this.end_date || 'Date should not be after End Date'
        const ruleMustHaveDate = v => v !== this.approx_date || 'Must have either exact dates or an approximate date.'
        rules.push(ruleAddEnd)
        rules.push(ruleAft)
        rules.push(ruleMustHaveDate)
        return rules
      },
      dateBeforeRule () {
        const rules = []
        const ruleAddLaunch = v => !v || (v && (this.launch_date !== null) && (this.launch_date !== undefined) && (this.launch_date !== '')) || 'Must add launch date'
        const ruleBef = v => !v || v >= this.launch_date || 'Date should not be before Launch Date'
        const ruleMustHaveDate = v => v !== this.approx_date || 'Must have either exact dates or an approximate date.'
        rules.push(ruleAddLaunch)
        rules.push(ruleBef)
        rules.push(ruleMustHaveDate)
        return rules
      },
      posIntRules () {
        const rules = []
        const ruleMin = v => v > -1 || 'Cannot be negative'
        rules.push(ruleMin)
        return rules
      },
      sequenceRules() {
        const rules = []
        const nonZero = v => v && v != 0 || 'Sequence must start at 1'
        const ruleMin = v => v && v > -1 || 'Cannot be negative'
        rules.push(nonZero)
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