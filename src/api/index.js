import { _get, _delete, _put, _post } from './helper'

const TRADITION_MODEL = 2
const BATCH = 3
const base = {
  changePwd: _get('/login/changePassword'),
  login: _post('/login/api/login', TRADITION_MODEL),
  register: _post('/login/api/regist'),
  checkCode: _get('/login/getCheckCode')
}

const user = {
  getUserList: _get('/user/page'),
  addUser: _post('/user/insert'),
  editUser: _put('/user/updateIgnoreNull'),
  deleteUser: _delete('/user/delete', TRADITION_MODEL),
  getUserByUsername: _get('/login/getUserByUsername')
}
//
const category = {
  getCategories: _get('/apiGoodsLx/list'),
  getCategoryList: _get('/apiGoodsLx/pageList'),
  getCategoryById: _get('/apiGoodsLx/getById', TRADITION_MODEL),
  addCategory: _post('/apiGoodsLx/insert'),
  editCategory: _put('/apiGoodsLx/update'),
  deleteCategory: _delete('/apiGoodsLx/delete', TRADITION_MODEL)
}

const donate = {
  getDonate: _get('/apiDonate/list'),
  getDonateList: _get('/apiDonate/pageList'),
  getDonateById: _get('/apiDonate/getById', TRADITION_MODEL),
  addDonate: _post('/apiDonate/insert'),
  editDonate: _put('/apiDonate/update'),
  deleteDonate: _delete('/apiDonate/delete', TRADITION_MODEL)
}

const item = {
  getItem: _get('/apiGoods/list'),
  getItemList: _get('/apiGoods/pageList'),
  getItemById: _get('/apiGoods/getById', TRADITION_MODEL),
  addItem: _post('/apiGoods/insert'),
  editItem: _put('/apiGoods/update'),
  deleteItem: _delete('/apiGoods/delete', TRADITION_MODEL)
}
const notice = {
  // getNotices: _get('/apiNotice/list'),
  getNoticeList: _get('/apiNotice/page'),
  addNotice: _post('/apiNotice/insert'),
  editNotice: _put('/apiNotice/update'),
  deleteNotice: _delete('/apiNotice/delete', TRADITION_MODEL)
}
//
const comment = {
  getComments: _get('/apiMovieComments/list'),
  getCommentList: _get('/apiMovieComments/pageList'),
  getCommentByMovieId: _get('/apiMovieComments/pageByMovieId'),
  getCommentByUserId: _get('/apiMovieComments/pageByUserId'),
  addComment: _post('/apiMovieComments/insert'),
  editComment: _put('/apiMovieComments/update'),
  deleteComment: _delete('/apiMovieComments/delete', TRADITION_MODEL)
}

const reply = {
  getCommentRepliesList: _get('/apiMovieCommentReplies/pageList'),
  addCommentReplies: _post('/apiMovieCommentReplies/insert'),
  editCommentReplies: _put('/apiMovieCommentReplies/update'),
  deleteCommentReplies: _delete('/apiMovieCommentReplies/delete', TRADITION_MODEL)
}
//
const goodsOrder = {
  getGoodsOrder: _get('/apiGoodsOrder/list'),
  getGoodsOrderList: _get('/apiGoodsOrder/pageList'),
  addGoodsOrderList: _post('/apiGoodsOrder/batchInsert'),
  addGoodsOrder: _post('/apiGoodsOrder/insert'),
  editGoodsOrder: _put('/apiGoodsOrder/update'),
  deleteGoodsOrder: _delete('/apiGoodsOrder/delete', TRADITION_MODEL)
}

const shoppingCar = {
  getShoppingCar: _get('/apiShoppingCar/list'),
  getShoppingCarList: _get('/apiShoppingCar/pageList'),
  getShoppingCarById: _get('/apiShoppingCar/getById'),
  addShoppingCar: _post('/apiShoppingCar/insert'),
  editShoppingCar: _put('/apiShoppingCar/update'),
  deleteShoppingCarList: _delete('/apiShoppingCar/batchDelete', BATCH),
  deleteShoppingCar: _delete('/apiShoppingCar/delete', TRADITION_MODEL)
}

const shopFile = {
  getShopFile: _get('/apiShopFile/list'),
  getShopFileList: _get('/apiShopFile/pageList'),
  addShopFile: _post('apiShopFile/insert'),
  editShopFile: _put('/apiShopFile/update'),
  deleteShopFile: _delete('/apiShopFile/delete', TRADITION_MODEL)
}
const advice = {
  // getAddvices: _get('/apiAddvice/list'),
  getAddviceList: _get('/apiAddvice/pageList'),
  addAddvice: _post('apiAddvice/insert'),
  editAddvice: _put('/apiAddvice/update'),
  deleteAddvice: _delete('/apiAddvice/delete', TRADITION_MODEL)
}

const movie = {
  getMovie: _get('/apiMovies/list'),
  getMovieList: _get('/apiMovies/pageList'),
  addMovie: _post('/apiMovies/insert'),
  editMovie: _put('/apiMovies/update'),
  getMovieById: _get('/apiMovies/getById'),
  deleteMovie: _delete('/apiMovies/delete', TRADITION_MODEL)
}

const orderMovie = {
  getMovieOrders: _get('/apiMovieOrders/list'),
  getMovieOrdersList: _get('/apiMovieOrders/pageList'),
  addMovieOrders: _post('/apiMovieOrders/insert'),
  editMovieOrders: _put('/apiMovieOrders/update'),
  getMovieOrdersById: _get('/apiMovieOrders/getById'),
  getMovieOrdersByMovieId: _get('/apiMovieOrders/pageByMovieId'),
  getMovieOrdersByUserId: _get('/apiMovieOrders/pageByUserId'),
  deleteMovieOrders: _delete('/apiMovieOrders/delete', TRADITION_MODEL)
}

const statistic = {
  getStatisticInfo: _post('/statistics')
}

export default {
  ...base,
  ...user,
  ...category,
  ...donate,
  ...notice,
  ...comment,
  ...goodsOrder,
  ...item,
  ...shopFile,
  ...statistic,
  ...shoppingCar,
  ...advice,
  ...movie,
  ...reply,
  ...orderMovie
}
