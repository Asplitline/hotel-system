<template>
  <div class="info">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息">
        <profile />
      </el-tab-pane>
      <el-tab-pane label="更改密码">
        <change-password />
      </el-tab-pane>
      <el-tab-pane label="我的预定">
        <my-order />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/**
 * 个人信息
 * 更改密码
 * 我的预定
 */
import changePassword from './ChangePassword'
import profile from './Profile'
import myOrder from './MyOrder'
export default {
  components: {
    profile,
    changePassword,
    myOrder
  }
}
</script>
<style lang="less" scoped>
.info {
  padding: 10px 100px;
}
.el-tabs {
  // min-height: 400px;
  // height: 100%;
}
.el-tabs__nav-wrap.is-scrollable.is-left {
  height: 100%;
}
</style>
