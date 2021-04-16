<template>
  <div class="profile">
    <el-form :model="userForm" :rules="userRules" ref="userForm" size="small"
      label-width="60px">
      <el-form-item label="头像" prop="url">
        <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
          :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="userForm.url" :src="bindIMG(userForm.url)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="userForm.username" placeholder="用户账号" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="userForm.sex" v-for="item in sexInfo" :key="item.flag"
          :label="item.flag|string">{{item.value}}</el-radio>
      </el-form-item>
      <el-form-item label="号码" prop="phone">
        <el-input v-model="userForm.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="email">
        <el-input type="textarea" :autosize="{minRows:2,maxRows:4}" resize="none"
          v-model="userForm.email" placeholder="请输入个人简介"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="success" size="small">提交</el-button>
    </div>
  </div>
</template>

<script>
import { bindURL, bindIMG } from '@utils'
export default {
  data() {
    return {
      userForm: [],
      userRules: {}
    }
  },
  methods: {
    bindURL,
    bindIMG
  }
}
</script>

<style lang="less" scoped>
@import '~@css/hcommon.less';
</style>
