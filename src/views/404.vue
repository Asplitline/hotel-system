<template>
  <div class="error">
    <div class="box">
      <img src="../assets/404.png">
      <span @click="back()">点击返回</span>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.error {
  height: 100vh;
  position: relative;
  background-color: @color-main;
  .box {
    position: absolute;
    width: 346px;
    height: 300px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    span {
      position: absolute;
      top: 41%;
      right: 0;
      //   background-color: #fff;
      padding: 6px;
      font-size: 14px;
      border: 1px solid #f8f8f8;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        color: @color-main;
        background-color: #fff;
      }
    }
  }
}
</style>
