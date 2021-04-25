<template>
  <div v-if="movies.result.length" class="grid__container">
    <MovieTile :movies="movies" />
  </div>
  <div v-else class="favorite__container">
    <span class="material-icons favorite__icon ">favorite</span>
    <p class="favorite__no-favorite">You don't have any favourites yet</p>
    <p class="favorite__no-favorite">why not add some by clicking the heart icon in the details</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MovieTile from '../components/MovieTile.vue';

export default {
  name: 'Favourite',
  components: { MovieTile },
  setup() {
    const store = useStore();

    return {
      movies: computed(() => store.state.favourite),
    };
  },

};
</script>

<style lang="scss">
  .favorite {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15vh 2rem;
      font-size: 2rem;
    }
    &__no-favorite {
      color: rgb(117,117,117);
      text-align: center;
    }
  }
</style>
