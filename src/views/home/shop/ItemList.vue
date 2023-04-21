<template>
  <!-- todo infiniteScroll -->
  <ul class="item-list">
    <template v-if="itemList.length !== 0">
      <li class="item-item" v-for="item in itemList" :key="item.id">
        <div class="item-cover">
          <img :src="bindIMG(item.url)" alt="" class="img" @click="goItemDetail(item)" />
        </div>
        <h2 class="i-title" @click="goItemDetail(item)">{{ item.name }}</h2>
        <div class="item-footer">
          <p class="i-price">
            {{ item.price | $ }}
          </p>
          <button class="add-cart">
            <el-popconfirm title="确定要添加商品到购物车吗？" @confirm="handleAddCart(item)">
              <i class="iconfont icon-iconfontcart" slot="reference"></i>
            </el-popconfirm>
          </button>
        </div>
      </li>
      <li class="item-item hidden-vs" v-for="index in blankNum" :key="index"></li>
    </template>
    <template v-else>
      <div class="not-found">暂无商品信息</div>
    </template>
  </ul>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { bindIMG } from '@utils'
import { floorList } from '@static'
import _api from '@api'
export default {
  name: 'item-list',
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
      itemList: []
    }
  },
  methods: {
    ...mapMutations(['setCurrentItem', 'addCart']), // 将 setCurrentItem 和 addCart 映射到组件中，使得可以在组件内调用
    ...mapActions(['fetchMyCart']), // 将 fetchMyCart 映射到组件中，使得可以在组件内调用
    bindIMG, // 绑定图片的方法
    async handleAddCart(item) {
      // 处理加入购物车的方法
      const { success } = await _api.addShoppingCar({
        // 发送请求给服务器，将商品加入购物车
        createTime: Date.now(),
        goodsId: item.id,
        type: 0,
        updateTime: Date.now(),
        userId: this.currentUser.id
      })
      this.$notify({
        // 提示用户加入购物车的结果
        title: '购物车',
        type: success ? 'success' : 'danger',
        message: success ? '添加成功! ' : '添加失败! '
      })
      success && this.fetchMyCart() // 如果加入成功，则刷新购物车列表
    },
    goItemDetail(data) {
      // 进入商品详情页的方法
      this.setCurrentItem(data) // 将当前商品设置为被点击的商品
      this.$router.push({ name: 'ShopDetail', params: { id: data.id } }) // 跳转到商品详情页
    },
    getLevelName(str) {
      // 获取等级名称的方法
      const lv = Number(str[0]) - 1
      return floorList[lv].name // 根据等级获取名称
    }
  },
  computed: {
    ...mapState(['currentUser']), // 将 currentUser 映射到组件中，使得可以在组件内使用
    totalNum() {
      // 计算商品总数的方法
      return this.itemList.length
    },
    blankNum() {
      // 计算空白占位商品数量的方法
      return this.totalNum % 4 === 0 ? 0 : 4 - (this.totalNum % 4)
    }
  },
  watch: {
    data(val) {
      // 监听 data 的变化
      this.itemList = val // 将 data 中的数据赋值给 itemList
    }
  },
  created() {
    // 在组件被创建时执行
    this.itemList = this.data // 将 data 中的数据赋值给 itemList
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.item-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .item-item {
    width: 22%;
    box-sizing: border-box;
    // height: 240px;
    border: 1px solid #e8e8e8;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    transition: all 0.3s linear;
    display: inline-block;
    height: 350px;
    margin-right: 4%;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .item-cover {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s linear;
      &:hover {
        cursor: pointer;
        transform: translateY(-10px);
      }
      .img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    .i-title {
      font-weight: normal;
      font-size: 18px;
      width: 195px;
      height: 48px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; /*弹性伸缩盒子模型*/
      -webkit-box-orient: vertical; /*伸缩盒子子排列方式*/
      -webkit-line-clamp: 2; /*设置显示文本行数*/
      &:hover {
        text-decoration: underline;
        color: @color-red;
      }
    }
    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .i-price {
        font-size: 20px;
        position: relative;
        letter-spacing: 2px;
        color: #c91523;
        margin: 0;
        flex: 1;
      }
      .add-cart {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        outline: none;
        border: none;
        background-color: @color-red;
        border-radius: 2px;
        transition: transform 0.1s linear;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
        .iconfont {
          font-size: 20px;
          color: #fff;
        }
      }
    }
    // &:hover {
    // 	border-color: #c8c8c8;
    // 	transform: translateY(4px);
    // 	box-shadow: 0px 0px 4px 2px rgba(102, 102, 102, 0.2);
    // 	cursor: pointer;
    // }
  }
}
</style>
