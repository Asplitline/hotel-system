export const SERVER_URL = process.env.VUE_APP_ENV === 'development' ? '/api' : 'http://localhost:8088'
// export const FILE_PREFIX = 'http://localhost:8088/images/'
export const FILE_PREFIX = 'http://127.0.0.1:8089/'
export const REG_EMAIL = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
export const REG_PHONE = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/
export const ADD = 0
export const EDIT = 1
export const DEFAULT_PWD = 123456
export const LOGIN = 0
export const REGISTER = 1
export const REJECT = 2
export const ACCEPT = 3
export const APPLY = 4
export const FINISH = 5
export const DEFAULT_AVATAR = 'avatar_placeholder.png'
export const aMenuList = [
  { name: '用户管理', index: 'user', icon: 'iconfont icon-user' },
  { name: '房型管理', index: 'category', icon: 'iconfont icon-ConferenceRoom' },
  { name: '客房管理', index: 'room', icon: 'iconfont icon-LuggageBagsCases' },
  { name: '订单管理', index: 'order', icon: 'iconfont icon-order' },
  { name: '评论管理', index: 'comment', icon: 'iconfont icon-comment' },
  { name: '公告管理', index: 'notice', icon: 'iconfont icon-notice' }
]
export const levelInfo = [
  { flag: 0, value: '用户', type: 'success' },
  { flag: 1, value: '管理员', type: 'danger' }
]
export const sexInfo = [
  { flag: 0, value: '男' },
  { flag: 1, value: '女' }
]
export const stateInfo = [
  { flag: 0, value: '禁用', type: 'info' },
  { flag: 1, value: '正常', type: 'primary' }
]

export const replyState = [
  { flag: 0, value: '未回复', type: 'info' },
  { flag: 1, value: '已回复', type: 'primary' }
]

export const goodsState = [
  { value: 0, label: '待上架', type: 'info' },
  { value: 1, label: '已上架', type: 'success' },
  { value: 2, label: '已授权', type: 'danger' }
]

export const donateState = [
  { value: 0, label: '审核中', type: 'info' },
  { value: 1, label: '捐赠成功', type: 'success' },
  { value: 2, label: '捐赠失败', type: 'danger' }
]

export const orderState = [
  { value: 0, label: '出库中', type: '' },
  { value: 1, label: '派送中', type: 'warning' },
  { value: 2, label: '已送达', type: 'danger' },
  { value: 3, label: '已收货', type: 'success' }
]
export const priceList = [
  { id: 0, min: 0, max: 1000, name: '1000元以下' },
  { id: 1, min: 1000, max: 5000, name: '1000-5000元' },
  { id: 2, min: 5000, max: 10000, name: '5000-10000元' },
  { id: 3, min: 10000, max: 99999, name: '10000元以上' }
]

export const loadBtn = [
  { id: 0, icon: 'el-icon-position' },
  { id: 1, icon: 'el-icon-loading' }
]

export const source = [
  { id: 0, text: '个人' },
  { id: 1, text: '集体' }
]
export const roomId = () => {
  return Array.from({ length: 11 })
}
