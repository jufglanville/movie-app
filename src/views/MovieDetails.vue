<template>
  <div class="detail">
    <img :src="result.Poster" alt="" class="detail__img">
    <div class="detail__content">
      <h2>{{ result.Title }}</h2>
      <div>
        <p>{{ result.Rated }}</p>
        <p>{{ result.Released }}</p>
        <p>{{ result.Runtime }}</p>
        <p>{{ result.Genre }}</p>
      </div>
      <p>{{ result.Plot }}</p>
      <div class="detail__rating">
        <p>MetaScore: {{ result.Metascore }}</p>
        <p>IMDB: {{ result.imdbRating }}</p>
        <p>Rotten Tomatoes: {{ result.Ratings[1].Value }}</p>
      </div>
      <p>{{ result.Actors }}</p>
      <p>{{ result.Director }}</p>
      <p>{{ result.Writer }}</p>
    </div>
  </div>
</template>

<script>
import getMovies from '../composables/getMovies';

export default {
  props: ['id'],
  setup(props) {
    const { result, error, searchMoviesDetails } = getMovies();

    searchMoviesDetails(props.id);
    console.log(result);

    return { result, error, props };
  },
};
</script>

<style>
  .detail {
    display: flex;
  }
</style>
