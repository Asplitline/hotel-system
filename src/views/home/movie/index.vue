<template>
  <div class="shop">
    <el-container class="container">
      <el-header class="header">
        <search v-model="keyWord" text="请输入电影名称..." @s-click="handleKeyword()" @s-clear="handleClear()" />
      </el-header>
      <el-container class="main">
        <el-main>
          <div class="main-header">
            <movie-nav :data="item" v-for="item in movieCategory" :key="item.id" @h-tag="handleTag" :active="active" />
            <movie-nav :data="item" v-for="item in movieStateList" :key="item.id" @h-tag="handleStateTag" :active="stateActive" />
          </div>
          <div class="main-content">
            <item-list :data="fMovie" v-if="fMovie" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import _api from '@api'
import { floorList, priceList, movieState } from '@static'
import { mapActions, mapGetters } from 'vuex'
import search from '../common/Search'
import itemList from './ItemList'
import MovieNav from './MovieNav.vue'
export default {
  components: {
    search,
    MovieNav,
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
      active: '',
      stateActive: 1
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory']),
    async fetchMovie() {
      const { data } = await _api.getMovie()
      this.item = data.map((i) => {
        const category = this.getCategoryById(i.genre) || { name: '未知' }
        return {
          ...i,
          category
        }
      })
    },
    handleTag(val) {
      console.log(val)
      this.active = val
    },
    handleStateTag(val) {
      this.stateActive = val
    },
    handleTagClose({ index }) {
      this.$set(this.tagArr, index, -1)
    },
    handleKeyword() {
      this.hasSearch = true
      this.active = ''
      this.stateActive = ''
    },
    handleClear() {
      this.hasSearch = false
      this.keyWord = null
    }
  },
  computed: {
    ...mapGetters(['getCategoryById', 'movieCategory']),
    movieStateList() {
      const children = movieState.map((i) => ({ name: i.label, id: i.value }))
      return [
        {
          name: '电影状态',
          children
        }
      ]
    },
    fMovie() {
      let result = []
      if (this.hasSearch) {
        return this.item.filter((i) => i.title?.indexOf(this.keyWord?.trim()) !== -1)
      } else {
        if (this.active === '') {
          result = this.item
        } else {
          result = this.item.filter((i) => i.genre === this.active) || []
        }
        if (this.stateActive === '') {
          return result
        } else {
          return result?.filter((i) => i.status === this.stateActive)
        }
      }
    }
  },
  async mounted() {
    await this.fetchAllCategory()
    this.fetchMovie()
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
