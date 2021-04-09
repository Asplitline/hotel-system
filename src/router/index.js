import Vue from 'vue'
import VueRouter from 'vue-router'
import { miniAMenuList } from '@static'
import store from '@store'
// -
const Admin = () => import(/* webpackChunkName:'admin' */'@views/Admin')
const Home = () => import(/* webpackChunkName:'home' */'@views/Home')
const Login = () => import(/* webpackChunkName:'login' */'@views/Login')

// --
const Room = () => import(/* webpackChunkName:'admin_room' */'@views/admin/room/Room')
const Order = () => import(/* webpackChunkName:'admin_order' */'@views/admin/order/Order')
const Comment = () => import(/* webpackChunkName:'admin_comment' */'@views/admin/comment/Comment')
const Notice = () => import(/* webpackChunkName:'admin_notice' */'@views/admin/notice/Notice')
const User = () => import(/* webpackChunkName:'admin_user' */'@views/admin/user/User')
const Category = () => import(/* webpackChunkName:'admin_category' */'@views/admin/category/Category')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: '/user',
    children: [
      { path: '/room', name: 'room', component: Room },
      { path: '/order', name: 'order', component: Order },
      { path: '/comment', name: 'comment', component: Comment },
      { path: '/notice', name: 'notice', component: Notice },
      { path: '/user', name: 'user', component: User },
      { path: '/category', name: 'category', component: Category }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const path = to.path.split('/')[1]
  if (miniAMenuList.includes(path)) {
    store.commit('setAIndex', path)
  }
  next()
})

export default router
