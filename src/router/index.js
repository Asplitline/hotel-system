import Vue from 'vue'
import VueRouter from 'vue-router'
import { miniAMenuList, miniHMenuList } from '@static'
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

// --
const Info = () => import(/* webpackChunkName:'home_info' */'@views/home/info/Info')
const Hotel = () => import(/* webpackChunkName:'home_hotel' */'@views/home/hotel/Hotel')
const HotelDetail = () => import(/* webpackChunkName:'home_hotel' */'@views/home/hotel/HotelDetail')
const Index = () => import(/* webpackChunkName:'home_index' */'@views/home/index/Index')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      { path: '/hotel', name: 'hotel', component: Hotel },
      { path: '/hotel/:id', name: 'hotel-detail', component: HotelDetail, props: true },
      { path: '/info', name: 'info', component: Info },
      { path: '/index', name: 'index', component: Index }
    ]
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
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const path = to.path.split('/')[1]
  if (miniAMenuList.includes(path)) {
    store.commit('setAIndex', path)
  } else if (miniHMenuList.includes(path)) {
    store.commit('setHIndex', path)
  }
  next()
})

export default router
