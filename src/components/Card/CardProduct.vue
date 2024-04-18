<template>
  <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
    <div class="card hover-shadow" @click="() => router.push(`/books/${book._id}`)">
      <img
        :src="baseURL + '/' + book.image"
        class="card-img-top"
        style="height: 200px; object-fit: cover"
        alt="Product 1"
      />

      <div class="card-body">
        <h5 class="card-title text-center fs-6">{{ book.title }}</h5>
        <p class="card-text text-center">{{ book.price }}&#x20AB;</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'

const baseURL = import.meta.env.VITE_BE_ENDPOINT
const props = defineProps(['book'])
</script>

<style>
.card.hover-shadow:hover {
  cursor: pointer;
  transform: translateY(-1px);
  border-color: #226e3e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
