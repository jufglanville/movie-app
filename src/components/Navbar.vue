<template>
  <nav class="navbar">
    <router-link :to="{ name: 'Home' }">
      <img src="@/assets/placeholder.png" alt="placeholder logo" class="navbar__img">
    </router-link>
    <div class="navbar__links">
      Favorites
    </div>
  </nav>
</template>

<script>

export default {

};
</script>

<style>
  .navbar {
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }
  .navbar__img {
    width: 5rem;
  }
  .navbar__links {
    font-size: 2rem;
  }
</style>
