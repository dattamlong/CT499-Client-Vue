<template>
  <main>
    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last text-center">
        <div class="">
          <img
            :src="getImg"
            class="rounded-circle"
            style="width: 270px; height: 270px; object-fit: cover"
            alt="Avatar"
          />
          <div class="my-1">
            <button type="button" class="btn" @click="handleClick">
              <div class="d-flex align-items-center">
                <img src="../assets/icons/upload.svg" alt="logo" />
                <span style="color: #226e3e" class="fs-5"> &nbsp; Tải ảnh lên</span>
              </div>
            </button>

            <input
              ref="inputRef"
              name="avatar"
              type="file"
              @change="handleFileUpload"
              accept="image/*"
              :style="{ display: 'none' }"
            />
          </div>
        </div>
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Thông tin cá nhân</h4>
        <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="lastName" class="form-label">Họ</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                placeholder="Nguyen"
                v-model="me.lastName"
                required
              />
              <div class="invalid-feedback">Họ là bắt buộc</div>
            </div>

            <div class="col-sm-6">
              <label for="firstName" class="form-label">Tên</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder="dat"
                v-model="me.firstName"
                required
              />
              <div class="invalid-feedback">Tên là bắt buộc!</div>
            </div>
            <div class="col-12">
              <label for="email" class="form-label">Email </label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="me.email"
                placeholder="you@example.com"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label class="form-label">Số điện thoại</label>
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="me.phoneNumber"
                placeholder="086824..."
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Địa chỉ</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="1234 Main St"
                v-model="me.address"
                required
              />
              <div class="invalid-feedback">Please enter your shipping address.</div>
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">giới tính</label>
              <select class="form-select" id="gender" required v-model="me.gender">
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
                <option value="unknown"></option>
              </select>
              <div class="invalid-feedback">Please select a valid country.</div>
            </div>

            <div class="col-md-6">
              <label for="zip" class="form-label">Ngày sinh</label>
              <input
                type="date"
                class="form-control"
                id="zip"
                v-model="me.birthday"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Zip code required.</div>
            </div>
          </div>

          <hr class="my-4" />

          <button
            class="w-100 btn btn-lg"
            style="background-color: #226e3e; color: #fff"
            type="submit"
          >
            Lưu thông tin
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
const baseURL = import.meta.env.VITE_BE_ENDPOINT
import { getOne, updateOne, uploadImage } from '@/api/dataController'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
const me = ref({})
const inputRef = ref(null)
const imageUrl = ref('')
const message = ref({})

const handleClick = () => {
  inputRef.value?.click()
}

const handleSubmit = async () => {
  try {
    console.log(me.value)
    const { firstName, lastName, phoneNumber, gender, birthday, avatar, address } = me.value
    await updateOne('users', 'me', {
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      avatar,
      address
    })
    toast.success('cập Nhật Thông tin cá nhân thành công!')
  } catch (error) {
    console.error(error)
  }
}

const handleFileUpload = async (event) => {
  try {
    const el = event.target
    const file = el.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        imageUrl.value = reader.result
      }
      reader.readAsDataURL(file)
      const { data } = await uploadImage('avatar', file)
      me.value.avatar = data.imagePath
    }
  } catch (err) {
    console.log(err)
  }
}

const getImg = computed(() => {
  if (imageUrl.value) return imageUrl.value
  if (me.value.avatar) return baseURL + '/' + me.value.avatar
  return false
})

onMounted(async () => {
  try {
    const res = await getOne('users', 'me')
    me.value = res
    me.value.birthday = me.value.birthday.split('T')[0]
  } catch (error) {
    console.error(error)
  }
})
</script>
