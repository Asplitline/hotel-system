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
          <el-upload
            class="avatar-uploader"
            :action="bindURL('/file/uploadFile')"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="files"
          >
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
      const { total, list } = await _api.getUserList(this.query)
      this.total = total
      console.log(list)
      this.tableData = list
    },
    // 显示对话框
    showDialog(flag, data) {
      this.dialogVisible = true
      if (flag === ADD) {
        //
      } else if (flag === EDIT) {
        this.userForm = deepClone(data)
      }
      this.userForm.flag = flag
    },
    // 提交对话框
    submitDialog(formName, flag) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        delete this[formName].flag
        if (flag === ADD) {
          Object.assign(this[formName], {
            id: getUid(),
            createTime: Date.now()
          })
          const { success } = await _api.addUser(this[formName])
          this.handleSuccess(success, '添加', this.fetchUser)
        } else if (flag === EDIT) {
          const { success } = await _api.editUser(this[formName])
          this.handleSuccess(success, '修改', this.fetchUser)
        }
        this.dialogVisible = false
      })
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      console.log(res)
      this.$set(this.userForm, 'url', res)
    },
    // 重置密码
    resetPassword(id) {
      this.$confirm('此操作将重置密码是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const { success } = await _api.changePwd({
            id,
            password: DEFAULT_PWD
          })
          if (success) {
            this.$message.success('重置密码成功，新密码为:123456')
          } else {
            this.$message.error('重置密码失败')
          }
        })
        .catch(() => {
          this.$message.warning('已取消操作')
        })
    }
  },
  computed: {
    filterTableData() {
      if (this.hasFilter) {
        let data = deepClone(this.tableData)
        const { username, sex, level } = this.searchForm
        // 账号
        if (data && username && username.trim().length > 0) {
          data = data.filter((item) => item.username.toLowerCase().indexOf(username.toLowerCase()) !== -1)
        }
        if (data && sex >= 0 && sex !== '') {
          data = data.filter((item) => Number(item.sex) === sex)
        }
        if (data && level >= 0 && level !== '') {
          data = data.filter((item) => Number(item.level) === level)
        }
        this.initSearch()
        return data
      } else {
        return this.tableData
      }
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchUser()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
