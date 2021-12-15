<template>
	<div class="item-detail">
		<!-- <div class="h-header">体检详情<a href="javascript:;" @click="back()">返回</a></div> -->
		<div class="h-header">

			<i class="fa fa-chevron-circle-left" aria-hidden="true" @click="back()">返回</i>
		</div>
		<div class="h-title">{{item.name}}</div>
		<div class="h-content">

			<div class="l-content">
				<img src="http://placeimg.com/640/480/city" alt="">

			</div>
			<div class="r-content">
				<!-- <div class="r-hd">{{item.name}}</div> -->
				<div class="r-bd">
					<p>
						<span>科室号码:</span><span>{{item.department.address}}</span>
					</p>
					<p>
						<span>体检类型:</span><span>{{item.types.name}}</span>
					</p>
					<p>
						<span>所在楼层:</span><span>{{item.department.address[0]}}楼</span>
					</p>
					<p>
						<span>体检价格:</span><span class="h-price">{{item.price | $}}</span>
					</p>
					<p>
						<span>体检项简介:</span><span class="h-desc">{{item.desription }}</span>
					</p>
					<!-- <p>
						<span>体检状态:</span>
						<el-tag effect="plain">
							111</el-tag>
					</p> -->
				</div>
				<div class="r-ft">
					<el-date-picker v-model="myDate" type="date" placeholder="选择日期" class="my-date"
						:picker-options="validateDate">
					</el-date-picker>
					<el-popconfirm :title="'体检预约需先支付'+item.price+' , 是否同意'" icon="el-icon-info"
						icon-color="red" confirm-button-text='支付' cancel-button-text='不用了'
						@confirm="orderItem">
						<!-- <el-button slot="reference">删除</el-button> -->
						<a href="javascript:;" slot="reference" class="primary"
							:class="{'disabled':!myDate}">预定</a>
					</el-popconfirm>

					<!-- <a href="javascript:;" class="success">预订成功</a>
					<a href="javascript:;">体检进行中</a>
					<a href="javascript:;">体检结束</a> -->
				</div>

			</div>

		</div>
		<div class="t-steps">
			<el-steps :space="200" :active="0" finish-status="success">
				<el-step title="开始预定"></el-step>
				<el-step title="预定中"></el-step>
				<el-step title="预定成功"></el-step>
				<el-step title="体检中..."></el-step>
				<el-step title="体检完成"></el-step>
			</el-steps>

		</div>
		<!-- <div class="h-header">房间评论</div>
		<div class="h-comment">
			<div class="h-edit">
				<template v-if="isLogin">
					<input type="text" v-model="commentVal" @keyup.enter="comment()">
					<button @click="comment()" :class="{'disabled':commentIsEmpty}">评论</button>
					<span>支持 Enter 键进行评论</span>
				</template>
				<template v-else>
					<p class="no-login">请先进行<a href="javascript:;">登录</a>，登陆后才能回复</p>
				</template>
			</div>
			<ul class="h-list" v-if="commentList.length">
				<li class="h-item" v-for="item in commentList" :key="item.id">
					<img :src="bindIMG(item.user.url)" alt="">
					<span class="h-author">{{item.user.username}}</span>
					<span class="h-date">评论于 <em>{{item.createTime |formatDate }}</em></span>
					<div>{{item.description}}</div>
				</li>
			</ul>
			<div class="not-found" v-else>暂无评论</div>
		</div> -->
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import _api from '@api'
import { hMixin } from '@mixins'
import { orderState, roomState } from '@static'
import { bindIMG } from '@utils'
export default {
	props: ['id'],
	data() {
		return {
			commentVal: '',
			commentList: [],
			orderState,
			roomState,
			itemByOrder: [],
			myDate: '',
			validateDate: {
				disabledDate(value) {
					return value.getTime() < Date.now()
				}
			}
		}
	},
	mixins: [hMixin],
	methods: {
		...mapActions(['fetchAllUser']),
		...mapMutations(['setCurrentItem']),
		bindIMG,
		async fetchCommment() {
			const { list } = await _api.getCommentList({
				size: 999,
				keyword: this.id
			})
			list.forEach((item) => {
				item.user = this.getUserById(item.userId)
			})
			this.commentList = list
		},
		async comment() {
			if (this.commentIsEmpty) return
			const commentObj = {
				description: this.commentVal,
				roomId: this.id,
				userId: this.user.id,
				createTime: Date.now()
			}
			const { success } = await _api.addComment(commentObj)
			this.handleSuccess(success, '评论', () => {
				this.commentVal = ''
				this.fetchCommment()
			})
		},
		async orderItem() {
			// 			{
			//   "createTime": "2021-12-15T16:07:10.288Z",
			//   "id": "string",
			//   "name": "string",
			//   "price": 0,
			//   "projectId": "string",
			//   "updateTime": "2021-12-15T16:07:10.288Z",
			//   "userId": "string"
			// }
			const res = await _api.addOrder({
				createTime: Date.now(),
				name: this.item.name,
				price: this.item.price,
				projectId: this.item.id,
				updateTime: Date.now(),
				userId: this.user.id
			})
			console.log(res)
			// this.$message.success('申请成功,请耐心等待预约结果')

			console.log('orderItem')
		},
		async orderRoom(flag) {
			if (flag === 0) {
				const obj = {
					price: this.item.price,
					roomId: this.item.id,
					state: 1,
					userId: this.user.id
				}
				const { success } = await _api.addOrder(obj)
				this.handleSuccess(success, '预定中...等待管理员审核', async () => {
					this.fetchOrderById(this.id)
				})
			}
		},
		async fetchOrderById(id) {
			const { list } = await _api.getOrderList({
				size: 999,
				page: 1,
				keyword: id
			})
			this.itemByOrder = list.find((item) => item.userId === this.user.id)
		}
	},
	computed: {
		...mapState({ item: 'currentItem', user: 'currentUser' }),
		...mapGetters(['getUserById']),
		isLogin() {
			return this.user !== null
		},
		commentIsEmpty() {
			return this.commentVal.trim().length === 0
		},
		itemState() {
			const { state = 0 } = this.itemByOrder || {}
			return state
		}
	},
	created() {
		this.fetchCommment()
		this.fetchAllUser()
		this.fetchOrderById(this.id)
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
	color: #003366;
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
	//   width: 50%;
	//   width: auto;
	//   width: 600px;
	flex: 1;
	height: 300px;

	img {
		width: 100%;
		height: 100%;
		vertical-align: bottom;
	}
}

.r-content {
	flex: 1;
	//   background-color: #ccc;
	padding: 0 30px;
	display: flex;
	flex-direction: column;

	.r-bd {
		flex: 1;
		background-color: #f8f8f8;
		border: 1px solid #eee;
		padding: 20px;
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
				color: #222;
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
		}
	}
	.r-ft {
		margin-top: 10px;
		display: flex;
		align-items: center;
		.my-date {
			display: flex;
			align-items: center;
			flex: 2;
			width: 100%;
			font-size: 16px;
			margin-right: 30px;
			::v-deep.el-input__inner {
				border-radius: 0;
				border-width: 2px;
			}
			& + span {
				flex: 1;
				a {
					flex: 1;
					display: inline-block;
					width: 100%;
					height: 44px;
					//   border: 2px solid @color-blue;
					line-height: 44px;
					background-color: @color-blue;
					text-align: center;
					color: #fff;
					letter-spacing: 4px;
					transition: all 0.5s ease-out;
					&:hover {
						background-color: rgba(@color-main);
						color: #fff;
					}
					&.disabled {
						pointer-events: none;
						opacity: 0.6;
						// background-color: @color-red;
						// cursor: default;
					}
					&.success {
						background-color: @color-green;
						// cursor: default;
					}
					&.primary {
						background-color: @color-main;
						// cursor: default;
					}
				}
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
.t-steps {
	padding: 40px 20px 20px;
	// text-align: center;
	margin: 0 auto;
	// display: flex;
	// justify-content: center;
	// align-items: center;
	background-color: #f0f0f0;
	::v-deep .el-steps {
		justify-content: center;
	}
}
.not-found {
	margin-top: 10px;
}
</style>
