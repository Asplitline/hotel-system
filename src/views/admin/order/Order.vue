<template>
  <el-card class="order">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客房号码">
            <el-input v-model="searchForm.number" placeholder="请输入房号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客房类型" prop="roomType">
            <el-select v-model="searchForm.roomType" placeholder="请选择客房类型" clearable>
              <el-option v-for="item in roomType" :key="item.flag" :label="item.value"
                :value="item.flag">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">
              查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="roomId" label="房间名称" min-width="100">
      </el-table-column>
      <el-table-column prop="userId" label="客户" min-width="60">
      </el-table-column>
      <el-table-column prop="price" label="房间价格" min-width="100">
        <template v-slot="{row}">
          <el-tag type="danger" effect="plain">{{'￥'+row.price +'.00'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="房间状态" min-width="100">
        <template v-slot="{row}">
          <el-tag :type="orderInfo[row.state].type">
            {{orderInfo[row.state].value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <el-link type="success">同意入住</el-link>
        <el-link type="primary">退房处理</el-link>
        <el-link type="danger">驳回请求</el-link>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import { order } from '@mock'
import { aMixin } from '@mixins'
import { orderInfo, roomType } from '@static'
export default {
  data() {
    return {
      searchForm: {},
      tableData: order,
      orderInfo,
      roomType
    }
  },
  mixins: [aMixin],
  created() {
    this.total = 8
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
