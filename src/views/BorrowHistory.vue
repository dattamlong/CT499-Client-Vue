<template>
  <div v-if="!loading" class="py-5 h-100">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h1 class="fw-bold mb-0 text-black">Lịch sử mượn sách</h1>
      <h6 class="mb-0 text-muted">{{ borrows.length }} sách đã mượn</h6>
    </div>

    <BorrowCardVue v-for="(item, index) in borrows" :key="index" :borrow="item" />
    <hr class="my-4" />
    <div class="pt-5">
      <h6 class="mb-0">
        <a href="/" class="text-body">Trở về trang chủ</a>
      </h6>
    </div>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script setup>
import { getList } from '@/api/dataController'
import BorrowCardVue from '@/components/Card/BorrowCard.vue'
import { onMounted, ref } from 'vue'
import Spinner from '../components/Spinner/Spinner.vue'

const borrows = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getList('borrows/reader')
    const { data: books } = await getList('books')

    const processedBook = books.reduce((prev, book) => {
      return { ...prev, [book._id]: book }
    }, {})

    borrows.value = res.data.map((item) => {
      const book = processedBook[item.book]
      return { ...item, book }
    })
  } catch (error) {
    console.log(error)
  }
  loading.value = false
})
</script>
