<template>
  <el-card class="user">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="账号">
            <el-input v-model="searchForm.number" placeholder="请输入账号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.readName" placeholder="请输入姓名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="searchForm.sex" placeholder="请输入性别" clearable>
              <el-option key="1" label="男" value="男"></el-option>
              <el-option key="2" label="女" value="女"></el-option>
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
      <el-table-column prop="url" label="头像" min-width="120">
        <template v-slot="{row}">
          <img :src="row.url" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" min-width="100">
      </el-table-column>
      <el-table-column prop="sex" label="性别" min-width="60">
        <template v-slot="{row}">
          {{sexInfo[row.sex].value}}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="100">
      </el-table-column>
      <el-table-column prop="phone" label="手机" min-width="100">
      </el-table-column>
      <el-table-column prop="state" label="状态" min-width="60">
        <template v-slot="{row}">
          <el-tag :type="stateInfo[row.state].type"> {{stateInfo[row.state].value}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="身份" min-width="60">
        <template v-slot="{row}">
          <el-tag :type="levelInfo[row.state].type"> {{levelInfo[row.state].value}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <el-link type="primary">修改用户</el-link>
        <el-link type="info">重置密码</el-link>
        <el-link type="danger">删除用户</el-link>
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
import { user } from '@mock'
import { levelInfo, sexInfo, stateInfo } from '@static'
import { aMixin } from '@mixins'
export default {
  data() {
    return {
      searchForm: {},
      tableData: user,
      sexInfo,
      stateInfo,
      levelInfo
    }
  },
  mixins: [aMixin]
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
