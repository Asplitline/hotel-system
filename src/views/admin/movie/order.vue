<template>
  <el-card class="user">
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="movieId" label="电影名称" min-width="150">
        <template v-slot="{ row }">
          {{ (row.movie && row.movie.title) || '已删除' }}
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="顾客姓名"> </el-table-column>
      <el-table-column prop="customerPhone" label="顾客手机" min-width="100"> </el-table-column>
      <el-table-column prop="seatNumber" label="选择座位" min-width="150">
        <template v-slot="{ row }">
          <el-tag effect="plain" v-for="i in row.seatNumber.split(',')" :key="i" class="seat-index"> {{ i }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="extend1" label="电影场次">
        <template v-slot="{ row }">
          <el-tag effect="plain" type="success">
            {{ row.extend2 | formatTime }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isRefunded" label="订单状态" min-width="80">
        <template v-slot="{ row }">
          <el-tag :type="ticketState[row.isRefunded].type">
            {{ ticketState[row.isRefunded].value }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isRefunded" label="退票时间" min-width="120">
        <template v-slot="{ row }">
          {{ row.orderDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{ row }">
          <el-link type="danger" @click="deleteById(deleteMovieOrders, fetchMovieOrders, row.orderId, '删除订单')"> 删除订单</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange(fetchMovieOrders, $event)"
      @current-change="handleCurrentChange(fetchMovieOrders, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!--  -->
  </el-card>
</template>

<script>
import _api from '@api'
import { aMixin } from '@mixins'
import { bindIMG, bindURL } from '@utils'
import { ticketState } from '@static'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      ticketState,
      searchForm: {},
      tableData: [],
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions(['fetchAllMovie']),
    bindURL,
    bindIMG,
    deleteMovieOrders: _api.deleteMovieOrders,
    async fetchMovieOrders() {
      const { total, list } = await _api.getMovieOrdersList(this.query)
      console.log('list: ', list)
      this.total = total
      this.tableData = list.map((i) => {
        const movie = this.getMovieById(i.movieId)
        return {
          ...i,
          movie
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getMovieById'])
  },
  mixins: [aMixin],
  async created() {
    await this.fetchAllMovie()
    this.fetchMovieOrders()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';

.seat-index {
  margin-bottom: 4px;
  margin-right: 4px;
}
</style>
