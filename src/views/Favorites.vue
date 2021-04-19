<template>
  <div v-if="movies.result.length">
    <ListView :movies="movies" />
  </div>
  <div v-else>
    <p style="color: red">You Don't have any favourites yet</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ListView from '../components/ListView.vue';

export default {
  name: 'Favourite',
  components: { ListView },
  setup() {
    const store = useStore();

    return {
      movies: computed(() => store.state.favourite),
    };
  },

};
</script>

<style>

</style>
