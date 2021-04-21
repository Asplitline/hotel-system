<template>
  <el-card class="order">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="房间名称">
            <el-input v-model="searchForm.name" placeholder="请输入房间名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客房状态">
            <el-select v-model="searchForm.state" placeholder="请选择客房类型" clearable>
              <el-option v-for="item in orderState" :key="item.id" :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">
              查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="filterTableData" style="width: 100%" max-height="650px">
      <el-table-column prop="roomId" label="房间名称" min-width="100">
        <template v-slot="{row}">
          <!-- ques  data no response -->
          <!-- done : variable speel err -->
          {{row.room&&row.room.name}}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="客户" min-width="60">
        <template v-slot="{row}">
          {{row.user&&row.user.username}}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="房间价格" min-width="100">
        <template v-slot="{row}">
          <el-tag type="danger" effect="plain">{{row.price | $}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="房间状态" min-width="100">
        <template v-slot="{row}">
          <el-tag :type="orderState[row.state].type">
            {{orderState[row.state].value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template v-slot="{row}">
          <el-link type="success" @click="handleOrder(row,3)" :disabled="row.state!==1">
            同意入住</el-link>
          <el-link type="danger" @click="handleOrder(row,2)" :disabled="row.state!==1">
            拒绝入住</el-link>
          <el-link type="primary" @click="handleOrder(row,5)" :disabled="row.state!==4">
            退房处理
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange(fetchOrder,$event)"
      @current-change="handleCurrentChange(fetchOrder,$event)" :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
// import { order } from '@mock'
import { aMixin } from '@mixins'
import { orderState, ACCEPT, REJECT, FINISH } from '@static'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
import { deepClone } from '@utils'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      orderState
    }
  },
  mixins: [aMixin],
  methods: {
    ...mapActions(['fetchAllUser', 'fetchAllRoom']),
    async fetchOrder() {
      const { list, total } = await _api.getOrderList(this.query)
      list.forEach((item) => {
        item.room = this.getRoomById(item.roomId)
        item.user = this.getUserById(item.userId)
      })
      this.tableData = list
      this.total = total
    },
    async handleOrder(data, flag) {
      data = deepClone(data)
      switch (flag) {
        case ACCEPT:
          this.confirmInfo(data, flag, '将同意客户入住', this.fetchOrder, 1)
          break
        case REJECT:
          this.confirmInfo(data, flag, '将拒绝客户入住', this.fetchOrder)
          break
        case FINISH:
          this.confirmInfo(data, flag, '将为客人退房', this.fetchOrder, 0)
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
          const { success: rSuccess = true } =
            roomFlag !== undefined &&
            (await _api.editRoom({
              id: data.roomId,
              state: roomFlag
            }))

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
    ...mapGetters(['getUserById', 'getRoomById']),
    filterTableData() {
      if (this.hasFilter) {
        const { name = '', state } = this.searchForm
        let data = deepClone(this.tableData)
        if (data && name.trim().length > 0) {
          data = data.filter((item) => {
            const { length } = Object.keys(item.room)
            return length && item.room.name.indexOf(name) !== -1
          })
        }
        if (data && typeof state === 'number') {
          data = data.filter((item) => item.state === state)
        }
        this.initSearch()
        return data
      } else {
        return this.tableData
      }
    }
  },
  created() {
    this.fetchAllRoom()
    this.fetchAllUser()
    this.fetchOrder()
    // Promise.all([])
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
