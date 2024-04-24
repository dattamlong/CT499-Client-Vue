<template>
  <div>
    <h2 class="title">
      <b>{{ heading }}</b>
    </h2>

    <!-- danh sách sản phẩm khác -->
    <list-product :books="books"></list-product>
  </div>
</template>

<script setup>
const props = defineProps(['books', 'heading'])
import ListProduct from '../list/ListProduct.vue'
</script>

<style>
.title {
  color: #000;
  font-size: 26px;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  margin: 30px 0 60px;
}
.title::after {
  content: '';
  width: 100px;
  position: absolute;
  margin: 0 auto;
  height: 4px;
  border-radius: 1px;
  background: #226e3e;
  left: 0;
  right: 0;
  bottom: -20px;
}
</style>
