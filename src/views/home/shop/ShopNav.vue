<template>
	<div class="hotel-nav">
		<dl class="nav-item">
			<dt class="nav-info">{{data.name}}</dt>
			<dd v-for="item in data.children" :key="item.id" class="nav-bd"
				:class="{'active':active===item.id}" @click="setActive(item.id)">
				<a href="javascript:;">{{item.name}}</a>
			</dd>
		</dl>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object
		},
		active: {
			type: String
		}
	},
	methods: {
		setActive(idx) {
			this.$emit('h-tag', idx)
		}
	},
	// tag async-data
	watch: {
		data(val) {
			this.list = val
		}
	}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.nav-item {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding: 4px 0;
	.nav-info {
		display: inline-block;
		padding: 6px 16px;
		color: @color-main;
		letter-spacing: 4px;
		align-self: stretch;
		height: 100%;
	}

	.nav-bd {
		display: inline-block;
		padding: 6px 16px;
		border: 1px solid transparent;
		a {
			display: inline-block;
			width: 100%;
			height: 100%;
		}
		&:hover {
			a {
				color: @color-main;
			}
		}
		&.active {
			border-color: @color-main;
			a {
				color: @color-main;
			}
		}
	}
}
</style>
