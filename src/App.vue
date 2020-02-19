<template>
  <v-app>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer v-bind:customersCount="this.$store.getters.customersCount" />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Header,
    Footer
  },

  data: () => ({
    //
  }),
  async mounted() {
    this.$store.dispatch("fetchCustomersData", 10);
  }
};
</script>
