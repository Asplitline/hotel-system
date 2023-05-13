<template>
  <div class="home-container">
    <!-- <div class="home-text">name: {{ name }}</div> -->
    <!-- <el-row :gutter="20" class="panel-group"> -->
    <el-row :gutter="20" class="panel-group">
      <el-col :span="6" class="panel-card">
        <div class="panel-card__item" @click="goto('category')">
          <div class="panel-card__item--left">
            <span class="title">商品数量</span>
            <span class="number">{{ info.goosNumber }}</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="panel-card">
        <div class="panel-card__item" @click="goto('item')">
          <div class="panel-card__item--left">
            <span class="title">商品订单销量</span>
            <span class="number">{{ info.goodsOrderNumber }}</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="panel-card">
        <div class="panel-card__item" @click="goto('comment')">
          <div class="panel-card__item--left">
            <span class="title">电影数量</span>
            <span class="number">{{ info.movieNumber }}</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-ticket" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="6" class="panel-card">
        <div class="panel-card__item" @click="goto('reply')">
          <div class="panel-card__item--left">
            <span class="number">{{ info.donateNum }}</span>
            <span class="title">捐献</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-heartbeat" aria-hidden="true"></i>
          </div>
        </div>
      </el-col> -->
      <el-col :span="6" class="panel-card">
        <div class="panel-card__item" @click="goto('auser')">
          <div class="panel-card__item--left">
            <span class="title">电影订单数量</span>
            <span class="number">{{ info.movieOrdersNumber }}</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-ticket" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="panel-group">
      <el-card>
        <div ref="chart" class="bar-chart" :style="{ height: '400px' }"></div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

import _api from '@api'

export default {
  name: 'Home',
  data() {
    return {
      info: {},
      option: {
        xAxis: {
          type: 'category',
          data: ['商品数量', '商品订单销量', '电影数量', '电影订单数量']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000'
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ]
      }
    }
  },
  methods: {
    async fetchInfo() {
      const data = await _api.getStatisticInfo2()
      this.info = data
    },
    goto(name) {
      this.$router.push({ name })
    },
    initChart() {
      const myChart = echarts.init(this.$refs.chart)
      this.option.series[0].data = [
        { value: this.info.goosNumber, itemStyle: { color: '#73c0de' } },
        { value: this.info.goodsOrderNumber, itemStyle: { color: '#5470c6' } },
        { value: this.info.movieNumber, itemStyle: { color: '#91cc75' } },
        { value: this.info.movieOrdersNumber, itemStyle: { color: '#fac858' } }
      ]
      myChart.setOption(this.option)
    }
  },
  async mounted() {
    await this.fetchInfo()
    this.initChart()
  }
}
</script>

<style lang="less" scoped>
.home {
  &-container {
    margin: 30px;
  }
}
.panel {
  .bar-chart {
    height: 400px;
  }
  &-group {
    /* background-color: #f0f0f0; */
  }
  &-card {
    transition: all 0.5s;
    &__item {
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-radius: 0.625rem;
      width: 100%;
      /* height: 108px; */
      padding: 30px 0;
      margin-bottom: 20px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      border-color: rgba(0, 0, 0, 0.05);
      transition: all 0.5s;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      /* justify-content: center; */
      &--left {
        flex: 3;
        display: flex;
        flex-direction: column;
        .number {
          font-size: 2.375rem;
          font-weight: 700;
          line-height: 1.65857;
        }
        .title {
          font-size: 1.125rem;
          color: #bab8b8;
        }
      }
      &--right {
        flex: 2;
        .fa {
          font-size: 3.75rem;
        }
      }
    }
    &:hover {
      transform: translateY(4px);
    }
  }
}
</style>
