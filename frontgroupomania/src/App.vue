<template>
  <v-app>
    <v-content>
      <v-main>
      <headerTop></headerTop>
        <router-view></router-view>
      <pied></pied>
        <!-- <HelloWorld/> -->
      </v-main>
    </v-content>
  </v-app>
</template>

<script>
import headerTop from './components/header-top.vue'
import pied from './components/pied.vue'
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    'headerTop' : headerTop,
    'pied'  : pied
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>

</style>