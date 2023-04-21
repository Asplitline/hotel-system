<template>
  <div class="index">
    <div class="banner">
      <el-carousel trigger="click" height="510px" :autoplay="autoplay">
        <el-carousel-item v-for="item in list" :key="item.id">
          <img class="banner-img" :src="bindIMG(item.filePath)" alt="" @click="showNotice(item)" />
          <div class="mask">
            <p>{{ item.originalFileName }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <goodsList :data="goods" :info="i" v-for="i in baseInfo" :key="i.index" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" class="notice-dialog" @close="handleNotice()">
      <h2>{{ currentNotice.originalFileName }}</h2>
      <p>{{ currentNotice.fullFilePath }}</p>
    </el-dialog>
  </div>
</template>

<script>
import goodsList from './GoodsList'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
import { bindIMG } from '@utils'
export default {
  components: {
    goodsList
    // search
  },
  data() {
    return {
      // 首页轮播图列表
      list: [],
      // 商品列表
      goods: [],
      // 是否显示通知弹窗
      dialogVisible: false,
      // 是否自动播放轮播图
      autoplay: true,
      // 当前通知内容
      currentNotice: {},
      // 基础信息栏目列表
      baseInfo: [
        { title: '品牌上新', icon: 'icon-new', index: 1 },
        { title: '热卖商品', icon: 'icon-fire', index: 2 }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory', 'fetchAllRoom']),
    bindIMG,
    // 获取商品列表
    async fetchGoods() {
      const { data } = await _api.getItem()
      this.goods = data.slice(0, 12)
    },
    // 获取首页轮播图列表
    async fetchShopFile() {
      const { data } = await _api.getShopFile()
      this.list = data.slice(0, 4)
    },
    // 显示通知弹窗
    showNotice(data) {
      this.autoplay = false
      this.dialogVisible = true
      this.currentNotice = data
    },
    // 关闭通知弹窗
    handleNotice() {
      this.autoplay = true
    }
  },
  computed: {
    ...mapGetters(['getCategoryById']),
    // 房间排序列表
    sortRoom() {
      return []
    }
  },
  created() {
    // 获取首页轮播图列表和商品列表
    this.fetchShopFile()
    this.fetchGoods()
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
      object-fit: fill;
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
  // padding: 60px 0;
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
