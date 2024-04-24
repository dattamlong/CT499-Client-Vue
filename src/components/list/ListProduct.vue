<template>
  <div class="mt-5">
    <div class="row g-2">
      <card-product v-for="(book, index) in books" :key="index" :book="book" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['books'])
import CardProduct from '../Card/CardProduct.vue'
</script>
