<template>
  <el-card class="room">
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
        <el-col :span="12">
          <el-form-item label="客房费用" prop="startMoney">
            <el-input v-model="searchForm.startPrice" placeholder="最低房费" clearable
              style="width:48%" />-
            <el-input v-model="searchForm.endPrice" placeholder="最高房费" clearable
              style="width:48%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客房状态">
            <el-select v-model="searchForm.state" placeholder="请选择客房状态" clearable>
              <el-option :key="item.flag" :label="item.value" :value="item.flag"
                v-for="item in roomInfo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">
              查询
            </el-button>
            <el-button type="success" icon="el-icon-plus">
              新增
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" max-height="600px">
      <el-table-column prop="url" label="图片" min-width="120">
        <template v-slot="{row}">
          <img :src="row.url" alt="" class="cover">
        </template>
      </el-table-column>
      <el-table-column prop="number" label="房间号" min-width="100">
        <template v-slot="{row}">
          <el-tag type="warning">{{row.number}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lx" label="客房类型" min-width="60">
      </el-table-column>
      <el-table-column prop="mj" label="占地面积" min-width="60">
      </el-table-column>
      <el-table-column prop="price" label="客房价格" min-width="100">
        <template v-slot="{row}">
          <el-tag type="danger" effect="plain">{{'￥'+row.price +'.00'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="客房状态" min-width="60">
        <template v-slot="{row}">
          <el-tag :type="roomInfo[row.state].type" effect="dark">
            {{roomInfo[row.state].value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <el-link type="primary">更新客房</el-link>
        <el-link type="danger">删除客房</el-link>
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
import { room } from '@mock'
import { aMixin } from '@mixins'
import { roomInfo, roomType } from '@static'
export default {
  data() {
    return {
      searchForm: {},
      tableData: room,
      roomInfo,
      roomType
    }
  },
  mixins: [aMixin],
  created() {
    this.total = 9
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
.cover {
  width: 160px;
  height: auto;
}
</style>
