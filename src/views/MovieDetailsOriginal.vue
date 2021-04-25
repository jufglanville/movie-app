<template>
  <Trailer v-if="showModal" v-model:isOpen="showModal" :movieID="props.id" />
  <div v-if="result" class="wrapper">
    <span v-on:click="back" class="material-icons back__button">arrow_back_ios</span>
    <div class="hero">
      <div class="hero__overlay"></div>
      <img :src="result.backdrop_path" alt="" class="hero__img">
      <span class="material-icons hero__play" v-on:click="handleClick()">
        play_circle_outline
      </span>
      <div class="hero__video"></div>
    </div>
    <div class="detail">
      <h2 class="detail__header">{{ result.title }}</h2>
      <div class="detail__banner banner">
        <div class="banner__container">
          <div class="banner__stars">
            <div class="banner__stars--inner" :style="{ width: result.vote_average * 10 + '%'}">
            </div>
          </div>
          <p class="banner__vote-count">{{ result.vote_count }}</p>
        </div>
        <h3 v-if="result.imdbRating" class="banner__container">
          IMDb {{ result.imdbRating }}
        </h3>
        <div v-if="result.Ratings" class="detail__tomato banner__container">
          <img v-if="result.rottenTomato === 1" src="../assets/rotten-tomato-90+.png">
          <img v-if="result.rottenTomato === 2" src="../assets/rotten-tomato-60-89.png">
          <img v-if="result.rottenTomato === 3" src="../assets/rotten-tomato-0-59.png">
          <h3>{{ result.Ratings[1].Value }}</h3>
        </div>
        <h3 class="banner__container">{{ result.releaseYear }}</h3>
        <div class="banner__container">
          <img v-if="result.rating === 'U'" src="../assets/U.png">
          <img v-if="result.rating === 'PG'" src="../assets/PG.png">
          <img v-if="result.rating === '12'" src="../assets/12.png">
          <img v-if="result.rating === '12A'" src="../assets/12A.png">
          <img v-if="result.rating === '15'" src="../assets/15.png">
          <img v-if="result.rating === '18'" src="../assets/18.png">
        </div>
      </div>
      <p class="detail__plot">{{ result.overview }}</p>
      <table class="detail__cast cast">
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
      <div class="favorite" v-on:click="addFavourite">
        <p v-if="!favourite">
          <span class="material-icons favorite__icon">favorite</span>
           add to favorites
        </p>
        <p v-else>
          <span class="material-icons favorite__icon favorite__icon--active">favorite</span>
           favorite
        </p>
      </div>
    </div>
  </div>
  <div class="related" v-if="relatedMovies.result">
    <h1 class="related__heading">You May Also Like...</h1>
    <Carousel :movies="relatedMovies" section="relatedMovies" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import getMovies from '../composables/getMovies';
import Trailer from '../components/Trailer.vue';
import Carousel from '../components/Carousel.vue';

export default {
  props: ['id', 'poster_path'],
  components: { Trailer, Carousel },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const showModal = ref(false);
    const { result, error, searchMoviesDetails } = getMovies();
    const favourite = ref();
    console.log(props.id);

    onMounted(async () => {
      const openClass = 'navbar__search--active';
      const input = document.querySelector('.navbar__search');
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

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 6rem 5rem 0 5rem;
    position: relative;
    background: rgb(15, 23, 30);
    min-height: calc(60vw * .56 - 6rem);
    color: #fff;
  }

  .back__button {
    position: absolute;
    top: 2rem;
    left: 3rem;
    z-index: 300;
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.644);
    transition: all .2s;

    &:hover {
      cursor: pointer;
      color: rgba(255, 255, 255, 0.822);
      transform: scale(1.1);
    }
  }

  .hero {
    position: absolute;
    width: 60vw;
    right: 0;
    top: 0;
    display: flex;

    &__overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      background: linear-gradient(90deg,
      rgba(15,23,30,1) 0%, rgba(15,23,30,.5) 20%, rgba(15,23,30,0) 100%),
      linear-gradient(0deg, rgba(15,23,30,1) 0%, rgba(15,23,30,.5) 20%, rgba(15,23,30,0) 100%);
    }
    &__img {
      width: 99%;
      margin-left: auto;
    }
    &__play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      font-size: 8rem;
      color: rgba(255, 255, 255, 0.644);
      transition: all .2s;

      &:hover {
        cursor: pointer;
        color: rgba(255, 255, 255, 0.822);
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
  }

  .detail {
    padding-left: 2rem;
    padding-bottom: 2rem;
    z-index: 100;
    width: 55vw;

    &__header {
      font-size: 3.5rem;
    }

    &__banner {
      padding: 1.5rem 0;
    }

    &__plot {
      font-size: 1.6rem;
    }

    &__cast {
      margin-top: 2rem;
    }
  }

  .banner {
    display: flex;

    &__container {
      display: flex;
      align-items: center;
      padding-right: 2rem;
      font-size: 1.6rem;
      color: #8197a4;
      font-weight: 400;

      & h3 {
        padding-left: .5rem;
        font-size: 1.6rem;
        font-weight: 400;
      }

      & img {
        max-width: 2.5rem;
      }
    }

    &__stars {
      display: inline-block;
      position: relative;
      font-family: Material Icons;
      font-size: 2rem;

      &::before {
        content: '\e83a \e83a \e83a \e83a \e83a';
        color: #f8ce0b;
      }

      &--inner {
        position: absolute;
        top: 0;
        left: 0;
        white-space: nowrap;
        overflow: hidden;
        font-family: Material Icons;
        font-size: 2rem;

        &::before {
          content: '\e838 \e838 \e838 \e838 \e838';
          color: #f8ce0b;
        }
      }
    }

    &__vote-count {
      font-size: 1.6rem;
      color: #79b8f3;
      display: flex;
      align-items: center;
      padding-left: .5rem;

      &::before {
        content: "(";
        display: inline-block;
      }
      &::after {
        content: ")";
        display: inline-block;
      }
    }
  }

  .cast {
    color: #8197a4;
    font-size: 1.6rem;
    font-weight: bold;
    position: relative;

    & th {
      vertical-align: top;
      text-align: left;
      font-weight: bold;
      padding-right: 3rem;
      padding-bottom: .5rem;
    }
    & td {
      font-weight: 400;
      color: #79b8f3;
    }
  }

  .favorite {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    font-size: 1.6rem;

    & p {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
    }

    &__icon {
      color: #f75c417e;
      font-size: 3rem;
      padding-right: 1.5rem;
      transition: all .2s;

      &:hover {
        color: #f74425;
        transform: scale(1.2);
        cursor: pointer;
      }

      &--active {
        color: #f74425;
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }

  .related__heading {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 2rem;
    margin-left: 5rem;
  }
</style>
