<template>
  <div class="hotel-nav">
    <dl class="nav-item">
      <dt class="nav-info">{{text}}</dt>
      <dt class="nav-td" :class="{'active':active===9999}" @click="setActive()"><a
          href="javascript:;">全部</a>
      </dt>
      <dd v-for="item in list" :key="item.id" class="nav-bd"
        :class="{'active':active===item.id}" @click="setActive(item.id)">
        <a href="javascript:;">{{item.name}}</a>
      </dd>
      <!-- {{list}} -->
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
    flag: {
      type: Number
    },
    dActive: {
      type: Number
    }
  },
  data() {
    return {
      list: [],
      active: ''
    }
  },
  methods: {
    setActive(index = 9999) {
      this.active = index
      this.$emit('h-tag', { value: index, flag: this.flag })
    }
  },
  // tag async-data
  watch: {
    data(val) {
      this.list = val
    },
    dActive(val) {
      this.active = val
    }
  },
  computed: {
    // done #2 nav is valid
    // active: {
    //   set(val) {
    //     // this.active = val
    //   },
    //   get() {
    //     return this.dActive
    //   }
    // }
  },
  created() {
    // tag sync-data
    this.list = this.data
    /* ques #1 only the first nav is valid
     * other nav is invalid
     */
    // guess sync data dont trigger watch ?
    // done #1 no init active
    this.active = this.dActive
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
