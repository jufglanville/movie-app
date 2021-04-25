<template>
  <div v-if="movies">
    <div v-if="movies.result" class="grid__container">
      <MovieTile :movies="movies" />
    </div>
    <div v-if="movies.error" class="search__container">
      <p class="search__error">{{ movies.error }}</p>
    </div>
    <div v-if="movies.error === null & movies.result === null" class="search__container">
      <p class="search__no-search">Search for a movie using the search box above</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MovieTile from '../components/MovieTile.vue';

export default {
  name: 'Search',
  components: { MovieTile },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const openClass = 'search__input--active';
      const input = document.querySelector('.search__input');
      if (input && input.value.length > 0) {
        input.classList.add(openClass);
      }
    });

    return {
      movies: computed(() => store.state.movies),
    };
  },

};
</script>

<style lang="scss">
  .search {
    &__container {
      display: flex;
      justify-content: center;
      padding: 15vh 2rem;
      font-size: 2rem;
    }
    &__error {
      color: tomato;
    }
    &__no-search {
      color: rgb(117,117,117);
    }
  }
</style>
