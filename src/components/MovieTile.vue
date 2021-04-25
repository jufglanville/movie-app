<template>
  <div v-for="movie in movies.result" :key="movie.id" class="tile">
    <router-link :to="{ name: 'MovieDetails',
    params: { id: movie.id, poster_path: movie.poster_path }}"
    class="tile__link">
      <img :src="movie.poster_path" :alt="movie.title" class="tile__img">
      <div class="tile__hover">
        <h2 class="tile__title">{{ movie.title }}</h2>
        <p class="tile__year">{{ movie.Year }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['movies'],
};
</script>

<style lang="scss">
  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 23rem;
    width: 23rem;
    height: 35rem;
    padding: 1rem;
    transition: all .2s;

    &:hover {
      transform: scale(1.04);
    }

    &__link {
      position: relative;
      height: 100%;
      overflow: hidden;
    }
    &__img {
      width: 100%;
      min-height: 100%;
    }
    &__hover {
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
    &__hover:hover {
      opacity: 1;
      background: rgba(0,0,0,.7);
    }
    &__title {
      font-size: 2rem;
    }
    &__year {
      font-size: 1.6rem;
    }
  }
</style>
