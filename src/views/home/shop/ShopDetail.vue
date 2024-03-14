<template>
	<div class="item-detail">
		<!-- <div class="h-header">体检详情<a href="javascript:;" @click="back()">返回</a></div> -->
		<div class="h-header">

			<i class="fa fa-chevron-circle-left" aria-hidden="true" @click="back()">返回</i>
		</div>
		<div class="h-content">

			<div class="l-content">
				<div class="img-warp">
					<img :src="bindIMG(item.url)" alt="">
				</div>
			</div>
			<div class="r-content">
				<div class="r-hd">{{ item.name }}</div>
				<div class="r-bd">
					<p>
						<span>商品类型</span><span>{{ typeName }}</span>
					</p>
					<p>
						<span>商品产地</span><span>{{ item.address }}</span>
					</p>
					<p>
						<span>商品库存</span><span class="h-num">{{ item.num }}</span>
					</p>
					<p>
						<span>商品价格</span><span class="h-price">{{ item.price | $ }}</span>
					</p>
					<p>
						<span>商品简介</span><span class="h-desc">{{ item.description }}</span>
					</p>
				</div>
				<div class="r-bottom">
					<el-popconfirm title="确定要添加商品到购物车吗？" @confirm="handleAddCart(item)">
						<button class="add-cart" slot="reference">添加购物车</button>
					</el-popconfirm>
					<button class="my-cart" @click="goto">我的购物车 <span class="corner-ico" v-if="cartNum > 0">{{ cartNum
					}}</span></button>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { hMixin } from '@mixins'
import { bindIMG } from '@utils'
import _api from '@api'

export default {
	props: ['id'],
	data () {
		return {
			myDate: '',
			replyDialogVisible: false,
			replyForm: {}
		}
	},
	mixins: [hMixin],
	methods: {
		...mapMutations(['setCurrentItem']),
		...mapActions(['fetchMyCart', 'fetchAllCategory']),
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
		goto () {
			this.$router.push({ name: 'Cart' })
		}
	},

	computed: {
		...mapState({
			item: 'currentItem',
			myCart: 'myCart',
			currentUser: 'currentUser'
		}),
		...mapGetters(['getCategoryById']),
		cartNum () {
			return this.myCart?.length
		},
		typeName () {
			return this.getCategoryById(this.item.type)?.name ?? '未知'
		}
	},
	mounted () {
		this.fetchAllCategory()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.h-content {
	display: flex;
	margin-bottom: 20px;
}

.h-header {
	// border-left: 3px solid @color-main;
	margin-bottom: 10px;
	text-align: left;
	font-size: 30px;
	color: #d35400;
	height: 40px;

	i:hover {
		cursor: pointer;
		opacity: 0.7;
	}

	i::before {
		margin-right: 10px;
	}
}

.h-title {
	font-size: 28px;
	margin-bottom: 12px;
	color: #666;
}

.l-content {
	flex: 2;
	height: 100%;
	position: relative;
	border: 1px solid #f0f0f0;
	box-sizing: border-box;
	padding: 20px;

	.img-warp {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 100%;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			vertical-align: bottom;
		}
	}
}

.r-content {
	flex: 3;
	padding: 0 30px;
	display: flex;
	flex-direction: column;

	.r-hd {
		color: #111;
		padding-top: 10px;
		line-height: 28px;
		font-size: 24px;
		margin-bottom: 5px;
	}

	.r-bd {
		flex: 1;
		padding: 20px 0;

		p {
			margin: 0;
			margin-bottom: 20px;
		}

		span {
			display: inline-block;

			&:first-child {
				width: 120px;
				text-align: left;
				letter-spacing: 2px;
				color: #999;
			}

			&:last-child {
				//   width: 100%;
				text-align: left;
				letter-spacing: 0.3em;
			}

			&.h-price {
				color: @color-red;
				//   font-size: larger;
				transform: scale(1.2);
				letter-spacing: 2px;
			}

			&.h-num {
				// color: @color-red;
			}
		}
	}

	.r-bottom {
		display: flex;
		justify-content: space-evenly;

		[class*='-cart'] {
			outline: none;
			width: 120px;
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			border: none;
			background-color: @color-red;
			color: #fff;
			cursor: pointer;

			&:hover {
				opacity: 0.7;
			}
		}

		.my-cart {
			position: relative;
			border: 1px solid #dfdfdf;
			background: #f9f9f9;
			color: #666;

			.corner-ico {
				position: absolute;
				right: 0;
				top: -10px;
				padding: 0 4px;
				min-width: 14px;
				height: 20px;
				line-height: 20px;
				background-color: @color-red;
				color: #fff;
				border-radius: 10px 10px 10px 4px;
				font-size: 14px;
			}
		}
	}
}

.h-divider {
	margin: 30px 0;
	border-color: #f8f8f8;
}

.h-comment {
	margin-top: 20px;

	.h-edit {
		position: relative;
		display: flex;
		height: 100px;
		padding: 10px 20px;
		justify-content: center;
		align-items: center;
		// width: 100%;
		background-color: #eee;

		input {
			flex: 1;
			border-radius: 2px;
			outline: none;
			border: 1px solid #999;
			font-size: 18px;
			height: 40px;
			padding-left: 1em;
			box-sizing: border-box;
			color: #666;

			&:focus {
				box-shadow: 0 0 3px 3px rgba(#888, 0.3);
			}
		}

		button {
			height: 40px;
			border-radius: 2px;
			width: 80px;
			margin-left: 6px;
			outline: none;
			background-color: @color-green;
			color: #fff;
			border: 1px solid @color-green;
			cursor: pointer;

			&:hover {
				background-color: rgba(@color-green, 0.8);
			}

			&.disabled {
				cursor: not-allowed;
				// background-color: @color-green;
				background-color: transparent;
				color: @color-green;
				// color: #ddd;
			}
		}

		span {
			position: absolute;
			left: 27px;
			bottom: 11px;
			font-size: 14px;
			color: #888;
		}
	}

	.no-login {
		letter-spacing: 2px;

		a {
			color: @color-red;
		}
	}
}

.h-list {
	padding: 20px;
	//   background-color: #e8e8e8;
	margin-top: 20px;
	border: 1px solid #ccc;

	.h-item {
		padding: 10px 0;
		border-bottom: 1px solid #ddd;

		img {
			width: 40px;
			height: 40px;
			vertical-align: middle;
			border-radius: 50%;
		}

		span {
			color: #444;
			vertical-align: middle;
			margin-left: 8px;
		}

		.h-author {
			color: @color-main;
		}

		.h-date {
			font-size: 14px;

			em {
				color: #666;
				font-style: normal;
			}
		}

		div {
			margin-left: 50px;
			width: 600px;
			padding: 14px 4px;
		}
	}
}

.h-desc {
	color: #666;
	padding-top: 10px;
}

.not-found {
	margin-top: 10px;
}

::v-deep .md-empty {
	background-color: #fafafa;

	p {
		color: @color-blue;
		font-size: 20px;
	}
}
</style>
