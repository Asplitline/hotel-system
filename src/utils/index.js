import { SERVER_URL, FILE_PREFIX, REG_EMAIL, REG_PHONE } from '@static'
/**
 * 补0
 */
export function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}

export function getSession (name) {
    const value = sessionStorage.getItem(name)
    return value != null && value !== 'undefined' && JSON.parse(value)
}

export function setSession (name, data) {
    return sessionStorage.setItem(name, JSON.stringify(data))
}

export function getUid () {
    return Date.now() % 99999999
}

export function bindURL (url) {
    return SERVER_URL + url
}
export function bindIMG (url) {
    // console.log(FILE_PREFIX, url)
    return FILE_PREFIX + url
}

export function convertURL (obj) {
    const arr = []
    for (const key in obj) {
        arr.push(`${key}=${obj[key]}`)
    }
    // console.log(arr)
    return arr.join('&')
}

export function deepClone (obj = {}) {
    // Array or Object ?
    /* note [obj === null]
     * obj == null
     * obj = undefined || null
     */
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    let result
    // init
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (const key in obj) {
        // self property ?
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // console.log(key)
            result[key] = deepClone(obj[key])
        }
    }
    return result
}

export function checkEmail (rule, value, callback) {
    if (REG_EMAIL.test(value)) {
        callback()
    } else {
        callback(new Error('电子邮箱不合法'))
    }
}
export function checkPhone (rule, value, callback) {
    if (REG_PHONE.test(value)) {
        callback()
    } else {
        callback(new Error('手机号码不合法'))
    }
}

export function notEmpty (val) {
    const types = {
        STRING: 'string',
        OBJECT: 'object',
        NULL: 'null',
        UNDEFINED: 'undefined',
        ARRAY: 'array'
    }
    const type = Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
    switch (type) {
        case types.STRING:
        case types.ARRAY:
            return !!val.length
        case types.NULL:
        case types.UNDEFINED:
            return !!val
        case types.OBJECT:
            return !!Object.keys(val).length
        default:
            console.log('type :>> ', type)
            console.log('val :>> ', val)
            return !!val
    }
}