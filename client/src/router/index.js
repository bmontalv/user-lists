import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserDetail.vue')
  },
  {
    path: '/favouriteUsers',
    name: 'favouriteUsers',
    component: () => import('../views/FavouriteUsers.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
