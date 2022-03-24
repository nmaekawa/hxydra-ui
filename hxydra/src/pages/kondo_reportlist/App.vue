<template>
  <v-app>
    <v-app-bar
      app
      color="#483682"
      dark
    >
      <div class="d-flex align-center">
        <v-btn class="text-h4 font-weight-bold text-none" text href="/kondo_projects/">Kondo</v-btn><span class="text-h7">Reports</span>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        class="mx-1"
        fab
        dark
        small
        href="/kondo_projects"
        color="#483682 accent"
      >
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
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
