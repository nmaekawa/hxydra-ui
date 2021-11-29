<template>
  <v-app>
    <v-app-bar
      app
      color="#483682"
      dark
    >
      <div class="d-flex align-center">
        <v-btn class="text-h4 font-weight-bold text-none" text href="/projects/">Kondo</v-btn><span class="text-h7">Reports</span>
      </div>
    </v-app-bar>

    <v-main>
      <ReportList />
    </v-main>
  </v-app>
</template>

<script>

import ReportList from '../../components/ReportList';

export default {
  name: 'Reports',

  components: {
    ReportList
  },

  data: () => ({
    //
  }),
};
</script>
