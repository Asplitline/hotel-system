<template>
  <div class="my-order">
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="movieId" label="电影名称" min-width="150">
        <template v-slot="{ row }">
          {{ (row.movie && row.movie.title) || '已删除' }}
        </template>
      </el-table-column>
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
      <el-table-column prop="extend3" label="电影评分" min-width="80">
        <template v-slot="{ row }">
          {{ !row.extend3 ? '暂未评分' : `${row.extend3}分` }}
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
          {{ row.refundDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{ row }">
          <el-link type="danger" @click="deleteById(deleteMovieOrders, fetchMovieOrders, row.orderId, '删除订单')"> 删除订单</el-link>
          <el-link type="primary" @click="showDialog(row)"> 评分/退票</el-link>
        </template>
      </el-table-column>
    </el-table>

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
        <div class="my-rate">
          <el-rate v-model="rate" :max="10" score-template="{value}" v-if="isRate" allow-half></el-rate>
          <span>{{ rate || 0 }} 分</span>
        </div>
        <div class="return-ticket">
          <template v-if="!isCheck">
            <el-input v-model="reason" placeholder="请入退票原因"></el-input>
          </template>
          <template v-else>
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
          </template>
        </div>
        <div class="my-btn">
          <button class="btn-movie offline" @click="returnTicket" :class="{ disabled: isCheck }">申请退票</button>
          <button class="btn-movie" :class="{ disabled: !isRate }" @click="fillScore">确认评分</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _api from '@api'
import { hMixin } from '@mixins'
import { ticketState, checkState } from '@static'
import { deepClone, bindIMG } from '@utils'

import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    id: {
      type: Number
    }
  },
  mixins: [hMixin],
  data() {
    return {
      checkState,
      tableData: [],
      ticketState,
      currentItem: {},
      dialogVisible: false,
      rate: 0,
      isRate: true,
      reason: '',
      isCheck: false,
      currentCheck: {}
    }
  },
  methods: {
    bindIMG,
    ...mapActions(['fetchAllMovie', 'fetchAllDonate']),
    deleteMovieOrders: _api.deleteMovieOrders,
    async fetchMovieOrders() {
      const { total, list } = await _api.getMovieOrdersList({ size: 999 })
      console.log('list: ', list)
      this.total = total
      this.tableData = list
        .map((i) => {
          const movie = this.getMovieById(i.movieId)
          return {
            ...i,
            movie
          }
        })
        .filter((i) => i.extend1 === String(this.currentUser.id))
    },
    async handleOrder(i, status) {
      const { success } = await _api.editGoodsOrder({ id: i.id, status })
      success && this.fetchOrder()
    },
    showDialog(row) {
      this.dialogVisible = true
      this.currentItem = deepClone(row)
      this.rate = row.extend3
      this.isRate = !row.extend3
      const index = this.allDonate.findIndex((i) => i.source === row.orderId)
      this.isCheck = index !== -1
      this.currentCheck = this.isCheck ? this.allDonate[index] : {}
    },
    async fillScore() {
      if (this.rate === 0) {
        return this.$message.error('请正确评分')
      }
      const { success } = await _api.editMovieOrders({ orderId: this.currentItem.orderId, extend3: this.rate })
      this.dialogVisible = false
      this.rate = 0
      this.handleSuccess(success, '评分', this.fetchMovieOrders)
    },
    async returnTicket() {
      if (this.reason.trim().length === 0) {
        return this.$message.error('请输退票原因')
      }
      const { success } = await _api.addDonate({
        source: this.currentItem.orderId,
        description: this.reason, // 退票原因
        state: 0
      })
      if (success) {
        this.dialogVisible = false
        this.reason = ''
        this.$message.success('申请成功，等待管理员审核~')
      }
    }
  },
  computed: {
    ...mapGetters(['getMovieById']),
    ...mapState(['allDonate', 'currentUser'])
  },
  async created() {
    await this.fetchAllMovie()
    await this.fetchAllDonate()
    this.fetchMovieOrders()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.el-pagination {
  margin-top: 10px;
}
.el-link {
  margin-right: 10px;
}
.t-pagination {
  margin-top: 20px;
  text-align: center;
}

.seat-index {
  margin-bottom: 4px;
  margin-right: 4px;
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

.my-rate {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
}

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
</style>
