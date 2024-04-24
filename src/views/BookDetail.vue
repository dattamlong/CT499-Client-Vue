<template>
  <div v-if="!loading">
    <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6">
            <img
              class="card-img-top mb-5 mb-md-0"
              style="width: 550px; height: 550px; object-fit: cover"
              :src="baseURL + '/' + book.image"
              alt="Book Image"
            />
          </div>
          <div class="col-md-6">
            <div class="small mb-1">id: {{ book._id }}</div>
            <h1 class="display-5 fw-bolder">{{ book.title }}</h1>
            <div class="fs-5 mb-5">
              <span>{{ book.price }}&#x20AB;</span>
            </div>
            <p>{{ book.quantity }} quyển sách có sẵn</p>

            <div class="d-flex">
              <button
                :disabled="borrowed"
                @click="borrowBook"
                class="btn flex-shrink-0"
                style="background-color: #226e3e; color: #fff"
                type="button"
              >
                {{
                  borrowed?.borrowingDay
                    ? 'Đã mượn sách vào ngày ' + formatDate(borrowed?.borrowingDay)
                    : 'Mượn sách'
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Related items section-->
    <ListProductCarousel :books="books" heading="Các sản phẩm khác" />
  </div>
  <div v-else><Spinner /></div>
</template>

<script setup>
import { create, getList, getOne } from '@/api/dataController'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import ListProductCarousel from '../components/list/ListProductCarousel.vue'
import Spinner from '../components/Spinner/Spinner.vue'
import { formatDate } from '../utils/format'

const toast = useToast()
const baseURL = import.meta.env.VITE_BE_ENDPOINT
const route = useRoute()
const book = ref({})
const books = ref([])
const authStore = useAuthStore()
const loading = ref(true)
const userId = authStore.user._id
const borrowed = ref({})

watch(
  () => route.params.id,
  () => {
    fetchData()
  }
)

const borrowBook = async () => {
  loading.value = true
  try {
    const borrowingDay = new Date()
    const returnDay = new Date(borrowingDay.getTime() + 30 * 24 * 60 * 60 * 1000)
    const borrowingDayISO = borrowingDay.toISOString()
    const returnDayISO = returnDay.toISOString()

    const data = {
      reader: userId,
      book: route.params.id,
      borrowingDay: borrowingDayISO,
      returnDay: returnDayISO
    }
    await create('borrows', data)
    fetchData()
    toast.success('Hạn trả sách của bạn là tối đa 30 ngày sau khi mượn')
  } catch (error) {
    console.error(error)
    toast.error('Bạn không thể mượn quyển sách này')
  }
  loading.value = false
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getOne('books', route.params.id)
    const { data: borrows } = await getList('borrows/reader')
    const processed = borrows?.reduce((prev, borrow) => {
      return { ...prev, [borrow.book]: borrow }
    }, {})
    borrowed.value = processed[res._id]
    const { data } = await getList('books')
    const filteredBooks = data.filter((item) => item._id !== res._id)
    books.value = filteredBooks.slice(0, 6)
    book.value = res
  } catch (error) {
    console.error(error)
    toast.error('Quá trình lấy dữ liệu thất bại')
  }
  loading.value = false
}

onBeforeMount(() => {
  fetchData()
})
</script>
