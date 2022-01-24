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
    getUserList: _get('/user/page'),
    addUser: _post('/user/insert'),
    editUser: _put('/user/updateIgnoreNull'),
    deleteUser: _delete('/user/delete', TRADITION_MODEL),
    getUserByUsername: _get('/login/getUserByUsername')
}
//
const category = {
    getCategoryList: _get('/apiGoodsLx/pageList'),
    getCategoryById: _get('/apiGoodsLx/getById', TRADITION_MODEL),
    addCategory: _post('/apiGoodsLx/insert'),
    editCategory: _put('/apiGoodsLx/update'),
    deleteCategory: _delete('/apiGoodsLx/delete', TRADITION_MODEL)
}

// todo [search]
// done [delete / add / edit / page]
const room = {
    getRoomList: _get('/apiDepartment/pageList'),
    getRoomById: _get('/apiDepartment/getById', TRADITION_MODEL),
    addRoom: _post('/apiDepartment/insert'),
    editRoom: _put('/apiDepartment/update'),
    deleteRoom: _delete('/apiDepartment/delete', TRADITION_MODEL)
}

const item = {
    getItemList: _get('/apiGoods/pageList'),
    getItemById: _get('/apiGoods/getById', TRADITION_MODEL),
    addItem: _post('/apiGoods/insert'),
    editItem: _put('/apiGoods/update'),
    deleteItem: _delete('/apiGoods/delete', TRADITION_MODEL)
}
// todo [search]
// done [delete / add / edit /page]
const notice = {
    getNotices: _get('/apiNotice/list'),
    getNoticeList: _get('/apiNotice/page'),
    addNotice: _post('/apiNotice/insert'),
    editNotice: _put('/apiNotice/update'),
    deleteNotice: _delete('/apiNotice/delete', TRADITION_MODEL)
}
//
const comment = {
    getComments: _get('/apiNotice/list'),
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

const Appointment = {
    getAppointments: _get('/apiAppointment/list'),
    getAppointmentList: _get('/apiAppointment/pageList'),
    addAppointment: _post('/apiAppointment/insert'),
    editAppointment: _put('/apiAppointment/update'),
    deleteAppointment: _delete('/apiAppointment/delete', TRADITION_MODEL)
}

const rotation = {
    getRotations: _get('/apiRotation/list'),
    getRotationList: _get('/apiRotation/pageList'),
    addRotation: _post('apiRotation/insert'),
    editRotation: _put('/apiRotation/update'),
    deleteRotation: _delete('/apiRotation/delete', TRADITION_MODEL)
}
const addvice = {
    getAddvices: _get('/apiAddvice/list'),
    getAddviceList: _get('/apiAddvice/pageList'),
    addAddvice: _post('apiAddvice/insert'),
    editAddvice: _put('/apiAddvice/update'),
    deleteAddvice: _delete('/apiAddvice/delete', TRADITION_MODEL)
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
    ...statistic,
    ...Appointment,
    ...addvice
}
