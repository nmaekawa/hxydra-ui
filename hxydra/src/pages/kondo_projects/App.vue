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
        v-if="write_perm"
        class="mx-1"
        fab
        dark
        small
        href="/kondo_create"
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
        href="/kondo_reportlist/"
        color="#483682 accent"
      >
        <v-icon>
          mdi-download
        </v-icon>
      </v-btn>
      <v-btn
        v-if="write_perm"
        class="mx-1"
        fab
        dark
        small
        href="/kondo_choice/"
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
let perms = false
try {
  const cookie = document.cookie
  if (typeof(cookie) !== "undefined") {
    let cookie_split = cookie.split(';').map(x => x.split('='))
    let perm_cookie_val = cookie_split.filter(y => y.length == 2 ? y[0].trim() == 'hx-perms' : false)
    if (perm_cookie_val.length > 0) {
      perms = perm_cookie_val[0][1].trim().indexOf('kondo-editor') > -1
    }
  }
} catch {
  perms = false
}
export default {
  name: 'App',

  components: {
    ProjectsList,
  },

  data: () => ({
    write_perm: perms
  }),
};
</script>
