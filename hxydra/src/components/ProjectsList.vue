<template>
  <v-container>
    <v-dialog
      v-model="editing"
      width="80%"
      style="background: white"
    >
      <v-card>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="detail"
      width="80%"
      style="background: white"
    >
      <v-card>
        <v-toolbar dense>
          <v-btn
            class="ma-2"
            @click="detail = false"
          >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer/>
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
      </v-card>
    </v-dialog>
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
            {{item['launchDate']}}
          </td>
          <td>
            {{item['endDate']}}
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
  </v-container>
</template>

<script>
  export default {
    name: 'ProjectsList',
    components: {
    },
    data: () => ({
      search: '',
      editing: false,
      selected: undefined,
      detail: undefined,
      rowItem: undefined,
      headers: [{
        text: 'Nickname',
        sortable: true,
        value: 'nickname',
        width: '10%'
      },{
        text: 'Project Title',
        sortable: true,
        value: 'projectTitle',
        width: '55%'
      },{
        text: 'Launch Date',
        sortable: true,
        value: 'launchDate',
        width: '15%'
      },{
        text: 'End Date',
        sortable: true,
        value: 'endDate',
        width: '10%'
      }, {
        text: 'Actions',
        sortable: false,
        align: 'center',
        width: '10%'
      }],
      projects: [{
        nickname: 'HIN_v1',
        title: "Health in Numbers: Quantitative Methods in Clinical & Public Health Research",
        launchDate: '2012-10-15',
        endDate: '',
      }, {
        nickname: 'CS50x_v1',
        launchDate: '2012-10-15',
        title:  'CS50\'s Introduction to Computer Science',
        endDate: '',
      }, {
        nickname: 'Copy_v1',
        launchDate: '2013-01-18',
        title:  'Copyright',
        endDate: '',
      }, {
        nickname: 'Anat_v1_02',
        launchDate: '2023-06-23',
        title:  'Human Anatomy: Musculoskeletal Cases',
        endDate: '',
      }]
    }),
    methods: {
      filter (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
      async getProjects () {
        
        const { data } = await this.$http.get(
          // process.env.BASE_URL + 'tablelist.json'
          'http://localhost:8000/catalog/project/'
        );
        this.projects = data;
      },
      async getItemDetail ( item ) {
        //eventually this should call a new API call that gets the full detail info on the row selected
        const { data } = await this.$http.get(
          'http://localhost:8000/catalog/project/' + item.nickname
          + '/'
          // process.env.BASE_URL + 'detailed_view.json'
        );
        this.selected = data;
        this.editing = true;
        console.log(item)
      },
      editItem (item) {
        this.getItemDetail(item);
      },
      async viewDetail (item) {
        const { data } = await this.$http.get(
          process.env.BASE_URL + 'detailed_view.json'
        );
        this.selected = data
        this.detail = true
        this.rowItem = item
        console.log(item, data)
      },
      deleteItem (item) {
        console.log(item)
        this.projects = this.projects.filter(e => e.nickname !== item.nickname)
        this.detail = false
        console.log(item)
      },
      closeEdit () {
        this.editing = false
      }
    },
    mounted() {
      this.getProjects();
    }
  }
</script>