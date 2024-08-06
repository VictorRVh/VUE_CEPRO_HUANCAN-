<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HEADER from './components/Header/Nav.vue'
</script>

<template>

  <div class="content-main">
    <HEADER />
    <RouterView />
  </div>

</template>

<style scoped>

.content-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: aqua;
}

</style>
