<template>
  <v-card>
    <v-footer height="100" class="font-weight-medium">
      <v-col class="text-center" cols="12">{{`Customers - ${customersCount}`}}</v-col>
      <v-col class="text-center" cols="12">
        <strong>
          <v-icon class="mr-1">mdi-copyright</v-icon>Company name
        </strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "Footer",

  props: {
    customersCount: Number
  }
};
</script>

<style lang="scss" scoped>
</style>