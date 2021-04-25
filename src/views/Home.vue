<template>
  <div class="new-releases movies__container" v-if="comingSoon && comingSoon.result">
    <h1 class="movies__heading">Coming Soon</h1>
    <Carousel :movies="comingSoon" section="comingSoonFilms" />
  </div>
  <div class="new-releases movies__container" v-if="nowPlaying && nowPlaying.result">
    <h1 class="movies__heading">New Releases</h1>
    <Carousel :movies="nowPlaying" section="newReleases" />
  </div>
  <div class="new-releases movies__container" v-if="popular && popular.result">
    <h1 class="movies__heading">Popular Films</h1>
    <Carousel :movies="popular" section="popularFilms" />
  </div>
  <div class="new-releases movies__container" v-if="topRated && topRated.result">
    <h1 class="movies__heading">Top Rated Films</h1>
    <Carousel :movies="topRated" section="topRatedFilms" />
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Carousel from '../components/Carousel.vue';

export default {
  name: 'Home',
  components: { Carousel },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const openClass = 'navbar__search--active';
      const input = document.querySelector('.navbar__search');
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
    padding: 2rem 0;
  }
  .movies__heading {
    font-size: 3.5rem;
    color: #fff;
    margin-bottom: 1rem;
    margin-left: 4rem;
  }
</style>
