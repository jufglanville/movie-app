<template>
  <div class="backdrop">
    <div class="modal">
      <iframe v-if="result"
        :src="result[0].trailer">
      </iframe>
      <p v-if="error" class="trailer-error">Sorry, we don't have a trailer for this film</p>
      <span class="material-icons close-btn" v-on:click="handleClick">
        highlight_off
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import getMovies from '../composables/getMovies';

export default {
  props: ['isOpen', 'movieID'],
  setup(props, context) {
    const { result, error, searchTrailers } = getMovies();

    onMounted(async () => {
      await searchTrailers(props.movieID);
    });

    const handleClick = () => {
      context.emit('update:isOpen', false);
    };

    return { result, error, handleClick };
  },
};
</script>

<style>
  .modal {
    width: 70vw;
    height: calc(70vw / 1.77);
    padding: 0;
    background: #000;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .backdrop {
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
  .close-btn {
    font-size: 40px;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 3000;
    color: rgba(255, 255, 255, 0.644);
    transition: all .2s;
  }
  .close-btn:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.822);
    transform: scale(1.2);
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  .trailer-error {
    color: tomato;
    font-size: 30px;
  }
</style>
