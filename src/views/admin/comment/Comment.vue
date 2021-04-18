<template>
  <el-card class="comment">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="用户名称">
            <el-input v-model="searchForm.uName" placeholder="请输入用户名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房间名称">
            <el-input v-model="searchForm.rName" placeholder="请输入房间名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询
            </el-button>
            <!-- <el-button type="success" icon="el-icon-plus">新增</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="filterTableData" style="width: 100%" max-height="650px">
      <el-table-column prop="userId" label="房间名称" min-width="120">
        <template v-slot="{row}">
          {{row.room&&row.room.name}}
        </template>
      </el-table-column>
      <el-table-column prop="roomId" label="用户名称" min-width="120">
        <template v-slot="{row}">
          {{row.user&&row.user.username}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="评论内容" min-width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="评论时间" min-width="80">
        <template v-slot="{row}">
          {{row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{row}">
          <el-link type="danger"
            @click="deleteById(deleteComment,fetchComment,row.id,'评论')">
            删除评论</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination @size-change="handleSizeChange(fetchComment,$event)"
      @current-change="handleCurrentChange(fetchComment,$event)"
      :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
// import { comment } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
import { deepClone } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchForm: {},
      tableData: []
    }
  },
  mixins: [aMixin],
  methods: {
    ...mapActions(['fetchAllUser', 'fetchAllRoom']),
    deleteComment: _api.deleteComment,
    async fetchComment() {
      const { list, total } = await _api.getCommentList(this.query)
      list.forEach((item) => {
        // console.log(item)
        item.user = this.getUserById(item.userId)
        item.room = this.getRoomById(item.roomId)
        // deepClone(item)
      })
      this.tableData = list
      this.total = total
    }
  },
  computed: {
    ...mapGetters(['getUserById', 'getRoomById']),
    filterTableData() {
      if (this.hasFilter) {
        const { uName, rName } = this.searchForm
        let data = deepClone(this.tableData)
        if (data && uName && uName.trim().length > 0) {
          data = data.filter((item) => item.user.username.indexOf(uName) !== -1)
        }
        if (data && rName && rName.trim().length > 0) {
          data = data.filter((item) => item.room.name.indexOf(rName) !== -1)
        }
        this.initSearch()
        return data
      } else {
        return this.tableData
      }
    }
  },
  created() {
    this.fetchComment()
    this.fetchAllUser()
    this.fetchAllRoom()
  }
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
