<template>
	<!-- todo infiniteScroll -->
	<ul class="item-list">
		<template v-if="itemList.length !== 0">
			<li class="item-item" v-for="item in itemList" :key="item.id">
				<div class="item-cover">
					<img :src="bindIMG(item.url)" alt="" class="img" @click="goItemDetail(item)">
				</div>
				<h2 class="i-title" @click="goItemDetail(item)">{{ item.name }}</h2>
				<div class="item-footer">
					<p class="i-price">
						{{ item.price | $ }}
					</p>
					<button class="add-cart">
						<el-popconfirm title="确定要添加商品到购物车吗？" @confirm="handleAddCart(item)">
							<i class="iconfont icon-iconfontcart" slot="reference"></i>
						</el-popconfirm>
					</button>
				</div>

			</li>
			<li class="item-item hidden-vs" v-for="index in blankNum" :key="index"></li>
		</template>
		<template v-else>
			<div class="not-found">暂无商品信息</div>
		</template>
	</ul>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { bindIMG } from '@utils'
import { floorList } from '@static'
import _api from '@api'
export default {
	name: 'item-list',
	props: {
		data: {
			type: Array,
			default: function () {
				return []
			}
		}
	},
	data () {
		return {
			itemList: []
		}
	},
	methods: {
		...mapMutations(['setCurrentItem', 'addCart']),
		...mapActions(['fetchMyCart']),
		bindIMG,
		async handleAddCart (item) {
			const { success } = await _api.addShoppingCar({
				createTime: Date.now(),
				goodsId: item.id,
				type: 0,
				updateTime: Date.now(),
				userId: this.currentUser.id
			})
			this.$notify({
				title: '购物车',
				type: success ? 'success' : 'danger',
				message: success ? '添加成功! ' : '添加失败! '
			})
			success && this.fetchMyCart()
		},
		goItemDetail (data) {
			this.setCurrentItem(data)
			this.$router.push({ name: 'ShopDetail', params: { id: data.id } })
		},
		getLevelName (str) {
			const lv = Number(str[0]) - 1
			return floorList[lv].name
		}
	},
	computed: {
		...mapState(['currentUser']),
		totalNum () {
			return this.itemList.length
		},
		blankNum () {
			return this.totalNum % 4 === 0 ? 0 : 4 - (this.totalNum % 4)
		}
	},
	watch: {
		data (val) {
			this.itemList = val
		}
	},
	created () {
		this.itemList = this.data
	}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.item-list {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;

	.item-item {
		width: 22%;
		box-sizing: border-box;
		// height: 240px;
		border: 1px solid #e8e8e8;
		padding: 20px;
		margin-bottom: 20px;
		border-radius: 8px;
		transition: all 0.3s linear;
		display: inline-block;
		height: 350px;
		margin-right: 4%;

		&:nth-child(4n) {
			margin-right: 0;
		}

		.item-cover {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			position: relative;
			overflow: hidden;
			transition: transform 0.3s linear;

			&:hover {
				cursor: pointer;
				transform: translateY(-10px);
			}

			.img {
				position: absolute;
				width: 100%;
				height: 100%;
			}
		}

		.i-title {
			font-weight: normal;
			font-size: 18px;
			width: 195px;
			height: 48px;
			cursor: pointer;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/*弹性伸缩盒子模型*/
			-webkit-box-orient: vertical;
			/*伸缩盒子子排列方式*/
			-webkit-line-clamp: 2;

			/*设置显示文本行数*/
			&:hover {
				text-decoration: underline;
				color: @color-red;
			}
		}

		.item-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.i-price {
				font-size: 20px;
				position: relative;
				letter-spacing: 2px;
				color: #1abc9c;
				margin: 0;
				flex: 1;
			}

			.add-cart {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 32px;
				height: 32px;
				outline: none;
				border: none;
				background-color: @color-red;
				border-radius: 2px;
				transition: transform 0.1s linear;

				&:hover {
					cursor: pointer;
					transform: scale(1.1);
				}

				.iconfont {
					font-size: 20px;
					color: #fff;
				}
			}
		}

		// &:hover {
		// 	border-color: #c8c8c8;
		// 	transform: translateY(4px);
		// 	box-shadow: 0px 0px 4px 2px rgba(102, 102, 102, 0.2);
		// 	cursor: pointer;
		// }
	}
}</style>
