<template>
  <div class="hotel">
    <el-container class="container">
      <el-header class="header">
        <search />
      </el-header>
      <el-container class="main">
        <el-main>
          <div class="main-header">
            <hotel-nav :data="getMiniCategory()" text="房间类型" @h-tag="handleTag" :flag="0"
              :d-active="tagArr[0]" />
            <hotel-nav :data=" priceList" text="价格范围" @h-tag="handleTag" :flag="1"
              :d-active="tagArr[1]" />
            <hotel-nav :data=" floorList" text="楼层选择" @h-tag="handleTag" :flag="2"
              :d-active="tagArr[2]" />
            <!-- todo : no idea -->
            <hotel-tag :data=" tagArr" :fArr="[getMiniCategory(),priceList,floorList]"
              @t-close="handleTagClose" />
          </div>
          <div class="main-content">
            <!-- note  parent -> children (async data) #2
                 parent -> v-if  exist?data
                 reason# parent updated
             -->
            <room-list :data="fRoom" v-if="fRoom" />
            <!-- {{fRoom()}} -->
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
      initNum: 8,
      tagArr: [9999, 9999, 9999]
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
      this.$set(this.tagArr, val.flag, val.value)
    },
    handleTagClose({ index }) {
      this.$set(this.tagArr, index, 9999)
    }
  },
  computed: {
    ...mapGetters(['getCategoryById', 'getMiniCategory']),
    fRoom() {
      // console.log(...this.tagArr)
      const [lx, price, floor] = [...this.tagArr]
      let data = this.room
      // 类型
      // console.log(lx, price, floor)
      if (lx !== 9999 && data) {
        data = data.filter(({ lx: iLx }) => iLx === lx)
      }
      // 价格范围
      if (price !== 9999 && data) {
        const { min, max } = this.priceList[price]
        data = data.filter(({ price }) => {
          return price > min && price < max
        })
      }
      // 楼层
      if (floor !== 9999 && data) {
        data = data.filter(({ number }) => {
          // console.log(item.number.substr(0, 1))
          return floor + 1 === Number(number.substr(0, 1))
        })
      }
      return data
    }
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
    border: 1px solid #c6c6c6;
    .hotel-tag {
      border-top: 1px solid #eee;
      padding: 20px 20px 0;
    }
  }
  .main-content {
    margin-top: 10px;
    padding: 30px 10px;
    border: 1px solid #c6c6c6;
  }
}
</style>
