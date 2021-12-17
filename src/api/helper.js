import axios from 'axios'

import { SERVER_URL } from '@static'

const $http = axios.create({
    baseURL: SERVER_URL,
    timeout: 2000,
    withCredentials: false
})

export function _get (url, model = 1) {
    return function (params) {
        let URL
        if (model === 1) {
            URL = url
        } else if (model === 2) {
            URL = `${url}?id=${params}`
        }

        return $http.get(URL, { params })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

export function _post (url, model = 1) {
    return function (params) {
        if (model === 1) {
            return $http.post(url, params)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        } else if (model === 2) {
            return $http.post(`${url}?${params}`)
                .then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}

export function _delete (url, model = 1) {
    return function (params) {
        let URL
        if (model === 1) {
            URL = `${url}/${params}`
        } else if (model === 2) {
            URL = `${url}?id=${params}`
        }
        return $http.delete(URL)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

export function _put (url, model = 1) {
    return function (params) {
        return $http.put(url, params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}
