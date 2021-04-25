<template>
  <footer class="footer">
    <p class="footer__paragraph">built by Joe Glanville</p>
    <div>
        <p class="footer__paragraph">powered by:</p>
        <img src="../assets/tmdb.svg" alt="tmdb logo" class="footer__logo">
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  .footer {
    margin-top: auto;
    background: #1b2530;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 10rem;

    &__paragraph {
      color: #fff;
      font-size: 1.6rem;
    }
    &__logo {
      padding-top: .5rem;
    }
  }
</style>
