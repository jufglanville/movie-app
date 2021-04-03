<template>
  <nav class="navbar">
    <router-link :to="{ name: 'Home' }">
      <span class="material-icons logo">theaters</span>
    </router-link>
    <!-- <Search /> -->
    <div class="navbar__links">
      <div class="search search__container">
        <input class="search__input" type="text" placeholder="Search" v-model="search">
        <span class="material-icons search__icon" v-on:click="openSearch()">search</span>
      </div>
      <div class="favorite">
        <span class="material-icons favorite__icon">favorite</span>
      </div>
    </div>
  </nav>
</template>

<script>
// import Search from './Search.vue';
import { useStore } from 'vuex';
import { watch, ref } from 'vue';

export default {
  // components: { Search },
  setup() {
    const store = useStore();
    const search = ref('');
    const searchOpen = ref(false);
    let timeout;

    watch(search, () => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        store.dispatch('fetchMovies', search.value);
      }, 500);
    });

    const openSearch = () => {
      const openClass = 'search__input--active';
      const input = document.querySelector('.search__input');
      if (input.classList.contains(openClass)) {
        input.classList.remove(openClass);
      } else {
        input.classList.add(openClass);
      }
    };

    return { search, searchOpen, openSearch };
  },
};
</script>

<style>
  .navbar {
    background: #1b2530;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }
  .navbar__img {
    width: 5rem;
  }
  .navbar__links {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: #8197a4;
  }
  .logo {
    color: #fff;
    font-size: 50px;
  }
  .search__container{
    display: flex;
    align-items: center;
    position: relative;
    width: calc(20vw + 35px);
    overflow: hidden;
  }
  .search__icon {
    color: #8197a4;
    font-size: 35px;
    margin-left: auto;
    transition: all .2s;
    z-index: 1;
  }
  .search__icon:hover {
    color: #aac7d8;
    transform: scale(1.2);
    cursor: pointer;
  }
  .search__input {
    position: absolute;
    opacity: 0;
    outline: none;
    border: none;
    background: transparent;
    border-bottom: 2px solid #8197a4;
    width: 20vw;
    transform: translateX(20vw);
    font-size: 2rem;
    color: #fff;
    transition: all .2s;
    z-index: 0;
  }
  .search__input--active {
    opacity: 1;
    transform: translateX(0px);
  }
  .favorite {
    padding-left: 15px;
  }
  .favorite__icon {
    color: #f75c41;
    font-size: 30px;
    transition: all .2s;
  }
  .favorite__icon:hover {
    color: #f74425;
    transform: scale(1.2);
    cursor: pointer;
  }
</style>
