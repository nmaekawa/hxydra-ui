<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel v-for="item in setup_options" v-bind:key="item.tech_name">
        <v-expansion-panel-header>
          {{item.proper_name}} <v-spacer/><v-btn :title="'Add new' + item.proper_name" max-width="30px" @click="add = !add; choiceSelected = item.tech_name" class="mr-10"><v-icon>mdi-plus</v-icon></v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item v-for="e in values[item.tech_name]" v-bind:key="e">
            <v-list-item-content>
              <v-list-item-title>
                <v-btn title="Edit" @click="choiceSelected = item.tech_name" class="" icon small>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn title="Delete" @click="awaitingDelete = e; choiceSelected = item.tech_name; deleteChoice()" class="mr-5" icon small>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                {{ e }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider class="mt-10 mb-10"></v-divider>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          People <v-spacer/><v-btn title="Add new" max-width="30px" @click="addPeople = true;" class="mr-10"><v-icon>mdi-plus</v-icon></v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="people"
            :items-per-page="50"
            :search="search"
            :custom-filter="filter"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'mdi-arrow-collapse-left',
              lastIcon: 'mdi-arrow-collapse-right',
              itemsPerPageOptions: [25, 50 -1]
            }
            "
          >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>
          <template v-slot:item="{ item }">
            <tr>
              <td>
                {{item['first_name']}}
              </td>
              <td>
                {{item['last_name']}}
              </td>
              <td>
                {{item['job_title']}}
              </td>
              <td>
                <v-container>
                  <v-row>
                    <v-col class="col-4">
                      <v-icon
                        small
                        class="mr-2"
                        @click="editPerson(item)"
                      >
                        mdi-pencil
                      </v-icon>
                    </v-col>
                    <v-col class="col-4">
                      <v-icon
                        small
                        @click="deletePerson(item)"
                      >
                        mdi-delete
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-container>
              </td>
            </tr>
          </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-model="add"
      width="80%"
      style="background: white"
    >
      <v-card class="px-20">
        <v-container>
          <v-text-field
            v-model="newChoice"
            :placeholder="'Add new ' + (choiceSelected ? setup_options.filter(e => e.tech_name == choiceSelected)[0].proper_name : 'Choice')"
          ></v-text-field>
          <v-btn color="#483682" dark class="mr-5" @click="addChoicePopup()">Add</v-btn>
          <v-btn @click="add = false">Cancel</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="addPeople"
      width="80%"
      style="background: white"
    >
      <v-card class="px-10">
        <v-container>
          <v-text-field
            class="mx-10"
            v-model="newFirstName"
            placeholder="First Name"
          ></v-text-field>
          <v-text-field
            class="mx-10"
            v-model="newLastName"
            placeholder="Last Name"
          ></v-text-field>
          <v-text-field
            class="mx-10"
            v-model="newJobTitle"
            placeholder="Job Title"
          ></v-text-field>
          <v-btn color="#483682" dark class="mr-5" @click="editMode = true; addNewPerson()">Add</v-btn>
          <v-btn @click="addPeople = false">Cancel</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="debugDialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          small
          fixed
          bottom
          right
          color="green"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small>mdi-bug</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Debug API
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field label="API URL Prefix" v-model="api_url_prefix" @input="getChoices"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field label="People API URL Prefix" v-model="people_api_url" @input="getPeople"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="debugDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: 'Choice',
    props: {
      choiceType: Object
    },
    data: () => ({
      add: false,
      addPeople: false,
      editMode: false,
      choiceHeaders:[{
        text: 'Value',
        sortable: true,
        value: 'value'
      }],
      search: '',
      idRef: '',
      enrollmenttype: [],
      technicalplatform: [],
      newChoice: undefined,
      deliveryplatform: [],
      school: [],
      //affiliations: [],
      platformdiscipline: [],
      projectstatus: [],
      choiceSelected: undefined,
      awaitingDelete: undefined,
      people: [],
      headers: [{
        text: 'First Name',
        sortable: true,
        value: 'first_name',
      }, {
        text: 'Last Name',
        sortable: true,
        value: 'last_name',
      }, {
        text: 'Job Title',
        sortable: true,
        value: 'job_title',
      }, {
        text: 'Actions',
        sortable: false,
        align: 'center',
      }],
      api_url_prefix: 'https://naomi.hxydra.hxtech.org/v1/catalog/',
      people_api_url: 'https://naomi.hxydra.hxtech.org/v1/catalog/person/',
      debugDialog: false,
      newFirstName: '',
      newLastName: '',
      newJobTitle: '',
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
        'key': 'school'
      }, {
        'proper_name': 'Platform Discipline',
        'tech_name': 'platformdiscipline',
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
    }),
    methods: {
      getChoices () {
        // TODO: Try to get all these list values in one go
        for (const s of this.setup_options) {
          console.log("what")
          this.$http.get(this.api_url_prefix +s['tech_name']+'/')
            .then(e => {
              console.log('woo', e)
              this[s['tech_name']] = e.data.map(f => f[s['key']])
              console.log("wee", this[s['tech_name']])
            })
            //.then(g => this.values[s['tech_name']] = g)
        }
        console.log(this.values)
        this.values = {
          'role': ['test1', 'test2']
        }
      },
      addChoicePopup () {
        console.log(this.newChoice, this.api_url_prefix + this.choiceSelected+'/')
        let options = {}
        options[this.setup_options.filter( e => e.tech_name == this.choiceSelected)[0].key] = this.newChoice
        console.log(options)
        this.$http.post(
          this.api_url_prefix + this.choiceSelected+'/',
          options
        )
          .then(e => console.log(e))
          .catch(e => console.log(e))
        let chosen = this.values[this.choiceSelected]
        chosen.push(this.newChoice)
        this.add = false
        this.newChoice = ''
        this.choiceSelected = ''
      },
      addNewPerson () {
        if (this.editMode) {
          this.finishEditing()
          return
        }
        let person = {
          'first_name': this.newFirstName,
          'last_name': this.newLastName,
          'job_title': this.newJobTitle,
          'id': this.people.length + 1
        }
        this.people.push(person)
        this.addPeople = false
        this.choiceSelected = ''
        this.newFirstName = ''
        this.newLastName = ''
        this.newJobTitle = ''
      },
      editPerson (person) {
        this.newJobTitle = person.job_title
        this.newFirstName = person.first_name
        this.newLastName = person.last_name
        this.idRef = person.id
        this.addPeople = true
      },
      finishEditing () {
        let foundIndex = -1
        let found = undefined
        for (let k = 0; k < this.people.length; k++) {
          let person = this.people[k]
          if (person.id == this.idRef) {
            foundIndex = k
            person.first_name = this.newFirstName,
            person.last_name = this.newLastName,
            person.job_title = this.newJobTitle
            found = person
          }
        }
        this.$set(this.people, foundIndex, found)
        this.addPeople = false
        this.choiceSelected = ''
        this.newFirstName = ''
        this.newLastName = ''
        this.newJobTitle = ''
      },
      deletePerson (person) {
        this.people = this.people.filter(e => e.id !== person.id)
      },
      async deleteChoice() {
        console.log(this.choiceSelected)
        console.log(this.awaitingDelete)
        await this.$http.delete(
          this.api_url_prefix + this.choiceSelected + '/' + this.awaitingDelete.toLowerCase().replace(' ', '-') + '/'
        )
          .then(e => {
            console.log('Worked', e)
            let cat = this.values[this.choiceSelected]
            console.log(cat)
            cat = cat.filter(e => e !== this.awaitingDelete)
            console.log(cat)
            this[this.choiceSelected] = cat
            this.values[this.choiceSelected] = cat
            this.choiceSelected = ''
            this.awaitingDelete = ''
          })
          .catch(e => console.log('Error', e))
      },
      async getListFromAPI () {
        // return await this.$http.get(
        //   apiurl
        // ).then(data => console.log(data.data))
      },
      async getPeople () {
        //eventually this should call a new API call that gets the full list of people
        await this.$http.get(
          this.people_api_url
        ).then(data => {
          this.people = data.data
        })
        
      },
      filter (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
    },
    mounted() {
      this.getChoices()
      this.getPeople()
    },
    computed: {
      values() {
        let newValues = {}
        for (const s of this.setup_options) {
          newValues[s['tech_name']] = this[s['tech_name']]
        }
        console.log('soooo', newValues)
        return newValues
      }
    }
  }
</script>