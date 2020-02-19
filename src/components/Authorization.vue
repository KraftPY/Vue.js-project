<template>
  <div class="mx-7">
    <v-menu
      v-model="menuAuth"
      :close-on-content-click="false"
      transition="slide-y-transition"
      offsetY
    >
      <template v-slot:activator="{ on }" class="mb-5">
        <v-btn large v-on="on">
          <span>Login</span>
          <v-icon class="ml-3">mdi-login</v-icon>
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
              <v-btn @click="checkAuth" class="float-right">Enter</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "Authorization",

  data() {
    return {
      menuAuth: false,
      email: "",
      password: "",
      show: false,
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
        console.log(this.email);
        console.log(this.password);

        this.menuAuth = false;
      }
    }
  },
  watch: {
    menuAuth(value) {
      if (!value) {
        this.$refs.form.resetValidation();
        this.email = "";
        this.password = "";
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>