export const SERVER_URL = process.env.VUE_APP_ENV === 'development' ? '/api' : 'http://localhost:8088'
// export const FILE_PREFIX = 'http://localhost:8088/images/'
export const FILE_PREFIX = 'http://127.0.0.1:8082/file/'
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

export const hMenuList = [
    { name: '首页', index: 'index', icon: 'iconfont icon-user' },
    { name: '酒店', index: 'hotel', icon: 'iconfont icon-ConferenceRoom' },
    { name: '个人', index: 'info', icon: 'iconfont icon-ConferenceRoom' }
]
export const miniAMenuList = ['user', 'category', 'room', 'order', 'comment', 'notice']
export const miniHMenuList = ['index', 'hotel', 'info']

export const levelInfo = [
    { flag: 0, value: '用户', type: 'success' },
    { flag: 1, value: '管理员', type: 'danger' },
    { flag: 2, value: '医生', type: 'primary' }
]
export const sexInfo = [
    { flag: 0, value: '男' },
    { flag: 1, value: '女' }
]
export const stateInfo = [
    { flag: 0, value: '禁用', type: 'info' },
    { flag: 1, value: '正常', type: 'primary' }
]

export const roomState = [
    { id: 0, value: '空闲中', type: 'success', text: '马上预定', class: '' },
    { id: 1, value: '已住人', type: 'danger', text: '无法预定', class: 'disable' }
]
export const orderState = [
    { id: 0, value: '马上预订', type: '' },
    { id: 1, value: '预订中', type: 'primary' },
    { id: 2, value: '已取消', type: 'warning' },
    // { id: 3, value: '预订失败', type: 'danger' },
    { id: 3, value: '入住中', type: 'success' },
    { id: 4, value: '退房中', type: 'info' },
    { id: 5, value: '已退房', type: 'danger' }
]
export const priceList = [
    { id: 0, min: 0, max: 1000, name: '1000元以下' },
    { id: 1, min: 1000, max: 5000, name: '1000-5000元' },
    { id: 2, min: 5000, max: 10000, name: '5000-10000元' },
    { id: 3, min: 10000, max: 99999, name: '10000元以上' }
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
    { id: 0, value: '已退房', type: 'info' },
    { id: 1, value: '预订中', type: 'primary' },
    { id: 2, value: '已驳回', type: 'danger' },
    { id: 3, value: '入住中', type: 'success' }
]

export const cChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
export const loadBtn = [
    { id: 0, icon: 'el-icon-position' },
    { id: 1, icon: 'el-icon-loading' }
]

export const roomId = () => {
    return Array.from({ length: 11 })
}