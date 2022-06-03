<template>
  <v-app>
    <v-app-bar
      app
      color="#EBB342"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          class="text-h4 font-weight-bold text-none"
          text
        >
          Eagle<v-icon>mdi-eye</v-icon>
        </v-btn>
      </div>

      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{on, attrs}">
          <v-btn
            class="mx-1"
            fab
            dark
            small
            href="/eaglei_moderate"
            color="#EBB342 accent"
            v-bind="attrs"
            disabled
            v-on="on"
          >
            <v-icon>
              mdi-home
            </v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <EagleIModeration />
    </v-main>
  </v-app>
</template>

<script>
import EagleIModeration from '../../components/EagleIModeration';
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
  name: 'App',

  components: {
    EagleIModeration,
  },

  data: () => ({
    write_perm: perms
  }),
};
</script>
