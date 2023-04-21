<template>
  <div class="shop">
    <el-container class="container">
      <el-header class="header">
        <search v-model="keyWord" @s-click="handleKeyword()" @s-clear="handleClear()" />
      </el-header>
      <el-container class="main">
        <el-main>
          <div class="main-header">
            <shop-nav :data="item" v-for="item in categories" :key="item.id" @h-tag="handleTag" :active="active" />
          </div>
          <div class="main-content">
            <item-list :data="fItem" v-if="fItem" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import search from '../common/Search'
import shopNav from './ShopNav'
import itemList from './ItemList'
import { priceList, floorList } from '@static'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    search,
    shopNav,
    // shopTag,
    itemList
  },
  data() {
    return {
      priceList,
      floorList,
      item: null,
      initNum: 8,
      keyWord: null,
      hasSearch: false,
      active: ''
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory', 'fetchAllUser']), // 映射 vuex 中的 action
    async fetchItem() {
      // 异步获取数据
      const { data } = await _api.getItem() // 使用 api 模块获取数据
      this.item = data // 更新 item 数组
    },
    handleTag(val) {
      // 处理标签选中事件
      console.log(val) // 打印选中的标签
      this.active = val // 更新 active 变量
    },
    handleTagClose({ index }) {
      // 处理标签关闭事件
      this.$set(this.tagArr, index, -1) // 将对应索引位置的 tagArr 数组元素设置为 -1
    },
    handleKeyword() {
      // 处理搜索关键词
      this.hasSearch = true // 将 hasSearch 变量设置为 true
      this.active = '' // 将 active 变量设置为空字符串
    },
    handleClear() {
      // 处理搜索清空事件
      this.hasSearch = false // 将 hasSearch 变量设置为 false
      this.keyWord = null // 将 keyWord 变量设置为 null
    }
  },
  computed: {
    ...mapGetters([
      'getCategoryById', // 映射 vuex 中的 getter
      'getMiniCategory',
      'getUserById',
      'getRoomById'
    ]),
    fItem() {
      // 处理过滤后的 item 数组
      if (this.hasSearch) {
        // 如果正在搜索
        return this.item.filter(
          (i) => i.name.indexOf(this.keyWord?.trim()) !== -1 // 根据关键词过滤 item 数组
        )
      } else {
        // 如果没有搜索
        return this.active === '' // 如果没有选中标签
          ? this.item // 返回原始的 item 数组
          : this.item.filter((i) => i.type === this.active) // 根据选中的标签过滤 item 数组
      }
    },
    categories() {
      // 获取分类列表
      const parent = this.getMiniCategory().filter((i) => i.pid == null) // 获取父分类
      return parent
        .map((i) => {
          const children = this.getMiniCategory().filter((j) => j.pid === i.id) // 获取子分类
          return {
            ...i,
            children
          }
        })
        .filter((i) => i.children.length) // 过滤没有子分类的父分类
    }
  },
  mounted() {
    this.fetchAllUser() // 获取所有用户
    this.fetchAllCategory() // 获取所有分类
    this.fetchItem() // 获取 item 数据
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
    padding: 10px;
    border: 1px solid #c6c6c6;
    .shop-tag {
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
