<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <div class="text-h4 font-weight-bold">Projects</div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="mx-1"
        fab
        dark
        small
        href="/create"
        color="light-blue accent"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-btn
        class="mx-1"
        fab
        dark
        small
        href="/config"
        color="light-blue accent"
      >
        <v-icon>
          mdi-cog
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <ProjectsList/>
    </v-main>
  </v-app>
</template>

<script>
import ProjectsList from '../../components/ProjectsList';

export default {
  name: 'App',

  components: {
    ProjectsList,
  },

  data: () => ({
    //
  }),
};
</script>
