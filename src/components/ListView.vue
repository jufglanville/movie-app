<template>
  <div v-if="movies">
    <div v-if="movies.result !== null && movies.result.length > 0" class="tile-container">
      <div v-for="movie in movies.result" :key="movie.id" class="tile">
        <router-link :to="{ name: 'MovieDetails', params: { id: movie.id }}" class="tile__link">
          <img :src="movie.poster_path" :alt="movie.title" class="tile__img">
          <div class=tile__hover>
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.Year }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <p v-else style="color: red;">Sorry we couldn't find that movie {{ movies.error }}</p>
  </div>

</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
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
  .tile-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 30vw;
    height: calc(30vw * 1.5);
    max-width: 23rem;
    max-height: 35rem;
    padding: 1rem;
    transition: all .2s;
  }
  .tile:hover {
    transform: scale(1.04);
  }
  .tile__link {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .tile__img {
    width: 100%;
    min-height: 100%;
  }
  .tile__hover {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    padding: 1.5rem;
    transition: all .2s;
  }
  .tile__hover:hover {
    opacity: 1;
    background: rgba(0,0,0,.7);
  }
  .tile__hover h2 {
    font-size: 2rem;
  }
  .tile__hover p {
    font-size: 1.6rem;
  }
</style>
