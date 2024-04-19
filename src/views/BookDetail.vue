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
                class="btn flex-shrink-0"
                style="background-color: #226e3e; color: #fff"
                type="button"
              >
                <i class="bi-cart-fill me-1"></i>
                Mượn sách
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Related items section-->
    <ListProductCarousel :books="books" />
  </div>
  <div v-else><Spinner /></div>
</template>

<script setup>
import { formatCurrency } from '@/utils/format.js'
import { getList, getOne } from '@/api/dataController'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ListProductCarousel from '../components/list/ListProductCarousel.vue'
import Spinner from '../components/Spinner/Spinner.vue'

const baseURL = import.meta.env.VITE_BE_ENDPOINT
const route = useRoute()
const id = route.params.id
const book = ref({})
const books = ref([])
const loading = ref(false)

watch(
  () => id,
  () => {
    fetchData()
  }
)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getOne('books', id)
    const { data } = await getList('books')
    const filteredBooks = data.filter((item) => item._id !== res._id)
    books.value = filteredBooks.slice(0, 6)
    book.value = res
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}

onBeforeMount(() => {
  fetchData()
})
</script>
