import Vue from 'vue'
import VueRouter from 'vue-router'
import { miniAMenuList, miniHMenuList } from '@static'
import store from '@store'
// -
const Admin = () => import(/* webpackChunkName:'admin' */'@views/Admin')
const Home = () => import(/* webpackChunkName:'home' */'@views/Home')
const Login = () => import(/* webpackChunkName:'login' */'@views/Login')

// --
const Info = () => import(/* webpackChunkName:'home_info' */'@views/home/info/Info')
const Hotel = () => import(/* webpackChunkName:'home_hotel' */'@views/home/hotel/Hotel')
const HotelDetail = () => import(/* webpackChunkName:'home_hotel' */'@views/home/hotel/HotelDetail')
const Index = () => import(/* webpackChunkName:'home_index' */'@views/home/index/Index')

const Error = () => import(/* webpackChunkName:'error' */'@views/404')
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
    isAuth: true,
    children: [
      {
        path: '/room',
        name: 'room',
        component: () => import('@views/admin/room'),
        meta: {
          title: '科室信息',
          icon: 'iconfont icon-LuggageBagsCases'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@views/admin/order'),
        meta: {
          title: '体检信息',
          icon: 'iconfont icon-order'
        }
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@views/admin/comment'),
        meta: {
          title: '医嘱信息',
          icon: 'iconfont icon-user'
        }
      },
      {
        path: '/notice',
        name: 'notice',
        component: () => import('@views/admin/notice'),
        meta: {
          title: '系统公告',
          icon: 'iconfont icon-notice'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@views/admin/user'),
        meta: {
          title: '用户管理',
          icon: 'iconfont icon-user'
        }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@views/admin/category'),
        meta: {
          title: '体检类型',
          icon: 'iconfont icon-ConferenceRoom'
        }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@views/admin/category'),
        meta: {
          title: '体检反馈',
          icon: 'iconfont icon-ConferenceRoom'
        }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@views/admin/category'),
        meta: {
          title: '首页轮播图',
          icon: 'iconfont icon-ConferenceRoom'
        }
      }
    ]
  },
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '*', name: 'error', component: Error }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  const path = to.path.split('/')[1]
  if (miniAMenuList.includes(path)) {
    store.commit('setAIndex', path)
  } else if (miniHMenuList.includes(path)) {
    store.commit('setHIndex', path)
  }
  // permission
  const user = store.state.currentUser
  if (path !== 'login') {
    if (user) {
      if (miniAMenuList.includes(path) && Number(user.level) === 0) {
        next(false)
      } else {
        next()
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    if (user) {
      next(false)
    } else {
      next()
    }
  }
})

export default router
