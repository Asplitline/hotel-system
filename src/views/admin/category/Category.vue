<template>
  <el-card class="room">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="客房类型">
            <el-select v-model="searchForm.sex" placeholder="请选择客房类型" clearable>
              <el-option :key="item.flag" :label="item.value" :value="item.flag"
                v-for="item in roomType">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="success" icon="el-icon-plus">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="name" label="客房类型" min-width="100">
      </el-table-column>
      <el-table-column prop="description" label="客房描述" min-width="150">
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
        <el-link type="primary">修改类型</el-link>
        <el-link type="danger">删除类型</el-link>
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
import { category } from '@mock'
import { aMixin } from '@mixins'
import { roomType } from '@static'
export default {
  data() {
    return {
      searchForm: {},
      tableData: category,
      roomType
    }
  },
  mixins: [aMixin],
  created() {
    this.total = 4
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
