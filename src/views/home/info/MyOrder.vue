<template>
  <div class="my-order">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="roomId" label="房间名称" min-width="100">
        <template v-slot="{row}">
          {{row.room&&row.room.name}}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="预定价格" min-width="100">
        <template v-slot="{row}">
          <el-tag type="danger" effect="plain">{{row.price | $}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="当前状态" min-width="100">
        <template v-slot="{row}">
          <el-tag :type="orderState[row.state].type">{{orderState[row.state].value}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="{row}">
          <el-link type="primary" @click="handleOrder(row,2)" :disabled="row.state!==1">
            取消预定
          </el-link>
          <el-link type="success" @click="handleOrder(row,4)" :disabled="row.state!==3">
            申请退房</el-link>
          <el-link type="danger" :disabled="row.state!==4&&row.state!==2 && row.state!==5"
            @click="deleteById(deleteOrder,fetchOrder,row.id,'订单记录')">
            删除记录</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change=" handleSizeChange(fetchOrder,$event)"
      @current-change="handleCurrentChange(fetchOrder,$event)" :current-page="query.page"
      :page-size="query.size" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { hMixin } from '@mixins'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
import { orderState, REJECT, APPLY } from '@static'
import { deepClone } from '@utils'
export default {
  props: {
    id: {
      type: Number
    }
  },
  mixins: [hMixin],
  data() {
    return {
      tableData: [],
      orderState
    }
  },
  methods: {
    ...mapActions(['fetchAllRoom']),
    deleteOrder: _api.deleteOrder,
    async fetchOrder() {
      this.query.keyword = this.id
      const { list, total } = await _api.getOrderList(this.query)
      console.log(this.query)
      list.forEach((item) => {
        item.room = this.getRoomById(item.roomId)
      })
      this.tableData = list
      this.total = total
    },
    async handleOrder(data, flag) {
      data = deepClone(data)
      switch (flag) {
        case REJECT:
          this.confirmInfo(data, flag, '将取消预订', this.fetchOrder, 0)
          break
        case APPLY:
          this.confirmInfo(data, flag, '将申请退房', this.fetchOrder, 0)
          break
      }
    },
    confirmInfo(data, flag, info, callback, roomFlag) {
      this.$confirm(info + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { success: oSuccess } = await _api.editOrder({
            id: data.id,
            state: flag
          })
          const { success: rSuccess } = await _api.editRoom({
            id: data.roomId,
            state: roomFlag
          })
          if (oSuccess && rSuccess) {
            this.$message.success('操作成功')
            callback && callback()
          }
        })
        .catch(() => {
          this.$message.warning('操作已取消')
        })
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
.el-link {
  margin-right: 10px;
}
</style>
