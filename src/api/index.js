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
// fixme pagelist skip
const user = {
    getAllUser: _get('/apiUser/list'),
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
    getItems: _get('/apiPhysicalProject/list'),
    getRoomList: _get('/apiDepartment/pageList'),
    addRoom: _post('/apiDepartment/insert'),
    editRoom: _put('/apiDepartment/update'),
    deleteRoom: _delete('/apiDepartment/delete', TRADITION_MODEL)
}

const item = {
    getItemList: _get('/apiPhysicalProject/pageList'),
    addItem: _post('/apiPhysicalProject/insert'),
    editItem: _put('/apiPhysicalProject/update'),
    deleteItem: _delete('/apiPhysicalProject/delete', TRADITION_MODEL)
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
    getOrders: _get('/apiOrder/list'),
    getOrderList: _get('/apiOrder/pageList'),
    addOrder: _post('/apiOrder/insert'),
    editOrder: _put('/apiOrder/updateIgnoreNull'),
    deleteOrder: _delete('/apiOrder/delete', TRADITION_MODEL)
}

const rotation = {
    getRotations: _get('/apiRotation/list'),
    getRotationList: _get('/apiRotation/pageList'),
    addRotation: _post('apiRotation/insert'),
    editRotation: _put('/apiRotation/update'),
    deleteRotation: _delete('/apiRotation/delete', TRADITION_MODEL)
}

const statistic = {
    getStatisticInfo: _get('/statistics')
}

export default {
    ...base,
    ...user,
    ...category,
    ...room,
    ...notice,
    ...comment,
    ...order,
    ...item,
    ...rotation,
    ...statistic
}
