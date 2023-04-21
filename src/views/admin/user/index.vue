<template>
  <el-card class="user">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="账号">
            <el-input v-model="searchForm.username" placeholder="请输入账号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="searchForm.sex" placeholder="请选择性别" clearable>
              <el-option v-for="item in sexInfo" :key="item.flag" :label="item.value" :value="item.flag"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份">
            <el-select v-model="searchForm.level" placeholder="请选择身份" clearable>
              <el-option :key="item.flag" v-for="item in levelInfo" :label="item.value" :value="item.flag"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询 </el-button>
            <!-- <el-button type="success" icon="el-icon-plus" @click="showDialog(0)">新增
						</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="filterTableData" style="width: 100%" max-height="650px">
      <el-table-column prop="url" label="头像" min-width="100">
        <template v-slot="{ row }">
          <img :src="bindIMG(row.url)" alt="" class="tb-avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号" min-width="100"> </el-table-column>
      <el-table-column prop="sex" label="性别" min-width="60">
        <template v-slot="{ row }">
          {{ sexInfo[row.sex].value }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="100"> </el-table-column>
      <el-table-column prop="phone" label="手机" min-width="100"> </el-table-column>
      <el-table-column prop="state" label="状态" min-width="60">
        <template v-slot="{ row }">
          <el-tag :type="stateInfo[row.state].type"> {{ stateInfo[row.state].value }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="身份" min-width="60">
        <template v-slot="{ row }">
          <el-tag :type="levelInfo[row.level].type" effect="dark">
            {{ levelInfo[row.level].value }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template v-slot="{ row }">
          <el-link type="primary" @click="showDialog(1, row)">修改用户</el-link>
          <el-link type="info" @click="resetPassword(row.id)">重置密码</el-link>
          <el-link type="danger" @click="deleteById(deleteUser, fetchUser, row.id, '用户')"> 删除用户</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange(fetchUser, $event)"
      @current-change="handleCurrentChange(fetchUser, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!--  -->
    <el-dialog
      :title="userForm.flag === 0 ? '添加用户' : '修改用户'"
      :visible.sync="dialogVisible"
      width="30%"
      class="a-dialog"
      @close="clearDialog('userForm')"
      :close-on-click-modal="false"
    >
      <el-form :model="userForm" :rules="userRules" ref="userForm" size="small" label-width="100px">
        <el-form-item prop="url" label-width="0">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="userForm.url" :src="bindIMG(userForm.url)" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="userForm.username" placeholder="用户账号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="userForm.sex" v-for="item in sexInfo" :key="item.flag" :label="item.flag | string">{{ item.value }}</el-radio>
        </el-form-item>
        <el-form-item label="号码" prop="phone">
          <el-input v-model="userForm.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="level">
          <el-radio v-model="userForm.level" v-for="item in levelInfo" :key="item.flag" :label="item.flag | string">{{
            item.value
          }}</el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="userForm.state" v-for="item in stateInfo" :key="item.flag" :label="item.flag">{{ item.value }}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false" size="small">取 消 </el-button>
        <el-button type="success" @click="submitDialog('userForm', userForm.flag)" size="small">
          {{ userForm.flag === 0 ? '添加' : '修改' }}
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { levelInfo, sexInfo, stateInfo, ADD, EDIT, DEFAULT_PWD } from '@static'
import { aMixin } from '@mixins'
import _api from '@api'
import { deepClone, getUid, bindURL, bindIMG, checkPhone, checkEmail } from '@utils'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      sexInfo,
      stateInfo,
      levelInfo,
      userForm: {},
      userRules: {
        url: [{ required: true, message: '请选择头像', trigger: 'blur' }],
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        level: [{ required: true, message: '请设置用户身份', trigger: 'blur' }],
        state: [{ required: true, message: '请请设置用户权限', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  methods: {
    bindURL,
    bindIMG,
    deleteUser: _api.deleteUser,
    async fetchUser() {
      const { total, list } = await _api.getUserList(this.query) // 从API获取用户列表数据
      this.total = total // 设置总数
      console.log(list) // 打印列表数据
      this.tableData = list // 设置表格数据
    },
    // 显示对话框
    showDialog(flag, data) {
      this.dialogVisible = true // 显示对话框
      if (flag === ADD) {
        //
      } else if (flag === EDIT) {
        // 如果是编辑操作，深拷贝传入的数据
        this.userForm = deepClone(data)
      }
      this.userForm.flag = flag // 设置操作标志
    },
    // 提交对话框
    submitDialog(formName, flag) {
      this.$refs[formName].validate(async (valid) => {
        // 校验表单
        if (!valid) return
        this[formName].updateTime = Date.now() // 设置更新时间
        delete this[formName].flag // 删除操作标志
        if (flag === ADD) {
          // 如果是添加操作
          Object.assign(this[formName], {
            // 生成新数据的id和创建时间
            id: getUid(),
            createTime: Date.now()
          })
          const { success } = await _api.addUser(this[formName]) // 调用API添加用户
          this.handleSuccess(success, '添加', this.fetchUser) // 处理添加成功的回调
        } else if (flag === EDIT) {
          // 如果是编辑操作
          const { success } = await _api.editUser(this[formName]) // 调用API编辑用户
          this.handleSuccess(success, '修改', this.fetchUser) // 处理编辑成功的回调
        }
        this.dialogVisible = false // 关闭对话框
      })
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      console.log(res, file) // 打印头像上传的结果和文件信息
      console.log(res)
      this.$set(this.userForm, 'url', res) // 设置用户表单中的头像url
    },
    // 重置密码
    resetPassword(id) {
      this.$confirm('此操作将重置密码是否继续?', '提示', {
        // 弹出确认框
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          // 如果确认
          const { success } = await _api.changePwd({
            // 调用API重置密码
            id,
            password: DEFAULT_PWD
          })
          if (success) {
            // 如果重置成功
            this.$message.success('重置密码成功，新密码为:123456') // 显示成功提示
          } else {
            this.$message.error('重置密码失败') // 显示失败提示
          }
        })
        .catch(() => {
          this.$message.warning('已取消操作') // 如果取消操作，显示提示
        })
    }
  },
  computed: {
    filterTableData() {
      if (this.hasFilter) {
        // 如果开启了筛选功能
        let data = deepClone(this.tableData) // 深拷贝表格数据
        const { username, sex, level } = this.searchForm
        // 根据用户名筛选
        if (data && username && username.trim().length > 0) {
          data = data.filter((item) => item.username.toLowerCase().indexOf(username.toLowerCase()) !== -1)
        }

        // 根据性别筛选
        if (data && sex >= 0 && sex !== '') {
          data = data.filter((item) => Number(item.sex) === sex)
        }

        // 根据等级筛选
        if (data && level >= 0 && level !== '') {
          data = data.filter((item) => Number(item.level) === level)
        }

        this.initSearch() // 初始化搜索框
        return data // 返回筛选后的数据
      } else {
        return this.tableData // 如果未开启筛选功能，则原样返回表格数据
      }
    }
  },
  mixins: [aMixin], // 引入 aMixin 混入
  created() {
    this.fetchUser() // 在 created 生命周期钩子中调用 fetchUser 方法，用于获取用户数据
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
