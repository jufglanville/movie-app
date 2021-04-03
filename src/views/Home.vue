<template>
  <!-- <p style="color: white">home</p> -->
  <div>
    <ListView />
  </div>
  <!-- <div class="search">
    <input type="text" placeholder="Search" v-model="search">
  </div>
  <div v-if="result" class="tile-container">
    <ListView :movies="result" />
  </div>
  <div v-if="error">{{ error }}</div> -->
</template>

<script>
import { ref, watch } from 'vue';
import ListView from '../components/ListView.vue';
import getMovies from '../composables/getMovies';

export default {
  name: 'Home',
  components: { ListView },
  setup() {
    const { result, error, searchMovies } = getMovies();
    const search = ref('');
    let timeout;

    watch(search, () => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        searchMovies(search.value);
        console.log(result);
      }, 500);
    });

    return {
      search, error, result,
    };
  },
};
</script>

<style>

</style>
