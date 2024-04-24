<template>
  <header-store />

  <!-- layout content -->
  <div class="m-auto container" style="padding-bottom: 100px">
    <router-view />
  </div>

  <Footer />
</template>

<script setup>
import HeaderStore from '@/components/header/HeaderStore.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<style></style>
