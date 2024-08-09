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

<style>
body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.content-main {
  padding: 20px;
}
</style>
