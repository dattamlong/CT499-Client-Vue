<template>
  <nav class="py-3 bg-body-tertiary border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item">
          <a href="#" class="nav-link link-body-emphasis px-2 active" aria-current="page"
            >Giới thiệu</a
          >
        </li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Liên hệ</a></li>
      </ul>

      <div class="dropdown">
        <button
          class="btn m-0 dropdown-toggle d-flex align-items-center"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="baseURL + '/' + authStore.user.avatar"
            class="rounded-circle"
            style="width: 25px; height: 25px; object-fit: cover"
            alt="Avatar"
          />
          <span>&nbsp; Nguyễn Tuấn Đạt</span>
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li>
            <button @click="() => router.push('/profile')" class="dropdown-item" type="button">
              Tài khoản của tôi
            </button>
          </li>
          <li>
            <button @click="() => authStore.logout()" class="dropdown-item" type="button">
              Đăng xuất
            </button>
          </li>
          <li>
            <button
              @click="() => router.push('/borrow-history')"
              class="dropdown-item"
              type="button"
            >
              Lịch sử mượn sách
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <header class="py-3 mb-4 border-bottom">
    <div class="container d-flex flex-wrap justify-content-center">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
      >
        <img src="../../assets/icons/logo.svg" alt="logo" />
        <span style="color: #226e3e" class="fs-4"> &nbsp; ColdBook</span>
      </a>
      <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
        <input type="search" class="form-control" placeholder="Tìm kiếm..." aria-label="Search" />
      </form>
    </div>
  </header>
</template>

<script setup>
const baseURL = import.meta.env.VITE_BE_ENDPOINT
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>
