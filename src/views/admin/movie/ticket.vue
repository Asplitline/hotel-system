<template>
  <el-card class="user">
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="source" label="订单号" min-width="200"> </el-table-column>
      <el-table-column prop="description" label="申请原因" min-width="200"> </el-table-column>
      <el-table-column prop="state" label="当前状态">
        <template v-slot="{ row }">
          <el-tag :type="checkState[row.state].type">{{ checkState[row.state].value }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="申请日期" min-width="100">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template v-slot="{ row }">
          <el-link type="primary" @click="showDialog(row)"> 审核</el-link>
          <el-link type="danger" @click="deleteById(deleteDonate, fetchDonate, row.id, '审核')"> 删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange(fetchDonate, $event)"
      @current-change="handleCurrentChange(fetchDonate, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%" class="a-dialog" :close-on-click-modal="false">
      <div class="select-info" v-if="currentItem.movie">
        <div class="cover">
          <img :src="bindIMG(currentItem.movie.url)" alt="" />
          <div class="cover-desc">
            <span>{{ currentItem.movie.title }}</span>
            <span>语言：{{ currentItem.movie.language }}</span>
            <span>片长：{{ currentItem.movie.duration }}分钟</span>
          </div>
        </div>
        <div class="desc-list">
          <div class="desc-item">
            <span>影厅</span>
            <span>{{ currentItem.movie.extend1 }}</span>
          </div>
          <div class="desc-item">
            <span>场次</span>
            <span class="red">{{ currentItem.extend2 | formatTime }}</span>
          </div>
          <div class="desc-item">
            <span>座位</span>
            <div class="desc-seat">
              <div class="desc-seat-list">
                <div class="desc-seat-item" v-for="(i, index) in currentItem.seatNumber.split(',')" :key="index">{{ i }}</div>
              </div>
            </div>
          </div>
          <div class="desc-item">
            <span>价格</span>
            <span class="red">{{ currentItem.movie.extend2 | $ }} x {{ currentItem.seatNumber.split(',').length }}</span>
          </div>
          <div class="desc-item">
            <span>总计</span>
            <span class="total">{{ (Number(currentItem.movie.extend2) * currentItem.seatNumber.split(',').length) | $ }}</span>
          </div>
        </div>

        <div class="return-ticket">
          <div class="check-info">
            <span class="title">已申请退票</span>
          </div>
          <div class="check-info">
            <span>申请原因：</span>
            <span>{{ this.currentCheck.description }}</span>
          </div>
          <div class="check-info">
            <span>当前状态：</span>
            <el-tag :type="checkState[this.currentCheck.state].type">{{ checkState[this.currentCheck.state].value }}</el-tag>
          </div>
          <el-input v-model="reason" placeholder="审核补充" v-if="currentCheck.state === 0"></el-input>
        </div>

        <div class="my-btn" v-if="currentCheck.state === 0">
          <button class="btn-movie offline" @click="handleCheck(2)">拒绝</button>
          <button class="btn-movie" @click="handleCheck(1)">同意</button>
        </div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import _api from '@api'
import { aMixin } from '@mixins'
import { bindIMG, bindURL, deepClone } from '@utils'
import { checkState } from '@static'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      checkState,
      searchForm: {},
      tableData: [],
      currentItem: [],
      dialogVisible: false,
      reason: ''
    }
  },
  methods: {
    ...mapActions(['fetchAllUser', 'fetchAllMovie']),
    bindURL,
    bindIMG,
    deleteDonate: _api.deleteDonate,
    async fetchDonate() {
      const { total, list } = await _api.getDonateList(this.query)
      this.total = total
      console.log(list)
      this.tableData = list
    },
    async fetchMovieOrderDetail(id) {
      const { data } = await _api.getMovieOrdersById({ orderId: id })
      const movie = this.getMovieById(data.movieId)
      this.currentItem = { ...data, movie }
      console.log(' this.currentItem: ', this.currentItem)
    },
    async showDialog(row) {
      this.currentCheck = deepClone(row)
      this.dialogVisible = true
      await this.fetchMovieOrderDetail(row.source)
    },
    async handleCheck(state) {
      if (state === 2 && this.reason.trim().length === 0) {
        return this.$message.error('如果拒绝退票，请说明原因')
      }
      const { success } = await _api.editDonate({
        id: this.currentCheck.id,
        source: this.currentItem.orderId,
        comment: this.reason, // 审核原因
        state: state
      })
      if (success) {
        if (state === 1) {
          const { success } = await _api.editMovieOrders({ orderId: this.currentCheck.source, isRefunded: 1 })
          if (success) this.$message.success('通过退票')
          this.reason = ''
          this.dialogVisible = false
          this.fetchDonate()
        } else {
          this.$message.success('拒绝退票')
          this.reason = ''
          this.dialogVisible = false
          this.fetchDonate()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getMovieById', 'getUserById'])
  },
  mixins: [aMixin],
  async created() {
    await this.fetchAllMovie()
    await this.fetchAllUser()
    this.fetchDonate()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

@import '~@css/acommon.less';

.return-ticket {
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  .check-info {
    span {
      display: inline-block;
    }
    span:first-child {
      width: 100px;
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
.my-btn {
  display: flex;
  margin-top: 20px;
  button:last-child {
    margin-left: 20px;
  }
}

.select-info {
  flex: 1;
  background: rgba(@color-primary, 0.1);
  padding: 20px;
  .cover {
    display: flex;
    img {
      width: 80px;
      height: auto;
    }
    &-desc {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      span {
        line-height: 30px;
        font-size: 14px;
        &:first-child {
          font-weight: 700;
          font-size: 16px;
        }
      }
    }
  }
  .desc-list {
    // background-color: #fff;
    margin-top: 20px;
    .desc-item {
      display: flex;
      box-sizing: border-box;
      padding: 5px 10px;
      .desc-seat {
        display: flex;
        align-items: center;
        &-list {
          display: flex;
          flex-wrap: wrap;
        }
        &-item {
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          background-color: @color-white;
          height: 20px;
          padding: 0 6px;
          border-radius: 2px;
          border: 1px solid @color-primary;
          color: @color-primary;
          margin-right: 4px;
        }
      }
      & > span {
        height: 42px;
        line-height: 42px;
        &:first-child {
          width: 60px;
        }
        &:last-child {
          flex: 1;
        }
        &.red {
          // font-size: 16px;
          // color: @color-red;
        }
        &.total {
          font-size: 18px;
          font-weight: 700;
          color: @color-red;
        }
      }
    }
  }

  .desc-form {
    margin-top: 10px;
  }
}
</style>
