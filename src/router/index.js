import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@store'
// -
const Admin = () => import(/* webpackChunkName:'admin' */ '@views/admin')
const Home = () => import(/* webpackChunkName:'home' */ '@views/Home')
const Login = () => import(/* webpackChunkName:'login' */ '@views/Login')

// --
const Error = () => import('@views/404')
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@views/home/index/Index'),
        meta: {
          title: '首页',
          index: '/index'
        }
      },
      {
        path: '/shop',
        name: 'Shop',
        component: () => import('@views/home/shop'),
        meta: {
          title: '商城',
          index: '/shop'
        }
      },
      {
        path: '/movie',
        name: 'Movie',
        component: () => import('@views/home/movie'),
        meta: {
          title: '院线',
          index: '/movie'
        }
      },
      {
        path: '/shop/:id',
        name: 'ShopDetail',
        component: () => import('@views/home/shop/ShopDetail'),
        props: true
      },
      {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: () => import('@views/home/movie/MovieDetail'),
        props: true
      },
      // {
      //   path: '/donate',
      //   name: 'Donate',
      //   component: () => import('@views/home/donate'),
      //   meta: {
      //     title: '捐赠中心',
      //     index: '/donate'
      //   }
      // },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@views/home/cart'),
        meta: {
          title: '我的购物车',
          index: '/cart',
          showNum: true
        }
      },

      {
        path: '/info',
        name: 'Info',
        component: () => import('@views/home/info')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/admin/carousel',
    isAuth: true,
    meta: {
      title: '首页',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      // {
      //   path: 'dashboard',
      //   name: 'Dashboard',
      //   component: () => import('@views/admin/dashboard'),
      //   meta: {
      //     title: '仪表盘',
      //     icon: 'iconfont icon-ConferenceRoom',
      //     index: '/admin/dashboard'
      //   }
      // },
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@views/admin/carousel'),
        meta: {
          title: '首页轮播图',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin/carousel'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@views/admin/category'),
        meta: {
          title: '分类管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin/category'
        }
      }
    ]
  },
  {
    path: '/staff',
    name: 'Staff',
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
        name: 'Auser',
        component: () => import('@views/admin/user'),
        meta: {
          title: '用户管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/staff/auser'
        }
      }
    ]
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Admin,
    redirect: '/goods/category',
    isAuth: true,
    meta: {
      title: '商品管理',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      {
        path: 'item',
        name: 'Item',
        component: () => import('@views/admin/item'),
        meta: {
          title: '商品管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/goods/item'
        }
      },
      {
        path: '/goods/order',
        name: 'Order',
        component: () => import('@views/admin/order'),
        meta: {
          title: '订单管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/goods/order'
        }
      }
    ]
  },
  {
    path: '/admin-movie',
    name: 'admin-movie',
    component: Admin,
    redirect: '/admin-movie/index',
    isAuth: true,
    meta: {
      title: '电影管理',
      icon: 'iconfont icon-ConferenceRoom'
    },
    children: [
      {
        path: '/admin-movie/index',
        name: 'admin-movie-index',
        component: () => import('@views/admin/movie/index'),
        meta: {
          title: '影片信息',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin-movie/index'
        }
      },
      {
        path: '/admin-movie/order',
        name: 'admin-movie-order',
        component: () => import('@views/admin/movie/order'),
        meta: {
          title: '订单管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin-movie/order'
        }
      },
      {
        path: '/admin-movie/ticket',
        name: 'admin-movie-ticket',
        component: () => import('@views/admin/movie/ticket'),
        meta: {
          title: '退票管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin-movie/ticket'
        }
      },
      {
        path: '/admin-movie/comment',
        name: 'admin-movie-comment',
        component: () => import('@views/admin/movie/comment'),
        meta: {
          title: '影评管理',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin-movie/comment'
        }
      },
      {
        path: '/admin-movie/reply',
        name: 'admin-movie-reply',
        component: () => import('@views/admin/movie/reply'),
        meta: {
          title: '影评回复',
          icon: 'iconfont icon-ConferenceRoom',
          index: '/admin-movie/reply'
        }
      }
    ]
  },
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '*', name: 'Error', component: Error }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const path = to.path.split('/')[1]
  const user = store.state.currentUser
  console.log(user)
  if (path !== 'login') {
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    if (user) {
      const level = Number(user.level)
      if (level === 0) {
        next({ name: 'Home' })
      } else if (level === 1 || level === 2) {
        next({ name: 'Admin' })
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
})

export default router
