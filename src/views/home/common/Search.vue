<template>
  <div class="search">
    <el-input placeholder="搜索你需要的房间">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'search'
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
