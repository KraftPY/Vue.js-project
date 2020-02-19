<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="4">
            <div class="d-flex flex-column align-center">
              <v-img class="mb-4" height="200" width="200" :src="foto"></v-img>
              <v-rating :value="rating" color="#FFD600" dense half-increments size="20"></v-rating>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <!--------------------- First name --------------------------------------->
              <v-text-field
                v-model="firstName"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
              <!--------------------- Last name --------------------------------------->
              <v-text-field
                v-model="lastName"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
              ></v-text-field>
              <!--------------------- E-mail name --------------------------------------->
              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
              <!--------------------- Proffesion name --------------------------------------->
              <v-text-field v-model="proffesion" :rules="nameRules" label="Proffesion" required></v-text-field>
              <!--------------------- Birthday name --------------------------------------->
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="birthday"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="birthday" label="Picker in menu" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="birthday" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(birthday)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "EditForm",

  data: () => ({
    valid: false,
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    birthday: null,
    proffesion: "",
    rating: 0,
    foto: "",
    nameRules: [v => !!v || "Name is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid"
    ],
    menu: false
  }),

  mounted: function() {
    const customer = this.$store.getters.customerData(this.$route.params.id);
    for (const key in customer) {
      this[key] = customer[key];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>