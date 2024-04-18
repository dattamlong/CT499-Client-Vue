import { login } from '@/api/auth'
import { defineStore } from 'pinia'

import router from '@/router'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || null),
    returnUrl: null
  }),
  actions: {
    async login(payload) {
      const toast = useToast()

      try {
        const { user, token } = await login(payload)
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
        toast.success('Đăng nhập thành công!')
        router.push('/')
      } catch (error) {
        console.log(error)
        toast.error(`${error.response.data.message}`)
        return Promise.reject(error)
      }
    },
    logout() {
      const toast = useToast()
      this.user = null
      localStorage.removeItem('user')
      toast.success('Đăng xuất thành công!')
      router.push('/sign-in')
    }
  }
})
