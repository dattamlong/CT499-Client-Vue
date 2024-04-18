<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Cột cho hình ảnh sản phẩm -->
      <div class="col-lg-6">
        <div class="card">
          <img
            style="height: 600px; object-fit: cover"
            :src="baseURL + '/' + book.image"
            alt="Tên sản phẩm"
            class="card-img-top img-fluid"
          />
        </div>
      </div>

      <div class="col-lg-6">
        <h1 class="product-name mb-3">{{ book.title }}</h1>
        <h4 v-if="book.category !== 'other'" class="product-price mb-4">
          Thể loại: {{ formatCurrency(book.category || 0) }}
        </h4>
        <h3 class="product-price mb-4">{{ formatCurrency(book.price || 0) }}</h3>
        <p class="product-quantity mb-4">Số lượng còn lại: {{ book.quantity || 0 }}</p>
        <button class="btn btn-primary me-2">Mượn sách</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '@/utils/format.js'
import { getOne } from '@/api/dataController'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const baseURL = import.meta.env.VITE_BE_ENDPOINT
const route = useRoute()
const id = route.params.id
const book = ref({})

onMounted(async () => {
  try {
    const res = await getOne('books', id)
    console.log(res)
    book.value = res
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
/* Tạo khoảng cách cho phần chi tiết sản phẩm */
.container {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Tăng kích thước tiêu đề sản phẩm và thêm màu */
.product-name {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

/* Tăng kích thước và thêm màu cho giá sản phẩm */
.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

/* Căn chỉnh các nút */
button {
  display: inline-block;
  margin-top: 15px;
}

/* Zoom cho hình ảnh */
.card {
  overflow: hidden;
  cursor: pointer;
}

.card img {
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.1);
}
</style>
