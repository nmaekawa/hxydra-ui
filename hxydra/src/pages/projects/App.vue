<template>
  <v-app>
    <v-app-bar
      app
      color="#483682"
      dark
    >
      <div class="d-flex align-center">
        <v-btn class="text-h4 font-weight-bold text-none" text>Kondo</v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="mx-1"
        fab
        dark
        small
        href="/create"
        color="#483682 accent"
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
        href="/reportlist/"
        color="#483682 accent"
      >
        <v-icon>
          mdi-download
        </v-icon>
      </v-btn>
      <v-btn
        class="mx-1"
        fab
        dark
        small
        href="/choice/"
        color="#483682 accent"
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
