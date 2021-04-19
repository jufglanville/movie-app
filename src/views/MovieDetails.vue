<template>
  <Trailer v-if="showModal" v-model:isOpen="showModal" :movieID="result.id" />
  <div v-if="result" class="detail">
    <span v-on:click="back" class="material-icons back__button">arrow_back_ios</span>
    <div class="detail__hero">
      <div class="detail__overlay"></div>
      <img :src="result.backdrop_path" alt="" class="detail__img">
      <span class="material-icons detail__play" v-on:click="handleClick()">
        play_circle_outline
      </span>
      <div class="detail__video"></div>
    </div>
    <div class="detail__content">
      <h2 class="detail__title">{{ result.title }}</h2>
      <div class="detail__banner">
        <div class="detail__tab">
          <div class="stars-outer">
            <div class="stars-inner" :style="{ width: result.vote_average * 10 + '%'}"></div>
          </div>
          <p class="detail__vote-count">{{ result.vote_count }}</p>
        </div>
        <h3 v-if="result.imdbRating" class="detail__imdb detail__tab">
          IMDb {{ result.imdbRating }}
        </h3>
        <div v-if="result.Ratings" class="detail__tomato detail__tab">
          <img v-if="result.rottenTomato === 1" src="../assets/rotten-tomato-90.png">
          <img v-if="result.rottenTomato === 2" src="../assets/rotten-tomato-60.png">
          <img v-if="result.rottenTomato === 3" src="../assets/rotten-tomato-0.png">
          <h3>{{ result.Ratings[1].Value }}</h3>
        </div>
        <h3 class="detail__tab">{{ result.releaseYear }}</h3>
        <div class="detail__rating">
          <img v-if="result.rating === 'U'" src="../assets/U.png">
          <img v-if="result.rating === 'PG'" src="../assets/PG.png">
          <img v-if="result.rating === '12'" src="../assets/12.png">
          <img v-if="result.rating === '12A'" src="../assets/12A.png">
          <img v-if="result.rating === '15'" src="../assets/15.png">
          <img v-if="result.rating === '18'" src="../assets/18.png">
        </div>
      </div>
      <p class="detail__plot">{{ result.overview }}</p>
      <table class="detail__cast">
        <tr>
          <th v-if="result.Actors">Starring:</th>
          <td>{{ result.Actors }}</td>
        </tr>
        <tr>
          <th v-if="result.Director">Director:</th>
          <td>{{ result.Director }}</td>
        </tr>
        <tr>
          <th v-if="result.Genre">Genre:</th>
          <td>{{ result.Genre }}</td>
        </tr>
      </table>
      <div class="favorites" v-on:click="addFavourite">
        <p v-if="!favourite">
          <span class="material-icons add-favorite">favorite</span> add to favorites
        </p>
        <p v-else>
          <span class="material-icons add-favorite fav-active">favorite</span> favorite
        </p>
      </div>
    </div>
  </div>
  <div class="related" v-if="relatedMovies">
    <h1 class="related__heading">You May Also Like...</h1>
    <Tile :movies="relatedMovies" section="relatedMovies" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import getMovies from '../composables/getMovies';
import Trailer from '../components/Trailer.vue';
import Tile from '../components/Tile.vue';

export default {
  props: ['id', 'poster_path'],
  components: { Trailer, Tile },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const showModal = ref(false);
    const { result, error, searchMoviesDetails } = getMovies();
    const favourite = ref();

    onMounted(async () => {
      const openClass = 'search__input--active';
      const input = document.querySelector('.search__input');
      if (input.classList.contains(openClass)) {
        input.classList.remove(openClass);
      }
      await searchMoviesDetails(props.id);
      store.dispatch('fetchRelatedMovies', props.id);

      // Check if film is a favourite
      if (store.state.favourite.result.find((el) => el.id === props.id)) {
        favourite.value = true;
      } else {
        favourite.value = false;
      }
    });

    const addFavourite = () => {
      if (favourite.value) {
        store.commit('removeFavourite', props.id);
        favourite.value = false;
      } else {
        const favouriteObj = {
          id: props.id,
          title: result.value.title,
          poster_path: props.poster_path,
        };
        favourite.value = true;
        store.commit('setFavourite', favouriteObj);
      }
    };

    const handleClick = () => {
      showModal.value = true;
    };

    const back = () => {
      router.go(-1);
    };

    return {
      result,
      error,
      props,
      handleClick,
      showModal,
      back,
      addFavourite,
      relatedMovies: computed(() => store.state.relatedMovies),
      favourite,
    };
  },
};
</script>

<style>
  .back__button {
    position: absolute;
    top: 20px;
    left: 30px;
    z-index: 300;
    font-size: 40px;
    color: rgba(255, 255, 255, 0.644);
    transition: all .2s;
  }
  .back__button:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.822);
    transform: scale(1.1);
  }
  .stars-outer {
    display: inline-block;
    position: relative;
    /* font-family: FontAwesome; */
    font-family: Material Icons;
    font-size: 20px;
  }
  .stars-outer::before {
    content: '\e83a \e83a \e83a \e83a \e83a';
    color: #f8ce0b;
  }
  .stars-inner {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    font-family: Material Icons;
    font-size: 20px;
    /* width: 0; */
  }
  .stars-inner::before {
    content: '\e838 \e838 \e838 \e838 \e838';
    color: #f8ce0b;
  }
  .detail {
    display: flex;
    flex-direction: column;
    padding: 60px 50px 0 50px;
    position: relative;
    background: rgb(15, 23, 30);
    height: calc(60vw * .56 - 60px);
    color: #fff;
  }
  .detail__hero {
    position: absolute;
    display: flex;
    width: 60vw;
    right: 0;
    top: 0;
  }
  .detail__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(90deg,
    rgba(15,23,30,1) 0%, rgba(15,23,30,.5) 20%, rgba(15,23,30,0) 100%),
    linear-gradient(0deg, rgba(15,23,30,1) 0%, rgba(15,23,30,.5) 20%, rgba(15,23,30,0) 100%);
  }
  .detail__img {
    width: 99%;
    margin-left: auto;
  }
  .detail__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    font-size: 80px;
    color: rgba(255, 255, 255, 0.644);
    transition: all .2s;
  }
  .detail__play:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.822);
    transform: translate(-50%, -50%) scale(1.1);
  }
  .detail__content {
    padding-left: 20px;
    position: absolute;
    z-index: 100;
    width: 55vw;
  }
  .detail__title {
    font-size: 35px;
  }
  .detail__banner {
    display: flex;
    padding: 15px 0;
  }
  .detail__vote-count {
    font-size: 16px;
    color: #79b8f3;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
  .detail__vote-count::before {
    content: "(";
    display: inline-block;
  }
  .detail__vote-count::after {
    content: ")";
    display: inline-block;
  }
  .detail__tab {
    display: flex;
    align-items: center;
    padding-right: 20px;
    font-size: 16px;
    color: #8197a4;
    font-weight: 400;
  }
  .detail__tab h3 {
    padding-left: 5px;
    font-size: 16px;
    font-weight: 400;
  }
  .detail__tomato {
    display: flex;
    /* max-height: 20px; */
  }
  .detail__tomato img {
    height: 100%;
    max-width: 25px;
  }
  .detail__rating img {
    max-width: 25px;
  }
  .detail__plot {
    font-size: 16px;
  }
  .detail__info {
    display: flex;
  }
  .detail__info p {
    padding: 0 20px;
  }
  .detail__cast {
    color: #8197a4;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    margin-top: 20px;
  }
  .detail__cast th {
    vertical-align: top;
    text-align: left;
    font-weight: bold;
    padding-right: 30px;
    padding-bottom: 5px;
  }
  .detail__cast td {
    font-weight: 400;
    color: #79b8f3;
  }
  .related__heading {
    font-size: 25px;
    color: #fff;
    margin-bottom: 20px;
    margin-left: 50px;
  }
  .favorites {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 16px;
  }
  .favorites p {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .add-favorite {
    color: #f75c417e;
    font-size: 30px;
    padding-right: 15px;
    transition: all .2s;
  }
  .add-favorite:hover {
    color: #f74425;
    transform: scale(1.2);
    cursor: pointer;
  }
  .fav-active {
    color: #f74425;
    transform: scale(1.2);
    cursor: pointer;
  }
</style>
