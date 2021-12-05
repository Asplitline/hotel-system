<template>
  <div class="hotel-tag">
    <el-tag closable type="primary" effect="plain" v-for="item in tags" :key="item.index"
      @close="closeTag(item)">
      <!-- {{item}} -->
      {{item.name}}
      <!-- {{item.arr[flag]}} -->
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    fArr: {
      type: Array
    }
  },
  computed: {
    tags() {
      const [lx, price, floor] = this.data
      const [lxArr, priceArr, floorArr] = this.fArr
      return [
        { flag: lx, index: 0, name: this.filterArr(lxArr, lx) },
        { flag: price, index: 1, name: this.filterArr(priceArr, price) },
        { flag: floor, index: 2, name: this.filterArr(floorArr, floor) }
      ]
    }
  },
  methods: {
    filterArr(arr, id) {
      const temp = arr.filter((item) => item.id === id)
      const [res] = [...temp]
      return res ? res.name : '全部'
    },
    closeTag(val) {
      this.$emit('t-close', val)
    }
  },
  created() {
    console.log(this.fArr)
    console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.el-tag {
  border-radius: 0;
  padding-bottom: 0;
  margin-right: 10px;
  border: 1px solid @color-main;
  color: @color-main;
  font-size: 16px;
}
/deep/.el-tag--plain .el-tag__close {
  color: @color-main;
  &:hover {
    background-color: @color-main;
    color: #fff;
  }
}
</style>
