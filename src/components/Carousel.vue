<template>
  <div v-if="movies" class="carousel" :class="section">
    <div v-on:click="nav('previous')" class="carousel__btn carousel__btn--previous">
      <span class="material-icons">arrow_back_ios_new</span>
    </div>
    <div class="carousel__tile-container">
      <MovieTile :movies="movies" />
    </div>
    <div v-on:click="nav('next')" class="carousel__btn carousel__btn--next">
      <span class="material-icons">arrow_forward_ios</span>
    </div>
    <p v-if="movies.error" class="error-tiles">{{ movies.error }}</p>
  </div>

</template>

<script>
import MovieTile from './MovieTile.vue';

export default {
  components: { MovieTile },
  props: ['movies', 'section'],
  setup(props) {
    let currentTile = 0;
    let scrollAmount = 0;
    let transition = false;

    const nav = (dir) => {
      if (transition) { return; }
      const section = document.querySelector(`.${props.section}`);
      const container = section.querySelector('.carousel__tile-container');
      const containerWidth = section.offsetWidth;
      const tiles = section.querySelectorAll('.tile');
      const tileWidth = tiles[1].offsetWidth;
      const tileQuantity = section.querySelectorAll('.tile').length;
      const noPerScreen = Math.floor(containerWidth / tileWidth);

      if (dir === 'previous') {
        if (currentTile > 0) {
          currentTile -= noPerScreen;
          if (currentTile < 0) {
            currentTile = 0;
          }
          const scroll = tiles[currentTile].getBoundingClientRect();

          if (currentTile === 0) {
            scrollAmount += scroll.left;
          } else {
            scrollAmount += scroll.left - 50;
          }
          scrollAmount = Math.round(scrollAmount);
          container.style.transform = `translateX(-${scrollAmount}px)`;
        }
        transition = true;
      } else if (dir === 'next') {
        if (currentTile < (tileQuantity - noPerScreen)) {
          currentTile += noPerScreen;
          const scroll = tiles[currentTile].getBoundingClientRect();
          scrollAmount += scroll.left - 50;
          scrollAmount = Math.round(scrollAmount);
          container.style.transform = `translateX(-${scrollAmount}px)`;
        } else {
          console.log('go back to start');
          container.style.transform = 'translateX(0px)';
          currentTile = 0;
          scrollAmount = 0;
        }
        transition = true;
      }
      container.addEventListener('transitionend', () => {
        transition = false;
      });
    };

    return { nav };
  },
};
</script>

<style lang="scss">
.carousel {
  position: relative;
  overflow: hidden;
  display: flex;

  &__btn {
    position: absolute;
    z-index: 1000;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    opacity: .6;
    transition: all .2s;
    font-size: 6rem;
    color: rgba(255, 255, 255, 0.644);

    &:hover {
      cursor: pointer;
      opacity: 1;
    }

    &--previous {
      left: 0;
      padding-right: 4rem;
      background: linear-gradient(to right,#0f171e, #0f171e 20%, rgba(0, 0, 0, 0));
    }
    &--next {
      right: 0;
      padding-left: 4rem;
      background: linear-gradient(to left,#0f171e, #0f171e 20%, rgba(0, 0, 0, 0));
    }
    & span {
      font-size: 6rem;
    }
  }

  &__tile-container{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    transition: all .5s ease-in-out;

    & .tile:nth-child(1) {
      padding-left: 6rem;
    }
    & .tile:nth-last-child(1) {
      padding-right: 6rem;
    }
  }
}
</style>
