<template>
  <!-- todo infiniteScroll -->
  <ul class="room-list">
    <!-- {{roomList}} -->
    <template v-if="roomList.length!==0">
      <li class="room-item" v-for="item in roomList" :key="item.id">
        <a href="javascript:;" @click="goHotelDetail(item)">
          <img :src="item.url" alt="">
          <p class="r-title">{{item.name}}</p>
          <div class="r-info">
            <span class="r-type">{{item.category.name}}</span>
            <span class="r-price">{{item.price | $}}</span>
            <span class="r-floor">{{item.number | floor}}</span>
          </div>
        </a>
      </li>
      <li class="room-item hidden-vs" v-for="index in blankNum" :key="index"></li>
    </template>
    <template v-else>
      <div class="not-found">暂无房间信息</div>
    </template>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'room-list',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      roomList: []
    }
  },
  methods: {
    ...mapMutations(['setCurrentHotel']),
    goHotelDetail(data) {
      this.setCurrentHotel(data)
      this.$router.push({ name: 'hotel-detail', params: { id: data.id } })
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
  /* note  parent -> children (async data) #1
   * children -> watch data
   */
  watch: {
    data(val) {
      this.roomList = val
    }
  },
  /* ques [√]data [x]roomList
   */
  created() {
    this.roomList = this.data
  }
  // updated() {
  //   console.log(123)
  // }
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
        height: 170px;
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
