import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import BookDetail from '@/views/BookDetail.vue'
import Profile from '@/views/Profile.vue'
import BorrowHistory from '@/views/BorrowHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'store'
      }
    },
    {
      path: '/books/:id',
      name: 'Mô tả sách',

      component: BookDetail,
      meta: {
        layout: 'store'
      }
    },
    {
      path: '/profile',
      name: 'Trang cá nhân',
      component: Profile,
      meta: {
        layout: 'store'
      }
    },
    {
      path: '/borrow-history',
      name: 'Lịch sử mượn sách',
      component: BorrowHistory,
      meta: {
        layout: 'store'
      }
    },
    {
      path: '/sign-in',
      name: 'Đăng nhập',
      component: SignInView
    }
  ]
})

export default router
