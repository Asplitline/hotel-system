<template>
	<div class="shop">
		<el-container class="container">
			<el-header class="header">
				<search v-model="keyWord" @s-click="handleKeyword()" @s-clear="handleClear()" />
			</el-header>
			<el-container class="main">
				<el-main>
					<div class="main-header">
						<shop-nav :data="item" v-for="item in categories" :key="item.id"
							@h-tag="handleTag" :active="active" />
					</div>
					<div class="main-content">
						<item-list :data="fItem" v-if="fItem" />
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import search from '../common/Search'
import shopNav from './ShopNav'
import itemList from './ItemList'
import { priceList, floorList } from '@static'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
export default {
	components: {
		search,
		shopNav,
		// shopTag,
		itemList
	},
	data() {
		return {
			priceList,
			floorList,
			item: null,
			initNum: 8,
			keyWord: null,
			hasSearch: false,
			active: ''
		}
	},
	methods: {
		...mapActions(['fetchAllCategory', 'fetchAllUser']),
		async fetchItem() {
			const { data } = await _api.getItem()
			this.item = data
		},
		handleTag(val) {
			console.log(val)
			this.active = val
		},
		handleTagClose({ index }) {
			this.$set(this.tagArr, index, -1)
		},
		handleKeyword() {
			this.hasSearch = true
			this.active = ''
		},
		handleClear() {
			this.hasSearch = false
			this.keyWord = null
		}
	},
	computed: {
		...mapGetters([
			'getCategoryById',
			'getMiniCategory',
			'getUserById',
			'getRoomById'
		]),
		fItem() {
			if (this.hasSearch) {
				return this.item.filter(
					(i) => i.name.indexOf(this.keyWord?.trim()) !== -1
				)
			} else {
				return this.active === ''
					? this.item
					: this.item.filter((i) => i.type === this.active)
			}
		},
		categories() {
			const parent = this.getMiniCategory().filter((i) => i.pid == null)
			return parent
				.map((i) => {
					const children = this.getMiniCategory().filter((j) => j.pid === i.id)
					return {
						...i,
						children
					}
				})
				.filter((i) => i.children.length)
		}
	},
	mounted() {
		this.fetchAllUser()
		this.fetchAllCategory()
		this.fetchItem()
	}
}
</script>

<style lang="less" scoped>
.container {
	height: 100%;
}
.header {
	height: 100%;
	padding: 0 30%;
}
.main {
	padding: 0;
	.main-header {
		padding: 10px;
		border: 1px solid #c6c6c6;
		.shop-tag {
			border-top: 1px solid #eee;
			padding: 20px 20px 0;
		}
	}
	.main-content {
		margin-top: 10px;
		padding: 30px 10px;
		border: 1px solid #c6c6c6;
	}
}
</style>
