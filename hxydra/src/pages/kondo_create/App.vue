<template>
  <v-app>
    <v-app-bar
      app
      color="#483682"
      dark
    >
      <div class="d-flex align-center">
        <v-btn class="text-h4 font-weight-bold text-none" text href="/projects/">Kondo</v-btn><span class="text-h7">Create New Project</span>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        class="mx-1"
        fab
        dark
        small
        href="/projects"
        color="#483682 accent"
      >
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <CreateForm/>
    </v-main>
  </v-app>
</template>

<script>
import CreateForm from '../../components/CreateForm';

export default {
  name: 'App',

  components: {
    CreateForm,
  },

  data: () => ({
    //
  }),
};
</script>
