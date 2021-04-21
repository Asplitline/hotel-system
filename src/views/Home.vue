<template>
  <el-container class="home">
    <el-header style="height:70px">
      <div class="w">
        <el-menu :default-active="'/'+hIndex" mode="horizontal" background-color="#003366"
          text-color="#eee" active-text-color="#fff" router>
          <el-menu-item :index="'/'+item.index" v-for="item in hMenuList"
            :key="item.index">
            {{item.name}}
          </el-menu-item>
        </el-menu>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :src="bindIMG(currentUser.url)">
            </el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goInfo">个人信息</el-dropdown-item>
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
/**
 * 首页 - 含公告
 * 房间 - 房间列表 + 房间详情(预定+留言)
 * 个人信息 - 个人信息修改 + 订单查询
 */
import { hMenuList } from '@static'
import { mapMutations, mapState } from 'vuex'
import { bindIMG } from '@utils'
export default {
  data() {
    return {
      hMenuList
    }
  },
  methods: {
    ...mapMutations(['clearInfo']),
    bindIMG,
    handleCommand(command) {
      this.$options.methods[command](this)
    },
    goInfo(vm) {
      console.log(this)
      vm.$router.push({ name: 'info' })
    },
    logout(vm) {
      vm.clearInfo()
      vm.$router.push({ name: 'login' })
    }
  },
  computed: {
    ...mapState(['hIndex', 'currentUser'])
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.home {
  height: 100vh;
  background-color: #e5e5e5;
}
.el-header {
  background-color: #003366;
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
</style>
