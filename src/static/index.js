export const SERVER_URL = 'http://localhost:8089'
export const FILE_PREFIX = 'file:///'
export const REG_EMAIL = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
export const REG_PHONE = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/
export const ADD = 0
export const EDIT = 1
export const DEFAULT_PWD = 123456
export const LOGIN = 0
export const REGISTER = 1
export const aMenuList = [
    { name: '用户管理', index: 'user', icon: 'iconfont icon-user' },
    { name: '房型管理', index: 'category', icon: 'iconfont icon-ConferenceRoom' },
    { name: '客房管理', index: 'room', icon: 'iconfont icon-LuggageBagsCases' },
    { name: '订单管理', index: 'order', icon: 'iconfont icon-order' },
    { name: '评论管理', index: 'comment', icon: 'iconfont icon-comment' },
    { name: '公告管理', index: 'notice', icon: 'iconfont icon-notice' }
]

export const hMenuList = [
    { name: '首页', index: 'index', icon: 'iconfont icon-user' },
    { name: '酒店', index: 'hotel', icon: 'iconfont icon-ConferenceRoom' },
    { name: '个人', index: 'info', icon: 'iconfont icon-ConferenceRoom' }
]
export const miniAMenuList = ['user', 'category', 'room', 'order', 'comment', 'notice']
export const miniHMenuList = ['index', 'hotel', 'info']

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

export const roomInfo = [
    { flag: 0, value: '空闲中', type: 'danger' },
    { flag: 1, value: '预定中', type: 'primary' },
    { flag: 2, value: '已入住', type: 'info' }
]

export const roomType = [
    { flag: 0, value: '单人间' },
    { flag: 1, value: '两人间' },
    { flag: 2, value: '四人间' },
    { flag: 3, value: '钟点房' }
]
export const priceList = [
    { id: 0, min: 0, max: 100, name: '100元以下' },
    { id: 1, min: 100, max: 200, name: '100-200元' },
    { id: 2, min: 200, max: 300, name: '200-300元' },
    { id: 3, min: 300, max: 9999, name: '300元以上' }
]
export const floorList = [
    { id: 0, name: '1楼' },
    { id: 1, name: '2楼' },
    { id: 2, name: '3楼' },
    { id: 3, name: '4楼' },
    { id: 4, name: '5楼' }
    // { id: 5, name: '6楼' },
    // { id: 6, name: '7楼' },
    // { id: 7, name: '8楼' },
    // { id: 8, name: '9楼' },
    // { id: 9, name: '10楼' }
]
export const orderInfo = [
    { flag: 0, value: '预定中', type: 'info' },
    { flag: 1, value: '入住中', type: 'primary' },
    { flag: 2, value: '已驳回', type: 'danger' },
    { flag: 3, value: '已退房', type: 'success' }
]

export const cChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
export const loadBtn = [
    { id: 0, icon: 'el-icon-position' },
    { id: 1, icon: 'el-icon-loading' }
]
