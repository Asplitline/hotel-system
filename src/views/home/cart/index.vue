<template>
  <div class="cart">
    <template v-if="myCart.length">
      <div class="cart-title">我的购物车</div>
      <div class="cart-tb">
        <el-row class="cart-bd" v-for="i in myCartList" :key="i.id">
          <el-col :span="5" class="cart-col goods">
            <img :src="bindIMG(i.goods.url)" alt="" />
          </el-col>
          <el-col :span="8" class="cart-col info">
            <p class="goods-title">{{ i.goods.name }}</p>
            <p class="goods-desc">{{ i.goods.description }}</p>
          </el-col>
          <el-col :span="5" class="cart-col price"
            ><span>{{ i.goods.price | $ }}</span>
          </el-col>
          <el-col :span="6" class="cart-col handle">
            <el-popconfirm title="是否要将商品从购物车中移出？" @confirm="removeCart(i)">
              <a href="javascript:;" class="link-del" slot="reference">移出购物车</a>
            </el-popconfirm>
            <el-popconfirm title="是否要购买商品" @confirm="purchaseGoods(i)">
              <a href="javascript:;" class="link-add" slot="reference">购买</a>
            </el-popconfirm>
          </el-col>
        </el-row>
      </div>

      <div class="cart-tool">
        <el-popconfirm title="确定要清空购物车吗？" @confirm="clearShopCar" style="margin-right: auto">
          <a href="javascript:;" class="cart-clear" slot="reference">清空购物车</a>
        </el-popconfirm>

        <div class="cart-total">
          <p class="cart-total__p">
            共 <span class="num">{{ totalNum }}</span> 件商品
          </p>
          <p class="cart-total__p">
            <span class="price">{{ totalPrice | $ }}</span>
          </p>
        </div>
        <el-popconfirm title="是否要购买商品" @confirm="purchaseAll">
          <button class="btn-all" :class="{ disabled: totalNum === 0 }" slot="reference">立即购买</button>
        </el-popconfirm>
      </div>
    </template>

    <el-empty class="md-empty" v-else>
      <template #description>
        <p>购物车为空</p>
        <router-link :to="{ name: 'Shop' }" style="color: red; margin-left: 4px">前往商城 </router-link>
      </template>
    </el-empty>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { bindIMG } from '@utils'
import _api from '@api'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['myCart']), // 将 myCart 映射为组件的计算属性
    ...mapGetters(['getItemById']), // 将 getItemById 映射为组件的计算属性
    totalPrice() {
      // 计算购物车中所有商品的总价
      return (
        this.myCartList &&
        this.myCartList.reduce((pre, nxt) => {
          return pre + nxt.goods.price
        }, 0)
      )
    },
    totalNum() {
      // 计算购物车中所有商品的总数量
      return this.myCartList.length
    },
    myCartList() {
      // 将 myCart 数组中的每个元素转化为一个包含商品详情的对象
      return this.myCart.map((i) => {
        const goods = this.getItemById(i.goodsId) // 通过商品ID获取商品详情
        return {
          ...i,
          goods
        }
      })
    }
  },
  methods: {
    ...mapActions(['fetchMyCart', 'fetchAllItem']), // 将 fetchMyCart 和 fetchAllItem 映射为组件的方法
    bindIMG, // 组件中的方法
    async removeCart(item) {
      // 从购物车中删除指定商品
      console.log(item)
      const { success } = await _api.deleteShoppingCar(item.id) // 调用接口删除购物车中的商品
      success && this.fetchData() // 成功删除后重新获取购物车信息
    },
    handleGoods(i) {
      // 将购物车中的商品转化为订单商品格式
      return {
        createTime: Date.now(),
        goodsId: i.goods.id,
        goodsName: i.goods.name,
        num: 1,
        price: i.goods.price,
        status: 0,
        updateTime: Date.now(),
        userId: i.userId
      }
    },
    async purchaseGoods(i) {
      // 购买指定商品
      const { success } = await _api.addGoodsOrder(this.handleGoods(i)) // 将商品转化为订单商品格式并调用接口生成订单
      success && this.removeCart(i) // 成功生成订单后从购物车中删除该商品
      success && this.fetchData() // 成功生成订单后重新获取购物车信息
    },
    async purchaseAll() {
      // 购买购物车中所有商品
      const cartList = []
      this.myCartList.forEach((i) => {
        cartList.push(this.handleGoods(i)) // 将购物车中的商品转化为订单商品格式
      })
      const { success } = await _api.addGoodsOrderList(cartList) // 将订单商品列表调用接口生成订单
      success && this.clearShopCar() // 成功生成订单后清空购物车
    },
    async clearShopCar() {
      // 清空购物车
      const ids = this.myCartList.map((i) => i.id) // 获取购物车中所有商品的ID
      const { success } = await _api.deleteShoppingCarList(ids) // 调用接口删除购物车中的所有商品
      success && this.fetchData() // 成功删除后重新获取购物车信息
    },
    fetchData() {
      // 获取所有商品信息
      this.fetchAllItem()
      this.fetchMyCart()
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.cart-title {
  letter-spacing: 4px;
  font-size: 30px;
  padding-bottom: 20px;
  color: @color-red;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.cart-tb {
  padding: 0 10px;
  .cart-col {
    padding: 20px 0;
    img {
      width: 80%;
      margin: 0 auto;
    }
    &.goods {
      display: flex;
    }
    &.info {
      padding-right: 40px;
      p {
        margin: 0;
      }
      .goods-title {
        font-size: 20px;
        &:hover {
          color: @color-red;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .goods-desc {
        margin-top: 20px;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 1px;
        color: #444;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    &.price {
      display: flex;
      justify-content: center;
      height: 100%;
      span {
        color: @color-red;
        font-size: 24px;
      }
    }
    &.handle {
      display: flex;
      align-items: center;
      justify-content: space-around;
      [class^='link-'] {
        display: inline-block;
        font-size: 16px;
        background-color: @color-red;
        padding: 6px 16px;
        color: #fff;
        border-radius: 1px;
        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }
      }
      .link-del {
        background-color: #ffa133;
      }
    }
  }
}
.cart-tool {
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 70px;
  background-color: #f7f7f7;
  .cart-clear {
    color: @color-red;
    margin-right: auto;
    &:hover {
      text-decoration: underline;
    }
  }
  .cart-total {
    display: flex;
    align-items: center;
    &__p {
      display: flex;
      align-items: center;
      height: 40px;
      margin: 0;
      margin-right: 30px;
      span {
        color: @color-red;
        font-size: 16px;
        margin: 0 4px;
      }
      .num {
        font-size: 20px;
      }
      .price {
        font-size: 24px;
      }
    }
  }
  .btn-all {
    border: none;
    height: 70px;
    line-height: 70px;
    background-color: @color-red;
    padding: 0 20px;
    color: #fff;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
}
</style>
