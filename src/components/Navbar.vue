<template>
  <nav class="navbar">
    <router-link :to="{ name: 'Home' }" class="navbar__logo-container">
      <span class="material-icons navbar__logo">theaters</span>
      <h1 class="navbar__header">MoviVerse</h1>
    </router-link>

    <!-- <Search /> -->
    <div class="navbar__links-container">
      <div class="navbar__search-container">
        <input class="navbar__search" type="text" placeholder="Search" v-model="search">
        <span class="material-icons navbar__search-icon" v-on:click="openSearch()">search</span>
      </div>
      <div class="navbar__favorite-container">
        <router-link :to="{ name: 'Favorites' }">
          <span class="material-icons navbar__favorite-icon">favorite</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { watch, ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const search = ref('');
    const searchOpen = ref(false);
    let timeout;

    watch(search, () => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        store.dispatch('fetchMovies', search.value);
      }, 500);
      if (search.value.length > 0) {
        router.push({ name: 'Search' });
      }
    });

    const openSearch = () => {
      const openClass = 'navbar__search--active';
      const input = document.querySelector('.navbar__search');
      if (input.classList.contains(openClass)) {
        input.classList.remove(openClass);
      } else {
        input.classList.add(openClass);
        input.select();
      }
    };

    return { search, searchOpen, openSearch };
  },
};
</script>

<style lang="scss">
  .navbar {
    background: #1b2530;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    &__logo-container {
      display: flex;
      text-decoration: none;
      align-items: center;
      color: #fff;
    }
    &__logo {
      color: #fff;
      font-size: 5rem;
      transition: all .2s;

      &:hover {
        transform: scale(1.2);
      }
    }
    &__header {
      font-family: 'Raleway', sans-serif;
      font-size: 4rem;
      font-weight: 100;
      font-style: italic;
      padding-left: 1rem;
      transition: all .2s;

      &:hover {
        transform: scale(1.05);
      }
    }

    &__links-container {
      display: flex;
      align-items: center;
      font-size: 2rem;
      color: #8197a4;
    }

    &__search-container {
      display: flex;
      align-items: center;
      position: relative;
      width: calc(20vw + 3.5rem);
      overflow: hidden;
    }
    &__search {
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

      &--active {
        opacity: 1;
        transform: translateX(0px);
      }
    }
    &__search-icon {
      color: #8197a4;
      font-size: 3.5rem;
      margin-left: auto;
      transition: all .2s;
      z-index: 1;

      &:hover {
        color: #aac7d8;
        transform: scale(1.2);
        cursor: pointer;
      }
    }

    &__favorite-container {
      padding-left: 1.5rem;
    }
    &__favorite-icon {
      color: #f75c41;
      font-size: 3rem;
      transition: all .2s;

      &:hover {
        color: #f74425;
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }

</style>
