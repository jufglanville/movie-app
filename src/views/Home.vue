<template>
  <div class="new-releases movies__container" v-if="comingSoon">
    <h1 class="movies__heading">Coming Soon</h1>
    <Tile :movies="comingSoon" section="comingSoonFilms" />
  </div>
  <div class="new-releases movies__container" v-if="nowPlaying">
    <h1 class="movies__heading">New Releases</h1>
    <Tile :movies="nowPlaying" section="newReleases" />
  </div>
  <div class="new-releases movies__container" v-if="popular">
    <h1 class="movies__heading">Popular Films</h1>
    <Tile :movies="popular" section="popularFilms" />
  </div>
  <div class="new-releases movies__container" v-if="topRated">
    <h1 class="movies__heading">Top Rated Films</h1>
    <Tile :movies="topRated" section="topRatedFilms" />
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Tile from '../components/Tile.vue';

export default {
  name: 'Home',
  components: { Tile },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const openClass = 'search__input--active';
      const input = document.querySelector('.search__input');
      if (input.value.length > 0) {
        input.value = '';
        input.classList.remove(openClass);
      }
      store.dispatch('fetchNowPlaying');
      store.dispatch('fetchPopular');
      store.dispatch('fetchTopRated');
      store.dispatch('fetchComingSoon');
    });

    return {
      nowPlaying: computed(() => store.state.nowPlaying),
      popular: computed(() => store.state.popular),
      topRated: computed(() => store.state.topRated),
      comingSoon: computed(() => store.state.comingSoon),
    };
  },
};
</script>

<style>
  .movies__container {
    padding: 20px 0;
  }
  .movies__heading {
    font-size: 35px;
    color: #fff;
    margin-bottom: 10px;
    margin-left: 40px;
  }
</style>
