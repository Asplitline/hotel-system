<template>
	<div class="medical">
		<el-container class="container">
			<el-header class="header">
				<search v-model="keyWord" @s-click="handleKeyword()" @s-clear="handleClear()" />
			</el-header>
			<el-container class="main">
				<el-main>
					<div class="main-header">
						<medical-nav :data="getMiniCategory()" text="体检类型" @h-tag="handleTag"
							:flag="0" :d-active="tagArr[0]" />
						<medical-nav :data=" priceList" text="价格范围" @h-tag="handleTag" :flag="1"
							:d-active="tagArr[1]" />
						<medical-nav :data=" floorList" text="楼层选择" @h-tag="handleTag" :flag="2"
							:d-active="tagArr[2]" />
						<!-- todo : no idea -->
						<medical-tag :data=" tagArr" :fArr="[getMiniCategory(),priceList,floorList]"
							@t-close="handleTagClose" />
					</div>
					<div class="main-content">
						<!-- note  parent -> children (async data) #2
                 parent -> v-if  exist?data
                 reason# parent updated
             -->
						<item-list :data="fItem" v-if="fItem" />
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import search from '../common/Search'
import medicalNav from './MedicalNav'
import medicalTag from './MedicalTag'
import itemList from './ItemList'
// import { item } from '@mock'
import { priceList, floorList } from '@static'
import _api from '@api'
import { mapActions, mapGetters } from 'vuex'
export default {
	components: {
		search,
		medicalNav,
		medicalTag,
		itemList
	},
	data() {
		return {
			priceList,
			floorList,
			arrayTag: [{}],
			item: null,
			initNum: 8,
			tagArr: [-1, -1, -1],
			keyWord: null,
			hasSearch: false
		}
	},
	methods: {
		...mapActions(['fetchAllCategory', 'fetchAllRoom']),
		async fetchItem() {
			const { data } = await _api.getItems()
			// console.log(res)
			this.item = data.map((i) => {
				const department = this.getRoomById(i.depaetmentId)
				const types = this.getCategoryById(i.typeId)
				return { ...i, department, types }
			})
		},
		handleTag(val) {
			this.$set(this.tagArr, val.flag, val.value)
		},
		handleTagClose({ index }) {
			this.$set(this.tagArr, index, -1)
		},
		handleKeyword() {
			this.hasSearch = true
			console.log(this.keyWord)
		},
		handleClear() {
			this.hasSearch = false
			// this.keyWord = null
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
			// // console.log(...this.tagArr)
			const [lx, price, floor] = [...this.tagArr]
			let data = this.item
			// 类型
			if (lx !== -1 && data) {
				data = data.filter(({ typeId }) => typeId === lx)
			}
			// // 价格范围
			if (price !== -1 && data) {
				const { min, max } = this.priceList[price]
				data = data.filter(({ price }) => {
					return price > min && price < max
				})
			}
			// // 楼层
			if (floor !== -1 && data) {
				data = data.filter(({ department }) => {
					return floor + 1 === Number(department.address[0])
				})
			}
			// // 搜索
			if (this.hasSearch && data) {
				data = data.filter((item) => {
					return item.name.indexOf(this.keyWord) !== -1
				})
			}
			return data
		}
	},
	created() {
		this.fetchAllRoom()
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
		padding: 30px;
		border: 1px solid #c6c6c6;
		.medical-tag {
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
