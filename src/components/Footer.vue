<template>
  <footer>
    <p class="footer__paragraph">built by Joe Glanville</p>
    <div>
        <p class="footer__paragraph">powered by:</p>
        <img src="../assets/tmdb.svg" alt="">
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style>
  footer {
    margin-top: auto;
    background: #1b2530;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 10rem;
  }
  .footer__paragraph {
    color: #fff;
    font-size: 16px;
  }
</style>
