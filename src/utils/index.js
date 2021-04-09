/**
 * 补0
 */
export function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}

export function getSession (name) {
    return sessionStorage.getItem(name) && JSON.parse(sessionStorage.getItem(name))
}

export function setSession (name, data) {
    return sessionStorage.setItem(name, JSON.stringify(data))
}
