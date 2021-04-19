<template>
  <div v-if="movies" class="tile-scroll-container" :class="section">
    <div v-on:click="nav('previous')" class="nav__btns nav__btns--previous">
      <span class="material-icons previous-btn">arrow_back_ios_new</span>
    </div>
    <div v-if="movies.result" class="tile-container">
      <div v-for="movie in movies.result" :key="movie.id" class="tile">
        <router-link :to="{ name: 'MovieDetails',
        params: { id: movie.id, poster_path: movie.poster_path }}"
        class="tile__link">
          <img :src="movie.poster_path" :alt="movie.title" class="tile__img">
          <div class=tile__hover>
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.Year }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-on:click="nav('next')" class="nav__btns nav__btns--next">
      <span class="material-icons next-btn">arrow_forward_ios</span>
    </div>
    <p v-if="movies.error" class="error-tiles">{{ movies.error }}</p>
  </div>

</template>

<script>

export default {
  props: ['movies', 'section'],
  setup(props) {
    let currentTile = 0;
    let scrollAmount = 0;
    let transition = false;

    const nav = (dir) => {
      if (transition) { return; }
      const section = document.querySelector(`.${props.section}`);
      const container = section.querySelector('.tile-container');
      const containerWidth = container.offsetWidth;
      const tiles = section.querySelectorAll('.tile');
      const tileWidth = tiles[0].offsetWidth;
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

<style scoped>
  .tile-scroll-container {
    position: relative;
    overflow: hidden;
    padding: 20px 0;
  }
  .nav__btns {
    position: absolute;
    z-index: 1000;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
  }
  .nav__btns--previous {
    left: 0;
    padding-right: 40px;
    background: linear-gradient(to right,#0f171e, #0f171e 20%, rgba(0, 0, 0, 0));
    opacity: .6;
    transition: all .2s;
  }
  .nav__btns--next {
    right: 0;
    padding-left: 40px;
    background: linear-gradient(to left,#0f171e, #0f171e 20%, rgba(0, 0, 0, 0));
    opacity: .6;
    transition: all .2s;
  }
  .nav__btns:hover {
    cursor: pointer;
    opacity: 1;
  }
  .previous-btn, .next-btn {
    font-size: 60px;
    color: rgba(255, 255, 255, 0.644);
  }

  .tile-container{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    transition: all .5s ease-in-out;
  }
  .tile:nth-child(1) {
    padding-left: 60px;
  }
  .tile:nth-last-child(1) {
    padding-right: 60px;
  }
  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 23rem;
    max-width: 23rem;
    min-height: 35rem;
    max-height: 35rem;
    padding: 0 1rem;
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
  .error-tiles {
    color: red;
    font-size: 20px;
    padding-left: 50px;
  }
</style>
