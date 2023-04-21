<template>
  <el-card class="reply">
    <!--  -->
    <!--  -->
    <el-table :data="filterTableData" style="width: 100%" max-height="650px">
      <el-table-column prop="title" label="标题" min-width="120"> </el-table-column>
      <el-table-column prop="content" label="反馈内容" min-width="120"> </el-table-column>
      <el-table-column prop="state" label="状态" min-width="60">
        <template v-slot="{ row }">
          <el-tag :type="replyState[row.state].type">{{ replyState[row.state].value }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论时间" min-width="80">
        <template v-slot="{ row }">
          {{ row.ctime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="回复时间" min-width="80">
        <template v-slot="{ row }">
          {{ row.utime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{ row }">
          <el-link type="primary" @click="showReplyDialog(row)" :disabled="row.state == 1"> 修改反馈</el-link>
          <el-link type="danger" @click="deleteById(deleteAddvice, fetchAddvice, row.id, '评论')"> 删除反馈</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination
      @size-change="handleSizeChange(fetchAddvice, $event)"
      @current-change="handleCurrentChange(fetchAddvice, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="用户反馈" :visible.sync="replyDialogVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="replyForm" :rules="replyRules" ref="replyForm">
        <el-form-item label="标题" prop="title">
          <el-input type="type" v-model="replyForm.title" autocomplete="off" readonly> </el-input>
        </el-form-item>
        <el-form-item label="用户反馈" prop="content">
          <el-input type="textarea" v-model="replyForm.content" autocomplete="off" readonly> </el-input>
        </el-form-item>
        <el-form-item label="医生回复" prop="content">
          <el-input type="textarea" v-model="replyForm.description" autocomplete="off"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="replyDialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="submitReplyForm('replyForm')"> 提交 </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// import { reply } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
import { deepClone } from '@utils'
import { replyState } from '@static'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      replyDialogVisible: false,
      replyForm: {},
      replyState,
      replyRules: {
        description: [{ required: true, message: '请输入医生回复', trigger: 'blur' }]
      }
    }
  },
  mixins: [aMixin],
  // 定义组件方法
  methods: {
    // 导入需要的 action 方法
    ...mapActions(['fetchAllUser', 'fetchAllRoom']),
    // 导入删除方法和上传图片的方法
    deleteAddvice: _api.deleteAddvice,
    // 获取意见反馈列表数据
    async fetchAddvice() {
      const { list, total } = await _api.getAddviceList(this.query)
      this.tableData = list
      this.total = total
    },
    // 显示回复对话框
    showReplyDialog(row) {
      // 深拷贝选中行数据并赋值给回复表单
      this.replyForm = deepClone(row)
      // 显示回复对话框
      this.replyDialogVisible = true
    },
    // 提交回复表单
    submitReplyForm(formName) {
      // 表单验证
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        // 执行修改操作
        const { success } = await _api.editAddvice({
          ...this[formName],
          utime: Date.now,
          state: 1
        })
        if (success) {
          this.$message.success('回复成功')
          this.fetchAddvice()
        } else {
          this.$message.error('服务繁忙')
        }
        // 隐藏回复对话框
        this.replyDialogVisible = false
      })
    }
  },
  // 计算属性
  computed: {
    // 导入需要的 getter 方法
    ...mapGetters(['getUserById', 'getRoomById']),
    // 过滤后的表格数据
    filterTableData() {
      return this.tableData
    }
  },
  // 组件创建时调用的方法
  created() {
    // 获取意见反馈列表数据、用户列表数据和房间列表数据
    this.fetchAddvice()
    this.fetchAllUser()
    this.fetchAllRoom()
  }
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
