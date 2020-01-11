import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/tab-bar')
  }
]

const router = new VueRouter({
  routes
})

export default router
