<template>
  <div v-if="!loading">
    <banner v-if="!route.query.search" />
    <ListProductCarousel
      :books="books"
      :heading="route.query.search ? 'Tìm kiếm cho: ' + route.query.search : 'Tất cả sách'"
    />
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner/Banner.vue'
import ListProductCarousel from '@/components/list/ListProductCarousel.vue'
import { getList } from '@/api/dataController'
import { useRoute } from 'vue-router'
import Spinner from '../components/Spinner/Spinner.vue'

const route = useRoute()

const loading = ref(false)
const books = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await getList('books', route.query.search ?? null)

    books.value = data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
})
</script>
