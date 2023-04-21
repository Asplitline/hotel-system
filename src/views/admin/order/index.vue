<template>
  <el-card class="comment">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="goodsName" label="商品" min-width="100"> </el-table-column>
      <el-table-column prop="price" label="价格" min-width="100">
        <template v-slot="{ row }">
          <el-tag type="danger" effect="plain">{{ row.price | $ }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100">
        <template v-slot="{ row }">
          <el-tag :type="orderState[row.status].type">{{ orderState[row.status].label }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="购买时间" min-width="100">
        <template v-slot="{ row }">
          {{ row.creatTime || Date.now() | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="{ row }">
          <el-popconfirm title="将派送商品" @confirm="handleOrder(row, 1)">
            <el-link type="primary" :disabled="row.status !== 0" slot="reference"> 商品派送</el-link>
          </el-popconfirm>
          <el-popconfirm title="确认商品送达？" @confirm="handleOrder(row, 2)">
            <el-link type="success" :disabled="row.status !== 1" slot="reference"> 商品送达</el-link>
          </el-popconfirm>
          <el-link type="danger" @click="deleteById(deleteOrder, fetchOrder, row.id, '支付记录')" :disabled="row.status !== 3">
            删除记录</el-link
          >
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
import { aMixin } from '@mixins'
import _api from '@api'
import { orderState } from '@static'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      orderState
    }
  },
  mixins: [aMixin],
  methods: {
    deleteOrder: _api.deleteGoodsOrder, // 删除订单方法
    async fetchOrder() {
      // 异步获取订单列表
      const { list } = await _api.getGoodsOrderList() // 调用API获取订单列表
      this.tableData = list // 将订单列表赋值给tableData变量
    },
    async handleOrder(i, status) {
      // 处理订单状态的方法
      const { success } = await _api.editGoodsOrder({ id: i.id, status }) // 调用API修改订单状态
      this.handleSuccess(success, ['', '派送', '送达'][status], this.fetchOrder) // 根据API返回的结果进行操作
    }
  },
  computed: {
    ...mapGetters(['getUserById', 'getItemById']), // 引入getter方法
    filterTableData() {
      // 筛选表格数据的计算属性
      return this.tableData // 直接返回tableData变量
    }
  },
  mounted() {
    this.fetchOrder() // 在组件挂载后调用fetchOrder方法获取订单列表
  }
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
