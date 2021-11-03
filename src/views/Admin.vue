<template>
	<el-container class="admin">
		<el-header style="height:70px">
			<div class="l-header">
				<i :class="isFold?'el-icon-s-unfold':'el-icon-s-fold'" @click="toggleFold()"></i>
				体检预约管理系统
			</div>
			<div class="r-header">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						<el-avatar :src="bindIMG(currentUser.url)">
						</el-avatar>
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
			<el-aside :width="isFold?'64px':'300px'">
				<el-menu :default-active="active" background-color="#324157" :collapse="isFold"
					:collapse-transition="false" active-text-color="#409eff" router>
					<el-menu-item :index="item.path" v-for="item in currentMenu" :key="item.index">
						<i :class="item.meta.icon"></i>
						<span slot="title">{{item.meta.title}}</span>
					</el-menu-item>
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
import { bindIMG } from '@utils'
export default {
	data() {
		return {
			isFold: false,
			aMenuList,
			active: ''
		}
	},
	computed: {
		...mapState(['aIndex', 'currentUser']),
		currentMenu() {
			// debugger
			return this.$router.options.routes.find((i) => i.name === 'admin')
				?.children
		}
	},
	methods: {
		...mapMutations(['clearInfo']),
		bindIMG,
		toggleFold() {
			this.isFold = !this.isFold
		},
		handleCommand(command) {
			this[command] && this[command]()
		},
		goIndex() {
			this.$router.push({ name: 'index' })
		},
		logOut() {
			this.clearInfo()
			this.$router.push({ name: 'login' })
		}
	},
	created() {
		this.active = this.aIndex
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
		background-color: #ccc;
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
	.el-menu {
		height: inherit;
		text-align: center;
		letter-spacing: 0.5em;
		.el-menu-item {
			color: #dfdfdf;
			&.is-active i {
				color: #409eff;
			}
			i {
				color: #dfdfdf;
			}
			span {
				font-size: 16px;
			}
		}
	}
}
// *****
.el-dropdown-menu {
	top: 58px !important;
}
</style>
