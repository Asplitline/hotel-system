<template>
  <ul class="room-list">
    <li class="room-item" v-for="item in roomList" :key="item.id">
      <a href="javascript:;">
        <img :src="item.url" alt="">
        <p class="r-title">{{item.lx}}</p>
        <div class="r-info">
          <span class="r-type">{{item.lx}}</span>
          <span class="r-price">￥{{item.price}}.00</span>
          <span class="r-floor">{{item.number.toString().substr(0, 1)}}楼</span>
        </div>
      </a>
    </li>
    <li class="room-item hidden-vs" v-for="index in blankNum" :key="index"></li>
  </ul>
</template>

<script>
export default {
  name: 'room-list',
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      roomList: []
    }
  },
  computed: {
    totalNum() {
      return this.roomList.length
    },
    blankNum() {
      return this.totalNum % 4 === 0 ? 0 : 4 - (this.totalNum % 4)
    }
  },
  created() {
    this.roomList = this.data
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.room-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  .room-item {
    width: 250px;
    height: 240px;
    border: 1px solid #e8e8e8;
    transition: all 0.5 ease-in;
    margin-bottom: 20px;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
      }
    }
    &:hover {
      border-color: #c8c8c8;
      box-shadow: 0px 0px 4px 2px rgba(102, 102, 102, 0.2);
    }
    .r-title {
      margin: 0;
      font-size: 16px;
      text-align: center;
      color: #555;
      margin-bottom: 6px;
      letter-spacing: 0.1em;
      &:hover {
        color: @color-main;
      }
    }
    .r-info {
      text-align: center;
    }
    span[class^='r-'] {
      display: inline-block;
      // border: 1px solid #e8e8e8;
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
      box-sizing: border-box;
      margin-right: 4px;
      border-radius: 2px;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }
    }
    .r-type {
      background-color: @color-main;
      color: #fff;
    }
    .r-price {
      background-color: @color-red;
      color: #fff;
      &::first-letter {
        font-size: 13px;
      }
    }
    .r-floor {
      background-color: @color-green;
      color: #fff;
    }
  }
}
</style>
