<template>
  <el-container class="admin">
    <el-header style="height: 70px">
      <div class="l-header">
        <i :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleFold()"></i>
        防疫物资无人售货管理系统
      </div>
      <div class="r-header">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :src="bindIMG(currentUser.url)"> </el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goIndex">跳转前台</el-dropdown-item>
            <el-dropdown-item command="logOut">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isFold ? '64px' : '200px'" class="t-sider">
        <el-menu
          background-color="#324157"
          active-text-color="#409eff"
          text-color="#fff"
          :default-active="$route.path"
          :collapse="isFold"
          :collapse-transition="false"
          router
        >
          <SideMenu v-for="item in currentMenu" :key="item.name" :item="item"></SideMenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { aMenuList } from '@static'
import { mapMutations, mapState } from 'vuex'
import { bindIMG, notEmpty } from '@utils'
import SideMenu from '@components/sideMenu'
export default {
  // 定义组件的数据部分
  data() {
    return {
      isFold: false, // 控制侧边栏是否折叠的标志
      aMenuList, // 侧边栏菜单列表数据
      active: '' // 当前选中的菜单项
    }
  },
  // 引入子组件 SideMenu
  components: {
    SideMenu
  },
  // 定义计算属性
  computed: {
    ...mapState(['aIndex', 'currentUser']), // 将 Vuex 中的 aIndex 和 currentUser 映射到当前组件的计算属性中
    currentMenu() {
      // 获取当前登录用户可访问的菜单列表
      return this.$router.options.routes.filter((i) => i.isAuth)
    }
  },
  // 定义方法
  methods: {
    ...mapMutations(['clearInfo']), // 将 Vuex 中的 clearInfo 映射到当前组件的方法中
    bindIMG,
    notEmpty,
    toggleFold() {
      // 控制侧边栏是否折叠的方法
      this.isFold = !this.isFold
    },
    handleCommand(command) {
      // 处理菜单项点击事件的方法
      this[command] && this[command]()
    },
    goIndex() {
      // 跳转到首页的方法
      this.$router.push({ name: 'Index' })
    },
    logOut() {
      // 退出登录的方法
      this.clearInfo()
      this.$router.push({ name: 'Login' })
    }
  },
  created() {
    // this.active = this.$route.meta.index
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.admin {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  .el-header {
    display: flex;
    justify-content: space-between;
    padding: 0;
    padding-right: 20px;
    background-color: #242f42;
    color: #fff;
  }
  .el-container {
    flex: 1;
  }
  .el-aside {
    // background-color: #ccc;
    height: 100%;
  }
}
.el-header {
  .l-header {
    font-size: 22px;
    line-height: 70px;
    & > i {
      cursor: pointer;
      padding: 10px;
      &:hover {
        color: #ccc;
      }
    }
  }
  .r-header {
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
    /deep/.el-avatar {
      border: 2px solid #f0f0f0;
    }
  }
}

.el-aside {
  overflow: hidden;
  width: 260px;
  background-color: rgb(50, 65, 87);
  // .el-menu {
  // 	height: inherit;
  // 	// text-align: center;
  // 	// letter-spacing: 0.5em;
  // 	.el-menu-item {
  // 		color: #dfdfdf;
  // 		&.is-active i {
  // 			color: #409eff;
  // 		}
  // 		i {
  // 			color: #dfdfdf;
  // 		}
  // 		span {
  // 			font-size: 16px;
  // 		}
  // 	}
  // }
}
// *****
.el-dropdown-menu {
  top: 58px !important;
}
</style>
