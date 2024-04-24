<template>
  <header-default />
  <!-- layout content -->
  <div class="m-auto container" style="padding-bottom: 500px">
    <router-view />
  </div>

  <Footer />
</template>

<script setup>
import HeaderDefault from '@/components/header/HeaderDefault.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>
