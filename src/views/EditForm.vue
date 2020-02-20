<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="4">
            <div class="d-flex flex-column align-center">
              <v-img outlined alt="foto" class="mb-4" height="200" width="200" :src="customer.foto"></v-img>
              <v-rating v-model="customer.rating" color="#FFD600" dense half-increments size="20"></v-rating>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <!--------------------- First name --------------------------------------->
              <v-text-field
                v-model="customer.firstName"
                :rules="[rules.required]"
                label="First name"
                required
              ></v-text-field>
              <!--------------------- Last name --------------------------------------->
              <v-text-field
                v-model="customer.lastName"
                :rules="[rules.required]"
                label="Last name"
                required
              ></v-text-field>
              <!--------------------- E-mail name --------------------------------------->
              <v-text-field
                v-model="customer.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                required
              ></v-text-field>
              <!--------------------- Proffesion name --------------------------------------->
              <v-text-field v-model="customer.proffesion" label="Proffesion" required></v-text-field>
              <!--------------------- Birthday name --------------------------------------->
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="customer.birthday"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="customer.birthday"
                    label="Picker in menu"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="customer.birthday" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(customer.birthday)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6" md="4">
            <div class="d-flex justify-space-between mt-7">
              <v-btn width="40%" large color="warning" @click="$router.push({ path: '/' })">Close</v-btn>
              <v-btn width="40%" large color="primary" @click="saveCustomer">Save</v-btn>
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
    customer: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      birthday: null,
      proffesion: "",
      rating: 0,
      foto: ""
    },
    rules: {
      required: value => !!value || "Required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
    menu: false,
    newCustomer: false
  }),

  methods: {
    saveCustomer() {
      if (this.validData && !this.newCustomer) {
        this.$store.dispatch("editCustomer", this.customer);
        this.$router.push({ path: "/" });
      } else if (this.validData && this.newCustomer) {
        this.$store.dispatch("createCustomer", this.customer);
        this.$router.push({ path: "/" });
      }
    }
  },

  computed: {
    validData() {
      const { firstName, lastName, email } = this.customer;
      return (
        this.rules.required(firstName) == true &&
        this.rules.required(lastName) == true &&
        this.rules.required(email) == true &&
        this.rules.email(email) == true
      );
    }
  },

  mounted: function() {
    const customerId =
      typeof this.$route.params.id == "string" ? this.$route.params.id : null;
    if (customerId) {
      const customer = this.$store.getters.customerData(this.$route.params.id);
      for (const key in customer) {
        this.customer[key] = customer[key];
      }
    } else {
      this.newCustomer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>