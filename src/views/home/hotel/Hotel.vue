<template>
  <div class="hotel">
    <el-container class="container">
      <el-header class="header">
        <search />
      </el-header>
      <el-container class="main">
        <el-main>
          <div class="main-header">
            <hotel-nav :data="roomType" text="房间类型" @h-tag="handleTag()" :flag="0" />
            <hotel-nav :data="priceList" text="价格范围" @h-tag="handleTag()" :flag="1" />
            <hotel-nav :data="floorList" text="楼层选择" @h-tag="handleTag()" :flag="2" />
            <hotel-tag />
          </div>
          <div class="main-content">
            <room-list :data="room" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import search from '../common/Search'
import hotelNav from './HotelNav'
import hotelTag from './HotelTag'
import roomList from './RoomList'
import { room } from '@mock'
import { roomType, priceList, floorList } from '@static'
export default {
  name: 'hotel',
  components: {
    search,
    hotelNav,
    hotelTag,
    roomList
  },
  data() {
    return {
      roomType,
      priceList,
      floorList,
      arrayTag: [{}],
      room
    }
  },
  methods: {
    handleTag(val) {
      // this.push()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.header {
  height: 100%;
  padding: 0 30%;
}
.main {
  padding: 0;
  .main-header {
    padding: 30px;
    border: 1px solid #000;
    .hotel-tag {
      border-top: 1px solid #eee;
      padding: 20px 20px 0;
    }
  }
  .main-content {
    margin-top: 10px;
    padding: 30px 10px;
    border: 1px solid #000;
  }
}
</style>
