<template>
  <div class="hotel">
    <el-container class="container">
      <el-header class="header">
        <search />
      </el-header>
      <el-container class="main">
        <el-main>
          <div class="main-header">
            <hotel-nav :data="getMiniCategory()" text="房间类型" @h-tag="handleTag()"
              :flag="0" />
            <hotel-nav :data="priceList" text="价格范围" @h-tag="handleTag()" :flag="1" />
            <hotel-nav :data="floorList" text="楼层选择" @h-tag="handleTag()" :flag="2" />
            <!-- todo : no idea -->
            <hotel-tag />
          </div>
          <div class="main-content">
            <!-- note  parent -> children (async data) #2
                 parent -> v-if  exist?data
                 reason# parent updated
             -->
            <room-list :data="room" v-if="room" />
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
// import { room } from '@mock'
import { priceList, floorList } from '@static'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
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
      priceList,
      floorList,
      arrayTag: [{}],
      room: null,
      initNum: 8
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory']),
    async fetchRoom() {
      const { list } = await _api.getRoomList({ size: 999 })
      list.forEach((item) => {
        item.category = this.getCategoryById(item.lx)
      })
      this.room = list
    },
    handleTag(val) {
      // this.push()
    }
  },
  computed: {
    ...mapGetters(['getCategoryById', 'getMiniCategory'])
  },
  created() {
    this.fetchRoom()
    this.fetchAllCategory()
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
