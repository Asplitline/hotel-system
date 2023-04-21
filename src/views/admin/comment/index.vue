<template>
  <el-card class="comment">
    <el-table :data="filterTableData" style="width: 100%" max-height="650px">
      <el-table-column prop="user.username" label="用户名" min-width="80">
        <template v-slot="{ row }">
          <el-tag type="success">{{ row.user.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="doctor.username" label="医生名称" min-width="80">
        <template v-slot="{ row }">
          <el-tag type="primary">{{ row.doctor.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roomId" label="医嘱" min-width="120">
        <template v-slot="{ row }">
          <el-tooltip :content="row.description" placement="bottom" effect="light">
            <p>{{ row.description }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="100">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="修改时间" min-width="100">
        <template v-slot="{ row }">
          {{ row.updateTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="60">
        <template v-slot="{ row }">
          <el-link type="danger" @click="deleteById(deleteComment, fetchComment, row.id, '医嘱')"> 删除医嘱</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination
      @size-change="handleSizeChange(fetchComment, $event)"
      @current-change="handleCurrentChange(fetchComment, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
// import { comment } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
// import { deepClone } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchForm: {},
      tableData: []
    }
  },
  mixins: [aMixin],
  // 定义方法
  methods: {
    ...mapActions(['fetchAllUser', 'fetchAllRoom']), // 引入action中的fetchAllUser和fetchAllRoom方法
    deleteComment: _api.deleteComment, // 删除评论方法
    async fetchComment() {
      // 获取评论方法
      const { data: list } = await _api.getComments(this.query) // 调用API中的getComments方法，获取评论数据
      this.tableData = list.map((item) => {
        // 对获取到的评论数据进行处理
        const user = this.getUserById(item.userId) // 获取评论者的用户信息
        const doctor = this.getUserById(item.doctorId) // 获取医生的用户信息
        return { ...item, user, doctor } // 返回一个包含评论、评论者和医生信息的对象
      })
      // this.tableData = list
      // this.total = total
    }
  },
  // 定义计算属性
  computed: {
    ...mapGetters(['getUserById', 'getRoomById']), // 引入getter中的getUserById和getRoomById方法
    filterTableData() {
      // 定义一个过滤后的表格数据计算属性
      return this.tableData // 直接返回tableData数据
    }
  },
  // 定义created钩子
  created() {
    this.fetchComment() // 在created钩子中调用fetchComment方法，获取评论数据
    this.fetchAllUser() // 在created钩子中调用fetchAllUser方法，获取所有用户数据
    this.fetchAllRoom() // 在created钩子中调用fetchAllRoom方法，获取所有房间数据
  }
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
