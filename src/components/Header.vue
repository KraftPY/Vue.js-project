<template>
  <div>
    <v-app-bar height="100">
      <v-row>
        <v-col cols="12" sm="3">
          <v-toolbar-title>
            <router-link to="/" class="title">Site title</router-link>
          </v-toolbar-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="9" class="d-flex justify-end">
          <div>
            <div v-if="user">
              <span>{{`Hello, ${user.firstName} ${user.lastName}`}}</span>
              <v-btn @click="logout" class="ml-3" small color="error">Log-out</v-btn>
            </div>
            <v-menu
              v-model="menuAuth"
              :close-on-content-click="false"
              transition="slide-y-transition"
              offsetY
              v-else-if="!user"
            >
              <template v-slot:activator="{ on }">
                <v-btn small v-on="on">
                  <span>Login</span>
                  <v-icon class="ml-1">mdi-login</v-icon>
                </v-btn>
              </template>

              <v-form ref="form" class="blue-grey lighten-5">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" class="ma-0 py-0">
                      <v-text-field
                        outlined
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        label="E-mail"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" class="ma-0 py-0">
                      <v-text-field
                        outlined
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        label="Enter your password"
                        hint="At least 4 characters"
                        counter
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <span v-if="authFailed" class="ml-3 error--text">Authorization failed</span>
                      <v-btn @click="checkAuth" class="float-right" color="success">Enter</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      menuAuth: false,
      email: "",
      password: "",
      show: false,
      authFailed: false,
      user: null,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        min: v => v.length >= 4 || "Min 4 characters"
      }
    };
  },

  methods: {
    checkAuth() {
      if (
        this.rules.required(this.email) == true &&
        this.rules.email(this.email) == true &&
        this.rules.required(this.password) == true &&
        this.rules.min(this.password) == true
      ) {
        const user = this.$store.getters.checkUser({
          email: this.email,
          password: this.password
        });
        if (user) {
          this.menuAuth = false;
          this.user = user;
        } else {
          this.authFailed = true;
        }
      }
    },

    logout() {
      this.user = null;
      this.$store.dispatch("logoutUser");
      if (this.$router.history.current.path != "/") {
        this.$router.push({ path: "/" });
      }
    }
  },

  watch: {
    menuAuth(value) {
      if (!value) {
        this.$refs.form.resetValidation();
        this.email = "";
        this.password = "";
        this.authFailed = false;
      }
    }
  }
};
</script>

<style scoped>
.title {
  text-decoration: none;
  color: black;
}
</style>