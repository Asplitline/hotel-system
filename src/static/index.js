export const SERVER_URL = process.env.VUE_APP_ENV === 'development' ? '/api' : 'http://127.0.0.1:8088'
// export const FILE_PREFIX = 'http://localhost:8088/images/'
export const FILE_PREFIX = 'http://127.0.0.1:8088/'
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

export const ticketState = [
  { flag: 0, value: '未退票', type: 'info' },
  { flag: 1, value: '已退票', type: 'danger' }
]

export const replyState = [
  { flag: 0, value: '未回复', type: 'info' },
  { flag: 1, value: '已回复', type: 'primary' }
]

export const checkState = [
  { flag: 0, value: '等待审核', type: 'primary' },
  { flag: 1, value: '已通过', type: 'success' },
  { flag: 2, value: '已拒绝', type: 'danger' }
]

export const goodsState = [
  { value: 0, label: '待上架', type: 'info' },
  { value: 1, label: '已上架', type: 'success' },
  { value: 2, label: '已授权', type: 'danger' }
]

export const movieState = [
  { value: 0, label: '未上映', type: 'info' },
  { value: 1, label: '热映', type: 'success' },
  { value: 2, label: '已下线', type: 'danger' }
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
const fillArray = (length, total = 0) => {
  let leftArr = []
  let rightArr = []
  if (total) {
    const n = (total - length) / 2
    leftArr = Array.from({ length: n }).fill('-')
    rightArr = Array.from({ length: n }).fill('-')
  }
  return [...leftArr, ...Array.from({ length }).fill('*'), ...rightArr].join('')
}
export const generateSeat = (num) => {
  if (num === 30) {
    return [6, 8, 8, 8].map((i) => fillArray(i, 8))
  } else if (num === 42) {
    return [8, 10, 10, 10, 4].map((i) => fillArray(i, 10))
  } else if (num === 48) {
    return [8, 10, 10, 10, 12].map((i) => fillArray(i, 12))
  } else if (num === 60) {
    return [8, 8, 12, 12, 12, 8].map((i) => fillArray(i, 12))
  }
}
export const roomList = [
  { value: 30, label: '普通厅', price: 48 },
  { value: 42, label: '3D厅', price: 58 },
  { value: 50, label: '激光巨幕厅', price: 68 },
  { value: 60, label: 'IMAX厅', price: 88 }
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

export const locationList = [
  {
    id: 1,
    name: '华语'
  },
  {
    id: 2,
    name: '欧美'
  },
  {
    id: 3,
    name: '韩国'
  },
  {
    id: 4,
    name: '日本'
  },
  {
    id: 5,
    name: '中国大陆'
  },
  {
    id: 6,
    name: '美国'
  },
  {
    id: 7,
    name: '中国香港'
  },
  {
    id: 8,
    name: '中国台湾'
  },
  {
    id: 9,
    name: '英国'
  },
  {
    id: 10,
    name: '法国'
  },
  {
    id: 11,
    name: '德国'
  },
  {
    id: 12,
    name: '意大利'
  },
  {
    id: 13,
    name: '西班牙'
  },
  {
    id: 14,
    name: '印度'
  },
  {
    id: 15,
    name: '泰国'
  },
  {
    id: 16,
    name: '俄罗斯'
  },
  {
    id: 17,
    name: '加拿大'
  },
  {
    id: 18,
    name: '澳大利亚'
  },
  {
    id: 19,
    name: '爱尔兰'
  },
  {
    id: 20,
    name: '瑞典'
  },
  {
    id: 21,
    name: '巴西'
  },
  {
    id: 22,
    name: '丹麦'
  }
]

export const languageList = [
  {
    id: 0,
    name: '汉语'
  },
  {
    id: 1,
    name: '英语'
  },
  {
    id: 2,
    name: '日语'
  },
  {
    id: 3,
    name: '韩语'
  },
  {
    id: 4,
    name: '法语'
  },
  {
    id: 5,
    name: '印地语'
  },
  {
    id: 6,
    name: '粤语'
  }
]
