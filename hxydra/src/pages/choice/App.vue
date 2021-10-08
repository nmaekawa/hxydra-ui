<template>
  <v-app>
    <v-app-bar
      app
      color="#483682"
      dark
    >
      <div class="d-flex align-center">
        <div class="text-h4 font-weight-bold">Configure Lists</div>
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
      <Choice/>
    </v-main>
  </v-app>
</template>

<script>
import Choice from '../../components/Choice';

export default {
  name: 'App',

  components: {
    Choice,
  },

  data: () => ({
    //
  }),
};
</script>
