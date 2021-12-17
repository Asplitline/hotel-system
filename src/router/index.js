import Vue from 'vue'
import VueRouter from 'vue-router'
import { miniAMenuList, miniHMenuList } from '@static'
import store from '@store'
// -
const Admin = () => import(/* webpackChunkName:'admin' */'@views/admin')
const Home = () => import(/* webpackChunkName:'home' */'@views/Home')
const Login = () => import(/* webpackChunkName:'login' */'@views/Login')

// --
const Error = () => import('@views/404')
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@views/home/index/Index'),
        meta: {
          title: '首页',
          index: '/index'
        }
      },
      {
        path: '/medical',
        name: 'medical',
        component: () => import('@views/home/medical/Medical'),
        meta: {
          title: '体检',
          index: '/medical'
        }
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@views/home/info/Info'),
        meta: {
          title: '个人',
          index: '/info'
        }
      },
      {
        path: '/medical/:id',
        name: 'medical-detail',
        component: () => import('@views/home/medical/MedicalDetail'),
        props: true
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: '/admin/dashboard',
    isAuth: true,
    meta: {
      title: '首页',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@views/admin/dashboard'),
        meta: {
          title: '仪表盘',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin/dashboard'
        }
      },
      {
        path: 'carousel',
        name: 'carousel',
        component: () => import('@views/admin/carousel'),
        meta: {
          title: '首页轮播图',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin/carousel'
        }
      }
    ]
  },
  {
    path: '/staff',
    name: 'staff',
    component: Admin,
    redirect: '/user/aUser',
    isAuth: true,
    meta: {
      title: '人员管理',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      {
        path: 'auser',
        name: 'auser',
        component: () => import('@views/admin/user'),
        meta: {
          title: '用户管理',
          icon: 'iconfont icon-user',
          index: '/staff/auser'
        }
      }
    ]
  },
  {
    path: '/physical',
    name: 'physical',
    component: Admin,
    redirect: '/physical/category',
    isAuth: true,
    meta: {
      title: '体检管理',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@views/admin/category'),
        meta: {
          title: '体检类型',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/physical/category'
        }
      },
      {
        path: 'item',
        name: 'item',
        component: () => import('@views/admin/item'),
        meta: {
          title: '体检信息',
          icon: 'iconfont icon-order',
          index: '/physical/item'
        }
      },
      {
        path: '/physical/appointment',
        name: 'appointment',
        component: () => import('@views/admin/appointment'),
        meta: {
          title: '体检记录',
          icon: 'iconfont icon-order',
          index: '/physical/appointment'
        }
      },
      {
        path: 'reply',
        name: 'reply',
        component: () => import('@views/admin/reply'),
        meta: {
          title: '体检反馈',
          icon: 'iconfont icon-order',
          index: '/physical/reply'
        }
      }
    ]
  },
  {
    path: '/content',
    name: 'content',
    component: Admin,
    redirect: '/content/room',
    isAuth: true,
    meta: {
      title: '内容管理',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      {
        path: 'room',
        name: 'room',
        component: () => import('@views/admin/room'),
        meta: {
          title: '科室信息',
          icon: 'iconfont icon-LuggageBagsCases',
          index: '/content/room'
        }
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@views/admin/comment'),
        meta: {
          title: '医嘱信息',
          icon: 'iconfont icon-user',
          index: '/content/comment'
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
