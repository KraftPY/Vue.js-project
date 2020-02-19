<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model.trim="valueName"
            label="Customer name"
            class="mx-0 mt-2 pa-0"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="valueRating"
            :items="[1, 2, 3, 4, 5]"
            attach
            chips
            label="Rating"
            multiple
            clearable
            class="ma-0 pa-0"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex flex-wrap justify-center">
          <v-card
            v-for="customer in filteredCustomers"
            :key="customer.id"
            max-width="370"
            class="mx-2 my-2"
            color="#ECEFF1"
          >
            <v-list-item three-line>
              <div class="d-flex flex-column">
                <v-list-item-avatar tile size="80" color="grey">
                  <v-img :src="customer.foto"></v-img>
                </v-list-item-avatar>
                <v-rating
                  :value="customer.rating"
                  color="#FFD600"
                  dense
                  half-increments
                  readonly
                  size="10"
                ></v-rating>
              </div>
              <v-list-item-content>
                <div class="mb-4">{{customer.proffesion}}</div>
                <v-list-item-title
                  class="headline mb-1"
                >{{`${customer.firstName} ${customer.lastName}`}}</v-list-item-title>
                <v-list-item-subtitle>
                  <strong>E-mail:</strong>
                  {{customer.email}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <strong>Birthday:</strong>
                  {{customer.birthday}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="d-flex justify-end">
              <v-btn @click.prevent="editCustomer(customer.id)" text color="warning">Edit</v-btn>
              <v-btn text color="error" @click.prevent="delCustomer(customer.id)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CustomerList",

  data: () => {
    return {
      valueRating: 0,
      valueName: null
    };
  },

  methods: {
    editCustomer(id) {
      this.$router.push({ name: "EditForm", params: { id } });
    },
    delCustomer(id) {
      this.$store.dispatch("removeCustomer", id);
    }
  },

  computed: {
    filteredCustomers() {
      let customers = this.$store.getters.AllCustomers;
      if (this.valueName != null) {
        customers = customers.filter(el =>
          el.firstName.toLowerCase().includes(this.valueName.toLowerCase())
        );
      }
      if (this.valueRating.length) {
        customers = customers.filter(el => {
          return this.valueRating.includes(el.rating);
        });
      }
      return customers;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>