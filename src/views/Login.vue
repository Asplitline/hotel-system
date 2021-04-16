<template>
  <div class="login">
    <!-- <img src="/T_2014_359.jpg" alt=""> -->
    <div class="login-wrap">
      <div class="ms-login" :class="{'active':isLogin}">
        <div class="ms-title">酒店管理系统 - 登录界面</div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px"
          class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号">
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
                <el-button type="info" @click="toggleForm('loginForm')">注册</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="submitForm('loginForm',0)">登录
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div class="ms-register" :class="{'active':!isLogin}">
        <div class="ms-title">酒店管理系统 - 注册界面</div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="0px"
          class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="账号">
              <el-button slot="prepend" icon="el-icon-user"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="密码">
              <el-button slot="prepend" icon="el-icon-lock"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="邮箱验证" v-model="registerForm.email"
              @keyup.enter.native="submitForm()">
              <el-button slot="prepend" icon="el-icon-message">
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="number">
            <el-input v-model="registerForm.number" placeholder="验证码">
              <el-button slot="prepend" icon="el-icon-unlock"> </el-button>
              <el-button class="toggle-button" slot="append"
                :icon="loadBtn[loadFlag?1:0].icon" @click="toggleIcon()"
                :disabled="showEmail" :class="{disabled:showEmail}">
              </el-button>
            </el-input>
          </el-form-item>
          <div class="ms-btn">
            <el-row :gutter="40">
              <el-col :span="12">
                <el-button type="info" @click="toggleForm('registerForm')">登录</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="submitForm('registerForm',1)">注册
                </el-button>
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
import { REG_EMAIL, loadBtn, LOGIN, REGISTER } from '@static'
import _api from '@api'
import { hMixin } from '@mixins'
import { convertURL } from '@utils'
export default {
  mixins: [hMixin],
  data() {
    const validateEamil = (rule, value, callback) => {
      this.showEmail = true
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (REG_EMAIL.test(value)) {
        this.showEmail = false
        return callback()
      } else {
        return callback(new Error('邮箱不合法'))
      }
    }
    return {
      loginForm: {},
      registerForm: {},
      isLogin: true,
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        number: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        email: [{ validator: validateEamil, trigger: 'blur' }]
      },
      loadFlag: false,
      showEmail: true,
      loadBtn
    }
  },
  methods: {
    submitForm(formName, flag) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (flag === LOGIN) {
        } else if (flag === REGISTER) {
          const { success } = await _api.register(
            convertURL({
              password: this[formName].password,
              username: this[formName].username
            })
          )
          this.handleSuccess(success, '注册', async () => {
            // const { success } = await _api.editUser(
            // )
          })
        }
        console.log(this[formName])
      })
    },
    toggleForm(formName) {
      this.isLogin = !this.isLogin
      this.$refs[formName].resetFields()
      this.loadFlag = false
      this.showEmail = true
    },
    toggleIcon() {
      this.loadFlag = !this.loadFlag
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
  vertical-align: middle;
  height: 40px;
  /deep/i:before {
    color: #fff;
    font-size: 20px;
  }
  /deep/&.disabled {
    background-color: transparent;
    i::before {
      color: #999;
    }
  }
}

/deep/.el-form-item__error {
  margin-top: 2px;
  margin-left: 60px;
  letter-spacing: 2px;
  font-size: 14px;
}
</style>
