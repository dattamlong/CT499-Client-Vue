<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="handleSubmit">
      <h1 class="h3 mb-3 fw-normal">Đăng nhập</h1>
      <div class="form-floating">
        <input
          v-model:="formState.email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Địa chỉ Email</label>
      </div>
      <div class="form-floating">
        <input
          v-model:="formState.password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Mật khẩu</label>
      </div>

      <button class="btn w-100 py-2" style="background-color: #226e3e; color: #fff" type="submit">
        Đăng nhập
      </button>
    </form>
  </main>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { reactive, ref } from 'vue'

const loading = ref(false)

const formState = reactive({
  email: 'suyvai123@gmail.com',
  password: '12345678'
})

const handleSubmit = async () => {
  loading.value = true

  try {
    const authStore = useAuthStore()
    await authStore.login(formState)
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}
</script>

<style>
.form-signin {
  text-align: center;
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
