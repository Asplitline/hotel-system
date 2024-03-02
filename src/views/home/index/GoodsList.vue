<template>
	<div class="goods-list">
		<h2 class="goods-title"><i class="iconfont" :class="info.icon"></i>{{ info.title }}</h2>
		<ul class="h-list" v-if="filterGoods.length">
			<li class="h-item" v-for="item in filterGoods" :key="item.id">
				<a href="javascript:;" class="h-content">
					<img :src="bindIMG(item.url)" @click="goItemDetail(item)">
					<span class="h-title" @click="goItemDetail(item)">{{ item.name }}</span>
				</a>
				<div class="h-info">
					<p class="h-price">价格:{{ item.price | $ }}</p>
					<el-popconfirm title="确定要添加药品到购物车吗？" @confirm="handleAddCart(item)">
						<button class="h-cart" slot="reference">
							<i class="iconfont icon-iconfontcart"></i>加入购物车
						</button>
					</el-popconfirm>

				</div>
			</li>
			<li class="h-item hidden-vs" v-for="index in blankNum" :key="index"></li>
		</ul>
		<div v-else class="not-found">敬请期待</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import _api from '@api'

import { bindIMG } from '@utils'
export default {
	name: 'goods-list',
	props: {
		info: {
			type: Object
		},
		data: {
			type: Array
		}
	},
	data () {
		return {}
	},
	methods: {
		...mapMutations(['setCurrentItem']),
		...mapActions(['fetchMyCart']),
		bindIMG,
		goItemDetail (data) {
			this.setCurrentItem(data)
			this.$router.push({ name: 'ShopDetail', params: { id: data.id } })
		},
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
		// 跳转到药品详情
		goHotelDetail (data) {
			this.setCurrentItem(data)
			this.$router.push({ name: 'ShopDetail', params: { id: data.id } })
		}
	},
	computed: {
		...mapState(['currentUser']),
		filterGoods () {
			const idx = this.info.index
			return this.data.slice((idx - 1) * 6, idx * 6)
		},
		blankNum () {
			const rest = this.filterGoods.length % 3
			return rest === 3 ? 0 : rest
		}
	},
	created () { }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.goods-list {
	background-color: #fff;
	padding: 0 10px 10px;
	margin: 20px 0;
	overflow: hidden;

	.goods-title {
		// border-left: 3px solid @color-main;
		display: flex;
		align-items: center;
		justify-content: center;
		// padding-left: 20px;
		font-weight: normal;
		letter-spacing: 4px;
		font-size: 30px;
		margin-top: 40px;
		margin-bottom: 30px;

		.iconfont {
			font-size: 28px;

			&.icon-new {
				font-size: 30px;
				color: @color-green;
			}

			&.icon-fire {
				color: @color-red;
			}
		}
	}

	.h-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		// padding: 10px;
		.h-item {
			width: 31.6%;
			// height: 168px;
			margin-bottom: 30px;
			border: 1px solid #f2f2f2;
			box-shadow: 0 0 10px rgba(4, 0, 0, 5%);

			.h-content {
				box-sizing: border-box;

				display: flex;
				align-items: center;
				width: 100%;
				padding: 14px;

				img {
					width: 150px;
					height: 150px;
					vertical-align: bottom;
				}

				.h-title {
					flex: 1;
					display: block;
					height: 36px;
					margin-bottom: 4px;
					font-size: 14px;
					color: #333;
					text-align: center;
					display: -webkit-box;
					/*弹性伸缩盒子模型*/
					-webkit-box-orient: vertical;
					/*伸缩盒子子排列方式*/
					-webkit-line-clamp: 2;
					/*设置显示文本行数*/
					text-overflow: ellipsis;
					overflow: hidden;
					transition: color 0.25s ease;

					&:hover {
						color: @color-red;
					}
				}
			}

			.h-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #f75f3c;

				.h-price {
					flex: 1;
					text-align: center;
					font-size: 16px;
					color: #fff;
					height: 100%;
					margin: 0;
				}

				.h-cart {
					display: flex;
					align-items: center;
					line-height: 50px;
					height: 50px;
					background: #ffa133;
					color: #fff;
					text-align: center;
					font-size: 16px;
					cursor: pointer;
					border: none;
					outline: none;
					height: 100%;
					padding: 0 16px;

					&:hover {
						opacity: 0.9;
					}

					.iconfont {
						font-size: 24px;
						margin-right: 4px;
					}
				}
			}
		}
	}
}
</style>
