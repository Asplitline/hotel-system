<template>
  <el-card class="comment">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="用户">
            <el-input v-model="searchForm.number" placeholder="请输入用户id" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房间">
            <el-input v-model="searchForm.number" placeholder="请输入房间编号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <!-- <el-button type="success" icon="el-icon-plus">新增</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="roomId" label="房间名称" min-width="120">
      </el-table-column>
      <el-table-column prop="userId" label="用户名称" min-width="120">
      </el-table-column>
      <el-table-column prop="description" label="评论内容" min-width="150">
      </el-table-column>
      <el-table-column prop="createTime" label="评论时间" min-width="80">
        <template v-slot="{row}">
          {{row.createTime | formatDate}}
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="80">
        <el-link type="danger">删除评论</el-link>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import { comment } from '@mock'
import { aMixin } from '@mixins'
export default {
  data() {
    return {
      searchForm: {},
      tableData: comment
    }
  },
  mixins: [aMixin],
  created() {
    this.total = 5
  }
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
