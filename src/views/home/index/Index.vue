<template>
  <div class="index">
    <div class="header">
      <search />
    </div>
    <div class="banner">
      <el-carousel trigger="click" height="510px" :autoplay="false">
        <el-carousel-item v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <hotelList :data="sortRoom" :floor="index" v-for="index in 4" :key="index" />
    </div>
  </div>
</template>

<script>
import { notice, room } from '@mock'
import hotelList from './HotelList'
import search from '../common/Search'
export default {
  components: {
    hotelList,
    search
  },
  data() {
    return {
      list: notice,
      room
    }
  },
  computed: {
    sortRoom() {
      const temp = this.room
      return temp.sort((a, b) => {
        return a.number - b.number
      })
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.index {
  display: flex;
  flex-direction: column;
}
.header {
  padding: 0 30% 4%;
}
.banner {
  .el-carousel__item {
    img {
      width: 1200px;
      height: auto;
    }
  }
}
.main {
  flex: 1;
}
</style>
