<template>
  <v-container>

    <v-snackbar
      v-model="errorBox"
      top
      elevation="10"
      color="error"
    >
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="errorBox = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="editing"
      width="80%"
      style="background: white"
      persistent
    >
      <v-card>
        <EditForm :course="selected" @closeEdit="closeEdit"/>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="detail"
      width="80%"
      style="background: white"
    >
      <v-card v-if="selected">
        <v-toolbar
          dense
          style="position: sticky; top: 0; z-index: 99999"
        >
          <v-btn
            class="ma-2"
            @click="detail = false"
          >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer/>
        <v-btn class="mr-3">
          New Sequence
        </v-btn>
        <v-btn class="mr-3">
          New Version
        </v-btn>
        <v-btn class="mr-3">
          New Run
        </v-btn>
        <v-btn
          @click="deleteItem(rowItem)"
        >
          <v-icon
            small
          >
            mdi-delete
          </v-icon>
        </v-btn>
        </v-toolbar>
        <DetailView :course="selected"/>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        Projects
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="projects"
        :items-per-page="50"
        class="projects-1"
        :search="search"
        :custom-filter="filter"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          itemsPerPageOptions: [10, 20, 50, 100, -1]
        }
        "
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{item['nickname']}}
            </td>
            <td>
              {{item['title']}}
            </td>
            <td>
                {{ launchDateDisplay(item) }}
            </td>
            <td>
                {{ endDateDisplay(item) }}
            </td>
            <td>
              <v-container>
                <v-row>
                  <v-col class="col-6">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-col>
                  <v-col class="col-6">
                    <v-icon
                      small
                      @click="viewDetail(item)"
                    >
                      mdi-eye
                    </v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
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
                <v-text-field label="Project List API URL" v-model="api_projects_url" @input="getProjects"></v-text-field>
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
  import EditForm from './EditForm'
  import DetailView from './DetailView'
  export default {
    name: 'ProjectsList',
    components: {
      EditForm,
      DetailView
    },
    data: () => ({
      search: '',
      editing: false,
      selected: undefined,
      detail: undefined,
      rowItem: undefined,
      errorMessage: "",
      errorBox: false,
      debugDialog: false,
      headers: [{
        text: 'Nickname',
        sortable: true,
        value: 'nickname',
        width: '10%'
      },{
        text: 'Project Title',
        sortable: true,
        value: 'title',
        width: '55%'
      },{
        text: 'Launch Date',
        sortable: true,
        value: 'launch_date',
        width: '15%'
      },{
        text: 'End Date',
        sortable: true,
        value: 'end_date',
        width: '10%'
      }, {
        text: 'Actions',
        sortable: false,
        align: 'center',
        width: '10%'
      }, {
        text: 'fuzzy date',
        align: ' d-none',
        value: 'fuzzy_launch_date'
      }],
      api_projects_url: 'https://devo2.hxydra.hxtech.org/v1/kondo/project/',
      projects: [],
    }),
    methods: {
      filter (value, search) {
        if (value && search) {
          if (typeof(value) !== "undefined") {
            console.log(value)
            return value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) > -1
          }
        }
        return false
      },
      async getProjects () {
        const self = this
        await this.$http.get(
          self.api_projects_url
        )
          .then(data => {
            console.log(data)
            self.projects = data.data
          })
          .catch(function(e) {
            self.errorBox = true
            self.errorMessage = "API could not be reached. Using fake data."
            console.log(e)
          });
        
      },
      async getItemDetail ( item ) {
        const self = this
        await this.$http.get(
          self.api_projects_url + item.nickname
          + '/'
        )
          .then(data => this.selected = data.data)
          .catch(function(e) {
            self.errorBox = true
            self.errorMessage = `API could not be reached. Data for ${item.nickname} was not retrieved.`
            console.log(e)
          })
      },
      editItem (item) {
        this.getItemDetail(item)
          .then(() => this.editing = true)
          .then(() => this.detail = false)

      },
      async viewDetail (item) {
        this.getItemDetail(item)
          .then(() => this.rowItem = item)
          .then(() => this.detail = true)
          .then(() => this.editing = false)
      },
      async deleteItem (item) {
        await this.$http.delete(
          self.api_projects_url + item.nickname
          + '/'
        )
          .then(() => this.projects = this.projects.filter(e => e.nickname !== item.nickname))
          .then(() => this.detail = false)
          .then(() => this.selected = undefined)
          .catch(function(e) {
            self.errorBox = true
            self.errorMessage = `API could not be reached. Data for ${item.nickname} was not deleted.`
            console.log(e)
          })
      },
      closeEdit (e) {
        this.editing = false
        if (e) {
          let indexFound = this.projects.findIndex(obj => obj.nickname === e.nickname)
          this.$set(this.projects, indexFound, e)
        }
      },
      launchDateDisplay( item ) {
        let res = item['fuzzy_launch_date']
        if ('launch_date' in item) {
          let d = item['launch_date']
          if (d) {
            res = new Date(item['launch_date']).toISOString().substring(0,10)
          }
        } else if (!item['is_fuzzy_launch_date']) {
          res = 'Unset'
        }
        return res
      },
      endDateDisplay( item ) {
        let res = ''
        if ('end_date' in item) {
          let d = item['end_date']
          if (d) {
            res = new Date(item['end_date']).toISOString().substring(0,10)
          }
        }
        return res
      },
    },
    mounted() {
      this.getProjects();
    }
  }
</script>