<template>
  <div class="spin"></div>
</template>

<script>
export default {

};
</script>

<style>
  .spin {
    display: block;
    width: 40px;
    height: 40px;
    margin: 30px auto;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #ff8800;
    animation: spin 1s infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
