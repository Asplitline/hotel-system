import Vue from 'vue'
import VueRouter from 'vue-router'

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
const Occupy = () => import(/* webpackChunkName:'admin_occupy' */'@views/admin/occupy/Occupy')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/room', name: 'room', component: Room },
      { path: '/order', name: 'order', component: Order },
      { path: '/comment', name: 'comment', component: Comment },
      { path: '/notice', name: 'notice', component: Notice },
      { path: '/user', name: 'user', component: User },
      { path: '/occupy', name: 'occupy', component: Occupy }
    ]
  },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
