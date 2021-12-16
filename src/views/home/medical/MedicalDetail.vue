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
						:picker-options="validateDate" :readonly="currentStatus !== -1">
					</el-date-picker>
					<el-popconfirm :title="'体检预约需先支付'+item.price+' , 是否同意'" icon="el-icon-info"
						icon-color="red" confirm-button-text='支付' cancel-button-text='不用了'
						class="click" v-if="currentStatus === -1" @confirm="orderItem">
						<!-- <el-button slot="reference">删除</el-button> -->
						<a href="javascript:;" slot="reference" class="primary"
							:class="{'disabled':!myDate}">预定</a>
					</el-popconfirm>
					<a href="javascript:;" v-else-if="currentStatus === 0"
						class="info click">审核中</a>

					<!-- <a href="javascript:;" class="success">预订成功</a>
					<a href="javascript:;">体检进行中</a>
					<a href="javascript:;">体检结束</a> -->
				</div>

			</div>

		</div>
		<div class="t-steps" v-if="currentStatus !== -1">x
			<el-steps :space="200" :active="currentStatus" finish-status="success">
				<!-- <el-step title="开始预定"></el-step> -->
				<el-step title="审核中"></el-step>
				<el-step title="预定成功"></el-step>
				<el-step title="体检中..."></el-step>
				<el-step title="体检完成"></el-step>
			</el-steps>

		</div>
		<el-empty description="暂无体检记录，请点击上方进行体检预约" class="md-empty" v-else></el-empty>
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
import { bindIMG, notEmpty } from '@utils'
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
			currentAppointment: [],
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

		async fetchCurrentAppointment() {
			const { list } = await _api.getAppointmentList({
				keyword: this.user.id
			})
			this.currentAppointment = list.find((i) => i.projectId === this.id)
			if (this.currentStatus !== -1) {
				this.myDate = this.currentAppointment.tjTime
			}
		},
		async orderItem() {
			const { success } = await _api.addAppointment({
				projectId: this.item.id,
				tjTime: this.myDate,
				createTime: Date.now(),
				updateTime: Date.now(),
				doctorId: this.item.doctorId,
				userId: this.user.id,
				status: 0
			})
			if (success) {
				this.$message.success('申请成功,请耐心等待预约结果')
				this.fetchCurrentAppointment()
			} else {
				this.$message.error('申请失败，服务繁忙，请稍后再试')
			}

			console.log('orderItem')
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
		},
		currentStatus() {
			return notEmpty(this.currentAppointment)
				? this.currentAppointment.status
				: -1
		}
	},
	created() {
		this.fetchCommment()
		this.fetchAllUser()
		this.fetchOrderById(this.id)
		this.fetchCurrentAppointment()
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
			& + .click {
				flex: 1;
			}
		}
		a {
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
			}
			&.success {
				background-color: @color-green;
			}
			&.primary {
				background-color: @color-main;
			}
			&.info {
				background-color: @color-yellow;
				cursor: default;
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

::v-deep .md-empty {
	background-color: #fafafa;
	p {
		color: @color-blue;
		font-size: 20px;
	}
}
</style>
