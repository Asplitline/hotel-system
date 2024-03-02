<template>
	<div class="search">
		<el-input placeholder="搜索药品..." :value="value" @input="$emit('input', $event)" @clear="clear" :clearable="true">
			<el-button slot="append" icon="el-icon-search" @click="submit()"></el-button>
		</el-input>
	</div>
</template>

<script>
export default {
	props: ['value'],
	name: 'search',
	methods: {
		submit() {
			this.$emit('s-click')
		},
		clear() {
			this.$emit('s-clear')
		}
	},
	created() {
		console.log(this.value)
	}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.search {
	.el-button {
		background-color: @color-main;
		color: #fff;
		border-radius: 0;
		border: 1px solid @color-main;
	}

	/deep/.el-input-group--append .el-input__inner {
		background-color: #f8f8f8;
	}
}
</style>
