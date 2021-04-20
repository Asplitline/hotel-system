<template>
  <div class="my-order">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="roomId" label="房间名称" min-width="100">
        <template v-slot="{row}">
          {{row.room&&row.room.name}}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="当前状态" min-width="100">
        <template v-slot="{row}">
          <el-tag :type="orderInfo[row.state].type">{{orderInfo[row.state].value}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="预定价格" min-width="100">
        <template v-slot="{row}">
          <el-tag type="danger" effect="plain">{{row.price | $}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange(fetchOrder,$event)"
      @current-change="handleCurrentChange(fetchOrder,$event)" :current-page="query.page"
      :page-size="query.size" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { hMixin } from '@mixins'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
import { orderInfo } from '@static'
export default {
  props: ['id'],
  mixins: [hMixin],
  data() {
    return {
      tableData: [],
      orderInfo
    }
  },
  methods: {
    ...mapActions(['fetchAllRoom']),
    async fetchOrder() {
      const { list, total } = await _api.getOrderList(this.query)
      list.forEach((item) => {
        item.room = this.getRoomById(item.roomId)
      })
      this.tableData = list
      this.total = total
    }
  },
  computed: {
    ...mapGetters(['getRoomById'])
  },
  created() {
    this.fetchOrder()
    this.fetchAllRoom()
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
}
</style>
