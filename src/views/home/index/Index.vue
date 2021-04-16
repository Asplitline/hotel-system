<template>
  <div class="index">
    <!-- <div class="header">
      <search />
    </div> -->
    <div class="banner">
      <el-carousel trigger="click" height="510px" :autoplay="autoplay">
        <el-carousel-item v-for="item in list" :key="item.id">
          <img :src="item.url" alt="" @click="showNotice(item)">
          <div class="mask">
            <p>{{item.title}}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <hotelList :data="sortRoom" :floor="index" v-for="index in 4" :key="index" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" class="notice-dialog"
      @close="handleNotice()">
      <h2>{{currentNotice.title}}</h2>
      <p>{{currentNotice.comment}}</p>
    </el-dialog>
  </div>
</template>

<script>
// import { notice, room } from '@mock'
import hotelList from './HotelList'
// import search from '../common/Search'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
// import { mapActions } from 'vuex'
export default {
  components: {
    hotelList
    // search
  },
  data() {
    return {
      list: [],
      room: [],
      dialogVisible: false,
      autoplay: true,
      currentNotice: {}
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
    async fetchNotice() {
      const { list } = await _api.getNoticeList({ size: 4 })
      this.list = list
    },
    showNotice(data) {
      this.autoplay = false
      this.dialogVisible = true
      this.currentNotice = data
    },
    handleNotice() {
      this.autoplay = true
      // this.currentNotice = null
    }
  },
  computed: {
    ...mapGetters(['getCategoryById']),
    sortRoom() {
      const temp = this.room
      return temp.sort((a, b) => {
        return a.number - b.number
      })
    }
  },
  created() {
    this.fetchNotice()
    this.fetchRoom()
    this.fetchAllCategory()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.index {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  padding: 0 30% 4%;
}
.banner {
  .el-carousel__item {
    cursor: pointer;
    img {
      width: 1200px;
      height: auto;
    }
  }
  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    color: #f8f8f8;
    font-size: 20px;
    text-indent: 2em;
    letter-spacing: 0.5em;
  }
}
.main {
  flex: 1;
}

.notice-dialog {
  /deep/.el-dialog__body {
    padding: 0 20px 20px;
    h2 {
      font-size: 24px;
      font-weight: 400;
      padding-left: 20px;
      border-left: 3px solid @color-main;
    }
    p {
      background-color: #f8f8f8;
      padding: 30px;
      font-size: 16px;
      text-indent: 1em;
      line-height: 30px;
    }
  }
}
</style>
