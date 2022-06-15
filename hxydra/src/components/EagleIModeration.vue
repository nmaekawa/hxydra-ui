<template>
  <v-container
    fluid
    pl-10
    pr-10
  >
    <v-snackbar
      v-model="errorBox"
      top
      elevation="10"
      color="error"
    >
      {{ errorMessage }}
      <template #action="{ attrs }">
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
    <v-card>
      <v-card-title>
        Eagle <v-icon>mdi-eye</v-icon>&nbsp;&nbsp;Comments
      </v-card-title>
      <v-data-table
        :items="comments"
        :headers="tableHeaders"
        :items-per-page="50"
        :item-class="itemBackground"
        class="comments-1"
        :search="search"
        :custom-filter="filter"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          itemsPerPageOptions: [10, 20, 50, 100, -1]
        }
        "
        :loading="loading"
        loading-text="Retrieving Data..."
      >
        <template #top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
            prepend-inner-icon="mdi-magnify"
            outlined
          />
          <v-container>
            <v-row v-if="!usersearch">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="start_date"
                    label="Filter Start date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    class="mr-5"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="start_date"
                  :active-picker.sync="activePicker"
                  :max="end_date"
                  min="1950-01-01"
                />
              </v-menu>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="end_date"
                    label="Fiter End date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    class="mr-5"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="end_date"
                  :active-picker.sync="activePicker2"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  :min="start_date"
                />
              </v-menu>
              <v-btn
                color="#EBB352"
                dark
                @click="getComments"
              >
                Change Date Range
              </v-btn>
            </v-row>
            <v-row
              class="pb-10"
            >
              <v-btn
                @click="resetSearch"
              >
                Reset Search/Filter
              </v-btn>
              <v-spacer />
              <v-btn
                @click="onlyFlagged = !onlyFlagged"
                :color="onlyFlagged ? '#EBB352' : ''"
              >
                View Only Flagged
              </v-btn>
              <v-spacer />
              <v-btn
                @click="showAll = !showAll"
                :color="showAll? '#EBB352' : ''"
              >
                Include already Moderated Comments
              </v-btn>
            </v-row>
          </v-container>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="seeComment(item)"
          >
            mdi-eye
          </v-icon>
          <v-icon
            small
            @click="flagComment(item)"
          >
            mdi-flag
          </v-icon>
        </template>
        <template #[`item.comment_author`]="{ item }">
          <v-btn
            icon
            color="#EBB342"
            @click="getAllUser(item.comment_author)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>{{ item.comment_author }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
  import axios from 'axios'
  let perms = false
  try {
    const cookie = document.cookie
    if (typeof(cookie) !== "undefined") {
      let cookie_split = cookie.split(';').map(x => x.split('='))
      let perm_cookie_val = cookie_split.filter(y => y.length == 2 ? y[0].trim() == 'hx-perms' : false)
      if (perm_cookie_val.length > 0) {
        perms = perm_cookie_val[0][1].trim().indexOf('eaglei-editor') > -1
      }
    }
  } catch {
    perms = false
  }
  export default {
    name: 'EagleIModeration',
    components: {
    },
    data: () => ({
      search: '',
      errorMessage: "",
      errorBox: false,
      write_perm: perms,
      start_date: null,
      end_date: null,
      activePicker: null,
      activePicker2: null,
      usersearch: false,
      menu: null,
      menu2: null,
      loading: false,
      onlyFlagged: false,
      showAll: false,
      api_eaglei_url: process.env.VUE_APP_EAGLEI_API_URL,
      comments: [],
      current_moderator: '',
      tableHeaders: [{
        text: 'Actions',
        sortable: false,
        value: 'actions',
        width: '100px'
      }, {
        text: 'Comment',
        sortable: false,
        value: 'comment_text',
        width: '450px'
      }, {
        text: 'Original Response',
        sortable: false,
        value: 'response_text',
        width: '450px'
      }, {
        text: 'Comment Date Created',
        sortable: true,
        value: 'comment_date_created',
        width: '150px'
      },  {
        text: 'Program/Wave',
        sortable: true,
        value: 'program_wave',
        width: '200px'
      }, {
        text: 'Breadcrumbs',
        sortable: false,
        value: 'breadcrumbs',
        width: '250px'
      }, {
        text: 'Teaching Element',
        sortable: false,
        value: 'tei',
        width: '150px'
      }, {
        text: 'Comment Author',
        sortable: true,
        value: 'comment_author',
        width: '250px'
      }, {
        text: 'Original Response Author',
        sortable: false,
        value: 'response_text_author',
        width: '150px'
      }]
    }),
    mounted() {
      this.getTwoWeekRange();
      this.getComments();
    },
    methods: {
      filter (value, search) {
        if (value && search) {
          if (typeof(value) !== "undefined") {
            return value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) > -1
          }
        }
        return falsex
      },
      itemBackground (item) {
        let itemclass = ""
        if (!this.showAll) {
          itemclass = item.seen ? 'item-row-seen hide1' : ''
        } else {
          itemclass = item.seen ? 'item-row-seen' : ''
        }
        itemclass = item.flagged ? 'item-row-flagged' : itemclass
        if (!item.flagged && this.onlyFlagged) {
          itemclass += ' hide1'
          itemclass = itemclass.trim()
        }
        return itemclass
      },
      seeComment (item) {
        item.seen = !item.seen
        item.flagged = false
        this.updateComment(item)
      },
      flagComment(item) {
        item.seen = false
        item.flagged = !item.flagged
        this.updateComment(item)
      },
      updateComment(item) {
        axios.post(this.api_eaglei_url + 'mod/', {
          'cid': item.comment_id,
          'flagged': item.flagged,
          'moderated': item.seen,
          'moderated_by': this.current_moderator,
          'moderated_date': new Date().toISOString().substring(0, 10),
          'moderated_reason': '',
          'comment_created_date': item.comment_date_created
        })
      },
      getTwoWeekRange() {
        let endD =  new Date()
        this.end_date = endD.toISOString().substring(0, 10)
        let startD = new Date(endD - 12096e5)
        this.start_date = startD.toISOString().substring(0, 10)
      },
      async resetSearch() {
        this.getTwoWeekRange()
        await this.getComments()
        this.usersearch = false
      },
      async getAllUser(username) {
        let user_param = "&username=" + username
        await this.getComments(user_param)
        this.usersearch = true
      },
      sync_view(data) {
        const self = this
        if (data.length == 0 || self.comments.length == 0) {
          return
        }
        data.forEach(function(comm) {
          let foundInd = self.comments.findIndex(view_comm => view_comm.comment_id == comm.comment_id)
          if (foundInd > -1) {
            let foundObj = self.comments[foundInd]
            foundObj.flagged = comm.flagged
            foundObj.seen = comm.moderated
            if(foundInd < self.comments.length) {
              self.$set(self.comments, foundInd, foundObj)
            }
          }
        })
      },
      async getComments (param_append) {
        const self = this
        if (!axios) {
          return
        }

        let params = "?start=" + this.start_date + "&end=" + this.end_date
        if (param_append && typeof(param_append) == 'string'){
          params += param_append
        }
        
        self.comments = [];
        self.loading = true;
        await axios.get(
          self.api_eaglei_url + params
        )
          .then(data => {
            let comments_data = data.data
            if(comments_data.length > 0) {
              comments_data.forEach( function(comment) {
                self.comments.push({
                  'comment_text': comment.comments_text,
                  'comment_author': comment.comments_author_email,
                  'comment_date_created': comment.comments_date_created,
                  'program_wave': comment.program_name + ' > ' + comment.wave_name,
                  'breadcrumbs': comment.module_name + ' > ' + comment.lesson_name + " > " + comment.concept_name,
                  'tei': comment.tei_name + ' [' + comment.tei_type + ']',
                  'response_text': comment.response_text,
                  'response_text_author': comment.email,
                  'seen': false,
                  'flagged': false,
                  'comment_id': comment.comments_id,
                })
              })
              axios.get(self.api_eaglei_url + "mod/" + params).then(data => {
                self.sync_view(data.data)
              })
            }
            self.loading = false;
          })
          .catch(function(e) {
            self.errorBox = true
            self.errorMessage = "API could not be reached. Using fake data."
            console.log(e)
          });
      },
    }
  }
</script>
<style>
  .item-row-seen, .item-row-seen:hover {
    background: #C8E6C9!important;
  }
  .item-row-flagged, .item-row-flagged:hover {
    background: #FFCDD2!important;
  }
  .hide1 {
    display: none!important;
    /*visibility: hidden !important;*/
  }
  .v-data-table__empty-wrapper {
    text-align: left!important;
  }
</style>