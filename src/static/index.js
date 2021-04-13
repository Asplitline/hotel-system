export const SERVER_URL = 'http://localhost:8089'
export const FILE_PREFIX = 'file://'
export const REG_EMAIL = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
export const REG_PHONE = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/
export const ADD = 0
export const EDIT = 1
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
    { name: '酒店', index: 'hotel', icon: 'iconfont icon-ConferenceRoom' }
]
export const miniAMenuList = ['user', 'category', 'room', 'order', 'comment', 'notice']

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
    { flag: 0, min: 0, max: 100, value: '100元以下' },
    { flag: 1, min: 100, max: 200, value: '100-200元' },
    { flag: 2, min: 200, max: 300, value: '200-300元' },
    { flag: 3, min: 300, max: 9999, value: '300元以上' }
]
export const floorList = [
    { flag: 0, value: '1楼' },
    { flag: 1, value: '2楼' },
    { flag: 2, value: '3楼' },
    { flag: 3, value: '4楼' },
    { flag: 4, value: '5楼' },
    { flag: 5, value: '6楼' },
    { flag: 6, value: '7楼' },
    { flag: 7, value: '8楼' },
    { flag: 8, value: '9楼' },
    { flag: 9, value: '10楼' }
]
export const orderInfo = [
    { flag: 0, value: '预定中', type: 'info' },
    { flag: 1, value: '入住中', type: 'primary' },
    { flag: 2, value: '已驳回', type: 'danger' },
    { flag: 3, value: '已退房', type: 'success' }
]

export const cChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
