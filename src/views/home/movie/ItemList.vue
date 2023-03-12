<template>
  <!-- todo infiniteScroll -->
  <ul class="item-list">
    <template v-if="itemList.length !== 0">
      <li class="item-item" v-for="item in itemList" :key="item.id">
        <div class="item-cover">
          <img :src="bindIMG(item.url)" alt="" class="img" />
          <div class="title">
            <span>{{ item.title }}</span>
            <span>8.6</span>
          </div>
          <ul class="cover-desc">
            <li>
              <span class="left">导演：</span><span class="right">{{ item.director }}</span>
            </li>
            <li>
              <span class="left">主演：</span><span class="right">{{ item.cast }}</span>
            </li>
            <li>
              <span class="left">类型：</span><span class="right">{{ item.category.name }}</span>
            </li>
            <li>
              <span class="left">地区：</span><span class="right">{{ item.country }}</span>
            </li>
            <li>
              <span class="left">语言：</span><span class="right">{{ item.language }}</span>
            </li>
            <li>
              <span class="left">片长：</span><span class="right">{{ item.duration }}分钟</span>
            </li>
          </ul>
        </div>
        <button class="btn-movie" v-if="item.status === 1" @click="goItemDetail(item)">
          选座购票
          <Icon size="20">
            <ArrowAltCircleRightRegular size="16"></ArrowAltCircleRightRegular>
          </Icon>
        </button>
        <button class="btn-movie pending" v-else-if="item.status === 0" @click="goItemDetail(item)">敬请期待</button>
        <button class="btn-movie offline" v-else @click="goItemDetail(item)">已下线</button>
      </li>
      <li class="item-item hidden-vs" v-for="index in blankNum" :key="index"></li>
    </template>
    <template v-else>
      <div class="not-found">暂无电影信息</div>
    </template>
  </ul>
</template>

<script>
import { floorList } from '@static'
import { bindIMG } from '@utils'
import { ArrowAltCircleRightRegular } from '@v2icons/fa'
// import { Icon } from '@v2icons/utils'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'item-list',
  components: {
    ArrowAltCircleRightRegular
    // Icon
  },
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
    ...mapMutations(['setCurrentItem']),
    bindIMG,
    goItemDetail(data) {
      this.setCurrentItem(data)
      try {
        this.$router.push({ name: 'MovieDetail', params: { id: data.id } })
      } catch (error) {
        console.log('error: ', error)
      }
    },
    getLevelName(str) {
      const lv = Number(str[0]) - 1
      return floorList[lv].name
    }
  },
  computed: {
    ...mapState(['currentUser']),
    totalNum() {
      return this.itemList.length
    },
    blankNum() {
      return this.totalNum % 4 === 0 ? 0 : 4 - (this.totalNum % 4)
    }
  },
  watch: {
    data(val) {
      this.itemList = val
    }
  },
  created() {
    this.itemList = this.data
    console.log('this.data: ', this.data)
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
    border: 1px solid #f6f6f6;
    margin-bottom: 20px;
    transition: all 0.3s linear;
    margin-right: 4%;
    display: flex;
    flex-direction: column;
    &:nth-child(4n) {
      margin-right: 0;
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
  }
}

.item-cover {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .title {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: @color-white;
    height: 60px;
    background: linear-gradient(to top, rgba(#000, 0.8), rgba(#000, 0));
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 16px 8px;
  }
  .img {
    // position: absolute;
    width: 100%;
    height: 100%;
  }
  .cover-desc {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #000;
    transform: translateY(-50px);
    transition: all 0.2s ease-out;
    opacity: 0;
    padding: 0 20px;
    box-sizing: border-box;
    li {
      display: flex;
    }
    span {
      line-height: 30px;
      display: inline-block;
      color: white;
      &.left {
        flex: 1;
        width: 60px;
        text-align: center;
      }
      &.right {
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  &:hover {
    cursor: pointer;
    .cover-desc {
      opacity: 0.7;
      transform: translateY(0px);
    }
  }
}
</style>
