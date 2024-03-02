import { _get, _delete, _put, _post } from "./helper";

const TRADITION_MODEL = 2;
const BATCH = 3;
const base = {
  changePwd: _get("/login/changePassword"),
  login: _post("/login/api/login", TRADITION_MODEL),
  register: _post("/login/api/regist"),
  checkCode: _get("/login/getCheckCode"),
};

const user = {
  getUserList: _get("/user/page"),
  addUser: _post("/user/insert"),
  editUser: _put("/user/updateIgnoreNull"),
  deleteUser: _delete("/user/delete", TRADITION_MODEL),
  getUserByUsername: _get("/login/getUserByUsername"),
};
//
const category = {
  getCategories: _get("/apiGoodsLx/list"),
  getCategoryList: _get("/apiGoodsLx/pageList"),
  getCategoryById: _get("/apiGoodsLx/getById", TRADITION_MODEL),
  addCategory: _post("/apiGoodsLx/insert"),
  editCategory: _put("/apiGoodsLx/update"),
  deleteCategory: _delete("/apiGoodsLx/delete", TRADITION_MODEL),
};

const donate = {
  getDonate: _get("/apiDonate/list"),
  getDonateList: _get("/apiDonate/pageList"),
  getDonateById: _get("/apiDonate/getById", TRADITION_MODEL),
  addDonate: _post("/apiDonate/insert"),
  editDonate: _put("/apiDonate/update"),
  deleteDonate: _delete("/apiDonate/delete", TRADITION_MODEL),
};

const item = {
  getItem: _get("/apiGoods/list"),
  getItemList: _get("/apiGoods/pageList"),
  getItemById: _get("/apiGoods/getById", TRADITION_MODEL),
  addItem: _post("/apiGoods/insert"),
  editItem: _put("/apiGoods/update"),
  deleteItem: _delete("/apiGoods/delete", TRADITION_MODEL),
};
const notice = {
  // getNotices: _get('/apiNotice/list'),
  getNoticeList: _get("/apiNotice/page"),
  addNotice: _post("/apiNotice/insert"),
  editNotice: _put("/apiNotice/update"),
  deleteNotice: _delete("/apiNotice/delete", TRADITION_MODEL),
};
//
const comment = {
  // getComments: _get('/apiNotice/list'),
  getCommentList: _get("/apiNotice/pageList"),
  addComment: _post("/apiNotice/insert"),
  editComment: _put("/apiNotice/update"),
  deleteComment: _delete("/apiNotice/delete", TRADITION_MODEL),
};
//
const goodsOrder = {
  getGoodsOrder: _get("/apiGoodsOrder/list"),
  getGoodsOrderList: _get("/apiGoodsOrder/pageList"),
  addGoodsOrderList: _post("/apiGoodsOrder/batchInsert"),
  addGoodsOrder: _post("/apiGoodsOrder/insert"),
  editGoodsOrder: _put("/apiGoodsOrder/update"),
  deleteGoodsOrder: _delete("/apiGoodsOrder/delete", TRADITION_MODEL),
};

const shoppingCar = {
  getShoppingCar: _get("/apiShoppingCar/list"),
  getShoppingCarList: _get("/apiShoppingCar/pageList"),
  getShoppingCarById: _get("/apiShoppingCar/getById"),
  addShoppingCar: _post("/apiShoppingCar/insert"),
  editShoppingCar: _put("/apiShoppingCar/update"),
  deleteShoppingCarList: _delete("/apiShoppingCar/batchDelete", BATCH),
  deleteShoppingCar: _delete("/apiShoppingCar/delete", TRADITION_MODEL),
};

const shopFile = {
  getShopFile: _get("/apiShopFile/list"),
  getShopFileList: _get("/apiShopFile/pageList"),
  addShopFile: _post("apiShopFile/insert"),
  editShopFile: _put("/apiShopFile/update"),
  deleteShopFile: _delete("/apiShopFile/delete", TRADITION_MODEL),
};
const advice = {
  // getAddvices: _get('/apiAddvice/list'),
  getAddviceList: _get("/apiAddvice/pageList"),
  addAddvice: _post("apiAddvice/insert"),
  editAddvice: _put("/apiAddvice/update"),
  deleteAddvice: _delete("/apiAddvice/delete", TRADITION_MODEL),
};

const statistic = {
  getStatisticInfo: _post("/statistics"),
};

// 供应商
const supplier = {
  getAllSupplier: _get("/apiSupplier/list"),
  getSupplierList: _get("/apiSupplier/pageList"),
  addSupplier: _post("apiSupplier/insert"),
  editSupplier: _put("/apiSupplier/update"),
  deleteSupplier: _delete("/apiSupplier/delete", TRADITION_MODEL),
};

// 采购订单
const procureOrder = {
  getProcureOrderList: _get("/apiProcureOrder/pageList"),
  addProcureOrder: _post("apiProcureOrder/insert"),
  editProcureOrder: _put("/apiProcureOrder/update"),
  deleteProcureOrder: _delete("/apiProcureOrder/delete", TRADITION_MODEL),
};

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
  ...supplier,
  ...procureOrder,
};
