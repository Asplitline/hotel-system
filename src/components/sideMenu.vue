<template>
	<div>
		<template v-if="notEmpty(item.children)">
			<el-submenu :index="item.name" class="t-subitem">
				<template slot="title">
					<i :class="item.meta.icon"></i>
					<span slot="title">{{item.meta.title}}</span>
				</template>
				<el-menu-item v-for="ch in item.children" :key="ch.name" :index="ch.meta.index"
					class="t-item">
					<i :class="ch.meta.icon"></i>
					<span>{{ch.meta.title}}</span>
				</el-menu-item>
			</el-submenu>
		</template>
		<template v-else>
			<el-menu-item :index="item.meta.title" class="t-item">
				<i :class="item.meta.icon"></i>
				<span slot="title">{{item.meta.title}}</span>
			</el-menu-item>
		</template>
	</div>
</template>

<script>
import { notEmpty } from '@utils'
export default {
	name: 'sideMenu',
	props: ['item'],
	methods: {
		notEmpty
	}
}
</script>

<style lang="less" scoped>
.t-subitem {
	span {
		margin-left: 8px;
		font-size: 15px;
	}
}
.el-menu-item i {
	color: #e0e0e0;
}
.t-item {
	display: flex;
	align-items: center;
	span {
		margin-left: 8px;
		font-size: 15px;
	}
	.el-submenu__title i {
		color: #e0e0e0;
	}
	&.is-active {
		i,
		span {
			color: #409eff;
		}
	}
}
.el-menu--collapse {
	.t-item,
	.t-subitem {
		::v-deep.el-submenu__icon-arrow {
			display: none;
		}
		span {
			display: none;
		}
	}
}
</style>