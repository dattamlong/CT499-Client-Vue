<template>
  <div>
    <banner />
    <ListProductCarousel :books="books" heading="Tất cả sản phẩm" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner/Banner.vue'
import ListProductCarousel from '@/components/list/ListProductCarousel.vue'
import { getList } from '@/api/dataController'

const loading = ref(false)
const books = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await getList('books')

    books.value = data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
})
</script>
