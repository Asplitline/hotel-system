<template>
  <div class="login">
    <div class="login-wrap">
      <div class="ms-login" :class="{'active':isLogin}">
        <div class="ms-title">酒店管理系统 - 登录界面</div>
        <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px"
          class="ms-content">
          <el-form-item prop="number">
            <el-input v-model="loginForm.number" placeholder="账号">
              <el-button slot="prepend" icon="el-icon-user"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"
              @keyup.enter.native="submitForm()">
              <el-button slot="prepend" icon="el-icon-lock"></el-button>
            </el-input>
          </el-form-item>
          <div class="ms-btn">
            <el-row :gutter="40">
              <el-col :span="12">
                <el-button type="info" @click="toggleForm()">注册</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="submitForm()">登录</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div class="ms-register" :class="{'active':!isLogin}">
        <div class="ms-title">酒店管理系统 - 注册界面</div>
        <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px"
          class="ms-content">
          <el-form-item prop="number">
            <el-input v-model="loginForm.number" placeholder="账号">
              <el-button slot="prepend" icon="el-icon-user"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="number">
            <el-input v-model="loginForm.number" placeholder="密码">
              <el-button slot="prepend" icon="el-icon-lock"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="邮箱验证" v-model="loginForm.password"
              @keyup.enter.native="submitForm()">
              <el-button slot="prepend" icon="el-icon-message"></el-button>
              <el-button class="toggle-button" slot="append" icon="el-icon-position"
                v-if="!isClickEmail" @click="toggleIcon()">
              </el-button>
              <el-button class="toggle-button" slot="append" icon="el-icon-loading" v-else
                @click="toggleIcon()">
              </el-button>

            </el-input>
          </el-form-item>
          <el-form-item prop="number">
            <el-input v-model="loginForm.number" placeholder="验证码">
              <el-button slot="prepend" icon="el-icon-unlock"></el-button>
            </el-input>
          </el-form-item>
          <div class="ms-btn">
            <el-row :gutter="40">
              <el-col :span="12">
                <el-button type="info" @click="toggleForm()">登录</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="registerForm()">注册</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
/**
 * 用户注册
 * 用户登录
 */
export default {
  data() {
    return {
      loginForm: {},
      isLogin: true,
      rules: {},
      isClickEmail: false
    }
  },
  methods: {
    submitForm() {},
    registerForm() {},
    toggleForm() {
      this.isLogin = !this.isLogin
    },
    toggleIcon() {
      this.isClickEmail = !this.isClickEmail
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.login {
  min-height: 100vh;
  position: relative;
  background-color: #fafafa;
  .login-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 500px;
    height: 420px;
    margin: auto;
    border: 1px solid #eaeaea;
    overflow: hidden;
    background-color: #fff;
  }

  .ms-title {
    height: 100px;
    width: 100%;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
  }

  .ms-login,
  .ms-register {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: #fff;
    transition: all 1s;
    transform-origin: 0 0;
  }
  .ms-login {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(90deg);
    &.active {
      z-index: 2;
      transform: rotate(0);
    }
    .ms-content {
      margin-top: 20px;
      .el-form-item {
        margin-bottom: 40px;
      }
    }
  }

  .ms-register {
    transform: rotate(90deg);
    &.active {
      z-index: 2;
      transform: rotate(0deg);
    }
  }

  .ms-content {
    padding: 0 40px 40px;
    background: transparent;
  }
  .ms-btn {
    text-align: center;
  }
  .ms-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .toggle-button {
    border-radius: 0;
  }
}

.el-input-group__append button.el-button {
  background-color: @color-green;
  height: 41px;
  /deep/i:before {
    color: #fff;
    font-size: 20px;
  }
}
</style>
