<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <div class="text-h4 font-weight-bold">Create New</div>
      </div>
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
