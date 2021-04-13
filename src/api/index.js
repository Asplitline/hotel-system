import { _get, _delete, _put, _post } from './helper'

const TRADITION_MODEL = 2
// base
// const changerPwd = _

// ques [getUser | changePassword | page | fileURL?]
// done [delete | add | edit]
const user = {
    getUserList: _get('/user/page'),
    addUser: _post('/user/insert'),
    editUser: _put('/user/updateIgnoreNull'),
    deleteUser: _delete('/user/delete', TRADITION_MODEL)
}

// ques [getCategory | page]
// done [delete | add | edit]
const category = {
    getCategoryList: _get('/roomlx/page'),
    addCategory: _post('/roomlx/insert'),
    editCategory: _put('/roomlx/updateIgnoreNull'),
    deleteCategory: _delete('/roomlx/delete', TRADITION_MODEL)
}

export default {
    ...user,
    ...category
}
