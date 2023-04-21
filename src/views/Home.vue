<template>
  <el-container class="home">
    <el-header style="height: 60px">
      <div class="w">
        <el-menu
          :default-active="hIndex"
          mode="horizontal"
          background-color="#c91523"
          class="h-nav"
          text-color="#fff"
          active-text-color="#fff"
          router
          @select="selectMenu"
        >
          <el-menu-item :index="item.meta.index" v-for="item in menuList" class="h-nav-item" :key="item.meta.index">
            {{ item.meta.title }}
            <span v-if="item.meta.showNum && cartNum > 0" class="corner-ico">{{ cartNum }}</span>
          </el-menu-item>
        </el-menu>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :src="bindIMG(currentUser.url)"> </el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="goAdmin" v-if="currentUser.level != 0">后台系统 </el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main class="w">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { bindIMG, notEmpty } from '@utils'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['clearInfo', 'setHIndex']),
    ...mapActions(['fetchMyCart']),
    bindIMG,
    // tag $options
    handleCommand(command) {
      // 调用组件对象$options中的方法
      this.$options.methods[command](this)
    },
    goInfo(vm) {
      // 跳转到路由name为Info的路由
      vm.$router.push({ name: 'Info' })
    },
    logout(vm) {
      // 清空用户信息
      vm.clearInfo()

      // 跳转到路由name为Login的路由
      vm.$router.push({ name: 'Login' })
    },
    goAdmin(vm) {
      // 跳转到路由name为Admin的路由
      vm.$router.push({ name: 'Admin' })
    },
    selectMenu(v) {
      // 调用setHIndex方法设置当前选中的菜单索引
      this.setHIndex(v)
    }
  },
  computed: {
    // 导入Vuex中的hIndex、currentUser和myCart三个状态
    ...mapState(['hIndex', 'currentUser', 'myCart']),
    menuList() {
      // 获取路由中所有不需要权限验证的菜单
      const allMenu = this.$router.options.routes
      const menus = allMenu.filter((i) => i.isAuth !== true && notEmpty(i.children))

      // 返回第一个菜单下的所有带meta属性的子菜单
      return menus[0].children.filter((i) => notEmpty(i.meta))
    },
    // 计算购物车数量
    cartNum() {
      return this.myCart.length
    }
  },
  // 组件挂载完成后触发的函数
  mounted() {
    // 调用fetchMyCart方法，获取购物车数据
    this.fetchMyCart()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.home {
  height: 100vh;
  background-color: #e5e5e5;
}
.h-nav {
  height: 60px;
  .h-nav-item {
    margin-right: 10px;
    border-width: 4px;
  }
}
.el-header {
  background-color: #c91523;
  .w {
    display: flex;
    justify-content: space-between;
  }
  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
  .el-dropdown {
    height: 70px;
    color: #fff;
  }
  .el-menu-item {
    position: relative;
    font-size: 20px;
  }
  /deep/.el-avatar {
    border: 2px solid #f0f0f0;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
}
.el-main {
  background-color: #fff;
}

.corner-ico {
  text-align: center;
  position: absolute;
  top: 2px;
  right: 0;
  padding: 0 4px;
  min-width: 14px;
  height: 20px;
  line-height: 20px;
  background-color: #fff;
  color: @color-red;
  border-radius: 10px 10px 10px 4px;
  font-size: 14px;
}
</style>
