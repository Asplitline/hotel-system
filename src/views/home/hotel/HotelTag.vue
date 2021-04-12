<template>
  <div class="hotel-tag">
    <el-tag closable type="primary" effect="plain">
      test
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  border-radius: 0;
  padding-bottom: 0;
}
</style>
