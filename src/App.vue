<template>
  <Navbar />
  <div class="container">
    <router-view :key="$route.fullPath" />
  </div>
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Navbar, Footer },
};
</script>

<style>
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
