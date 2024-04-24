import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import BookDetail from '@/views/BookDetail.vue'
import Profile from '@/views/Profile.vue'
import BorrowHistory from '@/views/BorrowHistory.vue'
import NotFound from '@/views/NotFound.vue'
import Store from '@/views/Store.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'
import SignUp from '@/views/SignUp.vue'
import BookSearch from '@/views/BookSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
    {
      path: '/sign-in',
      name: 'Đăng nhập',
      component: SignInView
    },
    {
      path: '/sign-up',
      name: 'Đăng kí',
      component: SignUp
    },
    {
      path: '/',
      name: 'home',
      component: Store,
      meta: {
        layout: 'store'
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            layout: 'store'
          }
        },
        {
          path: '/search',
          name: 'Tìm kiếm',
          component: BookSearch
        },
        {
          path: '/books/:id',
          name: 'Mô tả sách',

          component: BookDetail
        },
        {
          path: '/profile',
          name: 'Trang cá nhân',
          component: Profile
        },
        {
          path: '/borrow-history',
          name: 'Lịch sử mượn sách',
          component: BorrowHistory
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/sign-in', '/sign-up']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  const toast = useToast()

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/sign-in'
  }

  if ((to.path === '/sign-in' || to.path === '/sign-up') && auth.user) {
    return '/'
  }
})

export default router
