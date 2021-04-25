<template>
  <div class="trailer__backdrop">
    <div class="trailer__modal">
      <iframe v-if="result" :src="result[0].trailer" class="trailer__video"></iframe>
      <p v-if="error" class="trailer__error">Sorry, we don't have a trailer for this film</p>
      <span class="material-icons trailer__btn" v-on:click="handleClick">
        highlight_off
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import getMovieDetails from '../composables/getMovieDetails';

export default {
  props: ['isOpen', 'movieID'],
  setup(props, { emit }) {
    const { result, error, retrieveTrailer } = getMovieDetails();

    onMounted(async () => {
      await retrieveTrailer(props.movieID);
    });

    const handleClick = () => {
      emit('update:isOpen', false);
    };

    return { result, error, handleClick };
  },
};
</script>

<style lang="scss">
  .trailer {

    &__backdrop {
      top: 0;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,.5);
      width: 100vw;
      height: 100vh;
      z-index: 1000;
    }

    &__modal {
      width: 70vw;
      height: calc(70vw / 1.77);
      padding: 0;
      background: #000;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__video {
      width: 100%;
      height: 100%;
      border: none;
    }

    &__btn {
      font-size: 4rem;
      position: absolute;
      top: -1rem;
      right: -1rem;
      z-index: 3000;
      color: rgba(255, 255, 255, 0.644);
      transition: all .2s;

      &:hover {
        cursor: pointer;
        color: rgba(255, 255, 255, 0.822);
        transform: scale(1.2);
      }
    }

    &__error {
      color: tomato;
      font-size: 3rem;
    }
  }
</style>
