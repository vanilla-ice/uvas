import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: () => '/main-desk',
  },
  {
    path: '/main-desk',
    name: 'MainDesk',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/MainDesk'),
  },
  {
    path: '/transactions-list',
    name: 'TransactionsList',
    component: () => import('@/views/TransactionsList'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
