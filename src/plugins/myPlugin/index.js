import { pad0 } from '@utils'
import { Icon } from '@v2icons/utils'
const myPlugin = {}

myPlugin.install = function (Vue) {
  Vue.component('Icon', Icon)
  Vue.directive('focus', {
    inserted(el) {
      el.querySelector('input').focus()
    }
  })

  Vue.filter('formatDate', (date, model = 0) => {
    date = new Date(date)
    const year = date.getFullYear()
    const month = pad0(date.getMonth() + 1)
    const day = pad0(date.getDate())
    const hour = pad0(date.getHours())
    const minute = pad0(date.getMinutes())
    const second = pad0(date.getSeconds())
    if (model === 0) {
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    } else if (model === 1) {
      return `${year}-${month}-${day}`
    } else if (model === 2) {
      return `${hour}:${minute}`
    }
  })

  Vue.filter('formatTime', (date) => {
    const hour = pad0(Math.floor(date / 60))
    const minute = pad0(Math.floor(date % 60))
    return `${hour}:${minute}`
  })
  Vue.filter('string', (data) => {
    return String(data)
  })
  Vue.filter('$', (data) => {
    return data && '￥' + Number(data).toFixed(2)
  })
  Vue.filter('floor', (data) => {
    return data.toString().substr(0, 1) + '楼'
  })
}

export default myPlugin
