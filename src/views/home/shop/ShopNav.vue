<template>
  <div class="hotel-nav">
    <dl class="nav-item">
      <dt class="nav-info">{{ data.name }}</dt>
      <dd v-for="item in data.children" :key="item.id" class="nav-bd" :class="{ active: active === item.id }" @click="setActive(item.id)">
        <a href="javascript:;">{{ item.name }}</a>
        <i class="el-icon-circle-close close-btn" @click.stop="setActive('')"></i>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    active: {
      type: String
    }
  },
  methods: {
    // 设置激活标签
    setActive(idx) {
      this.$emit('h-tag', idx)
    }
  },
  // 监听异步数据变化
  watch: {
    data(val) {
      this.list = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.nav-item {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 4px 0;
  .nav-info {
    display: inline-block;
    padding: 6px 16px;
    color: @color-main;
    letter-spacing: 4px;
    align-self: stretch;
    height: 100%;
  }

  .nav-bd {
    display: inline-block;
    padding: 6px 16px;
    border: 1px solid transparent;
    letter-spacing: 2px;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &:hover {
      a {
        color: @color-main;
      }
    }
    .close-btn {
      position: absolute;
      right: -6px;
      top: 0;
      cursor: pointer;
      color: @color-red;
      font-size: 20px;
      &:hover {
        opacity: 0.8;
      }
    }
    &.active {
      // border-color: @color-main;
      position: relative;
      a {
        color: @color-main;
      }
    }
  }
}
</style>
