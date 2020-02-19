<template>
  <div>
    <v-app-bar>
      <v-toolbar-title>
        <router-link to="/" class="title">Site title</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <Authorization />
    </v-app-bar>
  </div>
</template>

<script>
import Authorization from "./Authorization";

export default {
  name: "Header",

  components: {
    Authorization
  }
};
</script>

<style scoped>
.title {
  text-decoration: none;
  color: black;
}
</style>