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
    getCategoryById: _get('/apiPhysicalType/getById', TRADITION_MODEL),
    addCategory: _post('/apiPhysicalType/insert'),
    editCategory: _put('/apiPhysicalType/update'),
    deleteCategory: _delete('/apiPhysicalType/delete', TRADITION_MODEL)
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
    getItems: _get('/apiPhysicalProject/list'),
    getItemList: _get('/apiPhysicalProject/pageList'),
    getItemById: _get('/apiPhysicalProject/getById', TRADITION_MODEL),
    addItem: _post('/apiPhysicalProject/insert'),
    editItem: _put('/apiPhysicalProject/update'),
    deleteItem: _delete('/apiPhysicalProject/delete', TRADITION_MODEL)
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
