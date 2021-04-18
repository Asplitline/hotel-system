<template>
  <div class="info">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息" :lazy="true">
        <profile :data="currentUser" />
      </el-tab-pane>
      <el-tab-pane label="更改密码" :lazy="true">
        <change-password :id="currentUser.id" />
      </el-tab-pane>
      <el-tab-pane label="我的预定" :lazy="true">
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
import { mapState } from 'vuex'
export default {
  components: {
    profile,
    changePassword,
    myOrder
  },
  methods: {},
  computed: {
    ...mapState(['currentUser'])
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
