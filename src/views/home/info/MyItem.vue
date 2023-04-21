<template>
  <div class="my-item">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="project.name" label="体检名称" min-width="100">
        <!-- <template v-slot="{row}">
					{{row.room&&row.room.name}}
				</template> -->
      </el-table-column>
      <el-table-column label="体检时间" min-width="100">
        <template v-slot="{ row }">
          <el-tag effect="dark">{{ row.tjTime | formatDate(1) }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" min-width="100">
        <template v-slot="{ row }">
          <el-tag :type="orderState[row.status].type">{{ orderState[row.status].value }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="{ row }">
          <el-link type="danger" :disabled="row.state !== 5" @click="deleteById(deleteAppointment, fetchAppointment, row.id, '预约记录')">
            删除记录</el-link
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { hMixin } from '@mixins'
import _api from '@api'
import { mapActions, mapState } from 'vuex'
import { orderState } from '@static'
export default {
  props: {
    id: {
      type: String
    }
  },
  mixins: [hMixin],
  data() {
    // 定义数据项
    return {
      tableData: [], // 表格数据
      orderState // 订单状态
    }
  },
  computed: {
    ...mapState(['allItem']) // 引入状态管理中的 allItem 数据
  },
  methods: {
    ...mapActions(['fetchAllItem']), // 引入 actions 中的 fetchAllItem 方法
    // 定义删除预约方法
    deleteAppointment: _api.deleteAppointment,
    // 定义获取预约信息方法
    async fetchAppointment() {
      // 发送获取预约信息请求
      const { data } = await _api.getAppointments()
      // 过滤出当前用户的预约信息，同时将预约项目加入预约信息中
      this.tableData = data
        .filter((i) => this.id === i.userId)
        .map((i) => {
          const project = this.allItem.find((j) => i.projectId === j.id)
          return { ...i, project }
        })
    }
  },
  created() {
    // 组件创建时执行 fetchAllItem 和 fetchAppointment 方法
    this.fetchAllItem()
    this.fetchAppointment()
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
}
.el-link {
  margin-right: 10px;
}
</style>
