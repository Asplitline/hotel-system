import { _get, _delete, _put, _post } from './helper'

const TRADITION_MODEL = 2
// ques [login / register / changePwd]
const base = {
    changePwd: _get('/login/changePassword')
}

// ques [fileURL?]
// todo [search]
// done [delete / add / edit / page]
const user = {
    getUserList: _get('/user/page'),
    addUser: _post('/user/insert'),
    editUser: _put('/user/updateIgnoreNull'),
    deleteUser: _delete('/user/delete', TRADITION_MODEL)
}
// todo [search]
// done [delete / add / edit / page]
const category = {
    getCategoryList: _get('/roomlx/page'),
    addCategory: _post('/roomlx/insert'),
    editCategory: _put('/roomlx/updateIgnoreNull'),
    deleteCategory: _delete('/roomlx/delete', TRADITION_MODEL)
}

// todo [search]
// done [delete / add / edit / page]
const room = {
    getRoomList: _get('/room/page'),
    addRoom: _post('/room/insert'),
    editRoom: _put('/room/updateIgnoreNull'),
    deleteRoom: _delete('/room/delete', TRADITION_MODEL)
}
// todo [search]
// done [delete / add / edit /page]
const notice = {
    getNoticeList: _get('/notice/page'),
    addNotice: _post('/notice/insert'),
    editNotice: _put('/notice/updateIgnoreNull'),
    deleteNotice: _delete('/notice/delete', TRADITION_MODEL)
}
export default {
    ...base,
    ...user,
    ...category,
    ...room,
    ...notice
}
