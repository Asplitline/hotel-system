<template>
  <div class="change-password">
    <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" size="small"
      label-width="80px">
      <el-form-item label="旧密码" prop="pwdForm">
        <el-input v-model="pwdForm.oldPwd" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pwdForm">
        <el-input v-model="pwdForm.newPwd" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pwdForm">
        <el-input v-model="pwdForm.cofirmPwd" placeholder="请再次输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button size="small" type="info">重置</el-button>
      <el-button size="small" type="success">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pwdForm: {},
      pwdRules: {}
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
</style>
