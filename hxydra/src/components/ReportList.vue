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
    <v-snackbar
      v-model="downloadBox"
      centered
      timeout="-1"
      color="deep-purple accent-4"
      elevation="24"
    >
      {{ progressMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="downloadBox = false"
        >
          Close
        </v-btn>
      </template>
      <v-progress-linear
        color="white"
        :buffer-value="progressValue"
        stream
      ></v-progress-linear>
    </v-snackbar>
    <v-card>
      <v-card-title>
        Report List
      </v-card-title>
      <v-card-text>If links don't download when clicking: Right click + Download/Save As</v-card-text>
      <v-list flat>
        <v-list-item
          v-for="(item, i) in reports"
          :key="i"
        >
          <h3 style="margin-right:20px;">{{item.description}}</h3>
          <v-btn
            @click="downloadUrl(api_domain + item.url + '?format=csv', item.description + '.csv')"
            style="margin-right:10px"
          ><v-icon>mdi-download</v-icon> CSV</v-btn>
          <v-btn
            @click="downloadUrl(api_domain + item.url + '?format=json', item.description + '.json')"
          ><v-icon>mdi-download</v-icon> JSON</v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ReportList',
    components: {
    },
    data: () => ({
      reports: [],
      api_domain: process.env.VUE_APP_KONDO_DOMAIN,
      api_url: process.env.VUE_APP_KONDO_API_URL + 'report/',
      progressValue: 0,
      errorBox: false,
      errorMessage: '',
      downloadBox: false,
      progressMessage: '',
      test_reports: [{
        name: 'Courses Launching in 14 Days',
        link: 'https://google.com'
      }, {
        name: 'Courses Launching in 30 Days',
        link: 'https://google.com'
      }, {
        name: 'Courses Launching in 60 Days',
        link: 'https://google.com'
      }]
    }),
    methods: {
      async getReports () {
        const self = this
        if (!axios) {
          return
        }
        await axios.get(
          self.api_url
        )
          .then(data => {
            self.reports = data.data
          })
          .catch(function(e) {
            self.errorBox = true
            self.errorMessage = "API could not be reached. Using fake data."
            console.log(e)
            self.reports = self.test_reports
          });
      },
      async downloadUrl(url) {
        // should trigger message "Requesting report. Wait a moment..."
        this.downloadBox = true
        this.progressMessage = 'Requesting report. This may take a few minutes...'
        this.progressValue = 0
        if (!axios) {
          return
        }

        await axios.get(
          url,
          {
            onDownloadProgress: progressEvent => {
              const total = progressEvent.total
              const current = progressEvent.loaded

              let percentCompleted = Math.floor(current / total * 100)
              this.progressValue = percentCompleted
              this.progressMessage = "Downloading Report (" + percentCompleted + "%)"
            }
          }
        ).then(res => {
          this.progressMessage = "Report Downloaded"
          let filename_str = res.headers['content-disposition']
          const re = /filename="(.*)"/
          let filename = filename_str.match(re)[1];
          let a = document.createElement('a')
          var objurl = URL.createObjectURL(new Blob([res.data]));
          if (filename.indexOf('.json') != -1) {
            objurl = URL.createObjectURL(new Blob([JSON.stringify(res.data)], {type:'application/json'}));
          }
          a.href = objurl;
          a.download = filename;
          a.click();
        }).catch(e => {
          this.errorBox = true
          this.errorMessage = "API could not be reached. Could not download report."
            console.log(e)
        })
      }
    },
    mounted() {
      this.getReports();
    }
  }
</script>