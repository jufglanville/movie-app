<template>
  <div>
    <ListView :movies="movies" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ListView from '../components/ListView.vue';

export default {
  name: 'Search',
  components: { ListView },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const openClass = 'search__input--active';
      const input = document.querySelector('.search__input');
      if (input.value.length > 0) {
        input.classList.add(openClass);
      }
    });

    return {
      movies: computed(() => store.state.movies),
    };
  },

};
</script>

<style>

</style>
