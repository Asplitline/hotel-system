<template>
  <div class="hotel-nav">
    <dl class="nav-item">
      <dt class="nav-info">{{text}}</dt>
      <dt class="nav-td" :class="{'active':active===9999}" @click="setActive()"><a
          href="javascript:;">不限</a>
      </dt>
      <dd v-for="item in list" :key="item.id" class="nav-bd"
        :class="{'active':active===item.id}" @click="setActive(item.id)"><a
          href="javascript:;">{{item.name}}</a>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'hotel-nav',
  props: {
    data: {
      type: Array
    },
    text: {
      type: String
    },
    name: {
      type: Number
    }
  },
  data() {
    return {
      list: [],
      active: 9999
    }
  },
  methods: {
    setActive(index = 9999) {
      this.active = index
      this.$emit('h-tag', { id: this.id, name: index })
    }
  },
  // tag async-data
  watch: {
    data(val) {
      this.list = val
      console.log(val)
    }
  },
  created() {
    // tag sync-data
    this.list = this.data
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.nav-item {
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  .nav-info {
    display: inline-block;
    padding: 6px 16px;
    color: @color-main;
    letter-spacing: 4px;
  }
  .nav-td,
  .nav-bd {
    display: inline-block;
    padding: 6px 16px;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &:hover {
      background-color: rgba(@color-main, 0.2);
      a {
        color: #666;
      }
    }
    &.active {
      background-color: @color-main;
      a {
        color: #fff;
      }
    }
  }
}
</style>
