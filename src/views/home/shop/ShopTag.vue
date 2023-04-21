<template>
  <div class="hotel-tag">
    <el-tag closable type="primary" effect="plain" v-for="item in tags" :key="item.index" @close="closeTag(item)">
      <!-- {{item}} -->
      {{ item.name }}
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
    // 计算属性：生成标签数组
    tags() {
      // 解构data和fArr数组中的三个值
      const [lx, price, floor] = this.data
      const [lxArr, priceArr, floorArr] = this.fArr
      return [
        // 标签1: 根据lx的值确定当前选中的标签，获取对应名称
        { flag: lx, index: 0, name: this.filterArr(lxArr, lx) },
        // 标签2: 根据price的值确定当前选中的标签，获取对应名称
        { flag: price, index: 1, name: this.filterArr(priceArr, price) },
        // 标签3: 根据floor的值确定当前选中的标签，获取对应名称
        { flag: floor, index: 2, name: this.filterArr(floorArr, floor) }
      ]
    }
  },
  methods: {
    // 过滤数组中的元素，获取指定id对应的名称
    filterArr(arr, id) {
      // 使用filter方法过滤出id相同的元素
      const temp = arr.filter((item) => item.id === id)
      // 将过滤结果解构为一个元素数组，取出第一个元素作为结果
      const [res] = [...temp]
      return res ? res.name : '全部' // 如果存在对应的元素，则返回名称；否则返回“全部”
    },
    closeTag(val) {
      // 关闭标签，向父组件发射t-close事件，传递当前标签的flag值
      this.$emit('t-close', val)
    }
  },

  created() {
    // console.log(this.fArr)
    // console.log(this.data)
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
