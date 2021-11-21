import { _get, _delete, _put, _post } from './helper'

const TRADITION_MODEL = 2
// todo changePassword
const base = {
    changePwd: _get('/login/changePassword'),
    login: _post('/login/api/login', TRADITION_MODEL),
    register: _post('/login/api/regist'),
    checkCode: _get('/login/getCheckCode')
}

// todo addUser
const user = {
    getUserList: _get('/apiUser/pageList'),
    addUser: _post('/apiUser/insert'),
    editUser: _put('/apiUser/update'),
    deleteUser: _delete('/apiUser/delete', TRADITION_MODEL),
    getUserByUsername: _get('/login/getUserByUsername')
}
//
const category = {
    getCategoryList: _get('/apiPhysicalType/list'),
    addCategory: _post('/apiPhysicalType/insert'),
    editCategory: _put('/apiPhysicalType/update'),
    deleteCategory: _delete('/apiPhysicalType/delete', TRADITION_MODEL)
}

// todo [search]
// done [delete / add / edit / page]
const room = {
    getRoomList: _get('/apiDepartment/pageList'),
    addRoom: _post('/apiDepartment/insert'),
    editRoom: _put('/apiDepartment/update'),
    deleteRoom: _delete('/apiDepartment/delete', TRADITION_MODEL)
}
// todo [search]
// done [delete / add / edit /page]
const notice = {
    getNoticeList: _get('/notice/page'),
    addNotice: _post('/notice/insert'),
    editNotice: _put('/notice/updateIgnoreNull'),
    deleteNotice: _delete('/notice/delete', TRADITION_MODEL)
}
//
const comment = {
    getCommentList: _get('/apiNotice/pageList'),
    addComment: _post('/apiNotice/insert'),
    editComment: _put('/apiNotice/update'),
    deleteComment: _delete('/apiNotice/delete', TRADITION_MODEL)
}
//
const order = {
    getOrderList: _get('/order/page'),
    addOrder: _post('/order/insert'),
    editOrder: _put('/order/updateIgnoreNull'),
    deleteOrder: _delete('/order/delete', TRADITION_MODEL)
}

export default {
    ...base,
    ...user,
    ...category,
    ...room,
    ...notice,
    ...comment,
    ...order
}
