<template>
  <div class="search">
    <el-input placeholder="搜索商品..." :value="value" @input="$emit('input', $event)" @clear="clear" :clearable="true">
      <el-button slot="append" icon="el-icon-search" @click="submit()"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: ['value'],
  name: 'search',
  // 定义 methods 中的两个函数
  methods: {
    // 提交事件
    submit() {
      // 触发自定义事件 s-click
      this.$emit('s-click')
    },
    // 清空事件
    clear() {
      // 触发自定义事件 s-clear
      this.$emit('s-clear')
    }
  },
  // 在 created 钩子中打印传入组件的 value 属性
  created() {
    console.log(this.value)
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.search {
  .el-button {
    background-color: @color-main;
    color: #fff;
    border-radius: 0;
    border: 1px solid @color-main;
  }
  /deep/.el-input-group--append .el-input__inner {
    background-color: #f8f8f8;
  }
}
</style>
