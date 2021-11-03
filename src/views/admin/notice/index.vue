<template>
  <el-card class="notice">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="标题">
            <el-input v-model="query.keyword" placeholder="请输入公告标题" clearable
              @clear="fetchNotice" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchNotice">查询
            </el-button>
            <el-button type="success" icon="el-icon-plus" @click="showDialog(0)">发布
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="url" label="封面" min-width="200">
        <template v-slot="{row}">
          <img :src="bindIMG(row.url)" alt="" class="cover">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="150">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="150">
        <template v-slot="{row}">
          {{row.createTime|formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="150">
        <template v-slot="{row}">
          {{row.updateTime|formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="{row}">
          <el-link type="primary" @click="showDialog(1,row)">修改公告</el-link>
          <el-link type="danger"
            @click="deleteById(deleteNotice,fetchNotice,row.id,'公告')">删除公告</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination @size-change="handleSizeChange(fetchNotice,$event)"
      @current-change="handleCurrentChange(fetchNotice,$event)" :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog :title="noticeForm.flag === 0?'添加公告':'修改公告'" :visible.sync="dialogVisible"
      width="30%" class="a-dialog" @close="clearDialog('noticeForm')"
      :close-on-click-modal="false">
      <el-form :model="noticeForm" :rules="noticeRules" ref="noticeForm" size="small"
        label-width="100px">
        <el-form-item label="头像" prop="url">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="noticeForm.url" :src="bindIMG(noticeForm.url)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="noticeForm.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="comment">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" resize="none"
            v-model="noticeForm.comment" placeholder="公告内容">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false" size="small">取 消
        </el-button>
        <el-button type="success" @click="submitDialog('noticeForm',noticeForm.flag)"
          size="small">
          {{noticeForm.flag === 0?'添加':'修改'}}
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// import { notice } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
import { ADD, EDIT } from '@static'
import { deepClone, getUid, bindURL, bindIMG } from '@utils'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      dialogVisible: false,
      noticeForm: {},
      noticeRules: {}
    }
  },
  methods: {
    bindURL,
    bindIMG,
    deleteNotice: _api.deleteNotice,
    async fetchNotice() {
      const { list, total } = await _api.getNoticeList(this.query)
      this.tableData = list
      this.total = total
    }, // 显示对话框
    showDialog(flag, data) {
      this.dialogVisible = true
      if (flag === ADD) {
        //
      } else if (flag === EDIT) {
        this.noticeForm = deepClone(data)
      }
      this.noticeForm.flag = flag
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
          const { success } = await _api.addNotice(this[formName])
          this.handleSuccess(success, '添加', this.fetchUser)
        } else if (flag === EDIT) {
          const { success } = await _api.editNotice(this[formName])
          this.handleSuccess(success, '修改', this.fetchUser)
        }
        this.dialogVisible = false
        this.fetchNotice()
      })
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      this.$set(this.noticeForm, 'url', res)
    }
  },
  mixins: [aMixin],
  created() {},
  mounted() {
    this.fetchNotice()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
.cover {
  width: 200px;
  // height: auto;
  height: 100%;
}
</style>
