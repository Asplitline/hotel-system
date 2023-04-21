<template>
  <div class="home-container">
    <!-- <div class="home-text">name: {{ name }}</div> -->
    <!-- <el-row :gutter="20" class="panel-group"> -->
    <el-row :gutter="20" class="panel-group">
      <el-col :span="4" class="panel-card">
        <div class="panel-card__item" @click="goto('category')">
          <div class="panel-card__item--left">
            <span class="number">{{ info.goodsLxNum }}</span>
            <span class="title">分类</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-tag" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="panel-card">
        <div class="panel-card__item" @click="goto('item')">
          <div class="panel-card__item--left">
            <span class="number">{{ info.goodsNum }}</span>
            <span class="title">商品</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="panel-card">
        <div class="panel-card__item" @click="goto('comment')">
          <div class="panel-card__item--left">
            <span class="number">{{ info.userNum }}</span>
            <span class="title">用户</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-user" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="panel-card">
        <div class="panel-card__item" @click="goto('reply')">
          <div class="panel-card__item--left">
            <span class="number">{{ info.donateNum }}</span>
            <span class="title">捐献</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-heartbeat" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="panel-card">
        <div class="panel-card__item" @click="goto('auser')">
          <div class="panel-card__item--left">
            <span class="number">{{ info.orderNum }}</span>
            <span class="title">订单</span>
          </div>
          <div class="panel-card__item--right">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="panel-group"> </el-row>
  </div>
</template>

<script>
import _api from '@api'
export default {
  name: 'Home',
  data() {
    return {
      info: {}
    }
  },
  methods: {
    // 定义异步函数fetchInfo，通过调用_api.getStatisticInfo()获取数据，将结果保存在this.info中
    async fetchInfo() {
      const data = await _api.getStatisticInfo()
      console.log(data)
      this.info = data
    },
    // 定义goto函数，接收一个name参数，通过路由进行页面跳转
    goto(name) {
      this.$router.push({ name })
    }
  },
  // 在mounted钩子函数中调用fetchInfo函数，获取页面需要展示的数据
  mounted() {
    this.fetchInfo()
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
