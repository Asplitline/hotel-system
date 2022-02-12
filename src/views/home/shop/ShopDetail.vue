<template>
	<div class="item-detail">
		<!-- <div class="h-header">体检详情<a href="javascript:;" @click="back()">返回</a></div> -->
		<div class="h-header">

			<i class="fa fa-chevron-circle-left" aria-hidden="true" @click="back()">返回</i>
		</div>
		<div class="h-title">{{item.name}}</div>
		<div class="h-content">

			<div class="l-content">
				<img :src="bindIMG(item.url)" alt="">

			</div>
			<div class="r-content">
				<!-- <div class="r-hd">{{item.name}}</div> -->
				<div class="r-bd">
					<p>
						<span>科室号码:</span><span>111</span>
					</p>
					<p>
						<span>体检类型:</span><span>1111</span>
					</p>
					<p>
						<span>所在楼层:</span><span>1111</span>
					</p>
					<p>
						<span>体检价格:</span><span class="h-price">{{item.price | $}}</span>
					</p>
					<p>
						<span>体检项简介:</span><span class="h-desc">{{item.desription }}</span>
					</p>
				</div>

			</div>

		</div>
		<div class="t-steps" v-if="false">

		</div>
		<el-empty description="暂无体检记录，请点击上方进行体检预约" class="md-empty" v-else></el-empty>
		<el-dialog title="用户反馈" :visible.sync="replyDialogVisible" width="30%"
			:close-on-click-modal="false">
			<el-form :model="replyForm" :rules="replyRules" ref="replyForm">
				<el-form-item label="用户名">
					<el-input type="text" v-model="replyForm.userName" autocomplete="off" disabled>
					</el-input>
				</el-form-item>
				<el-form-item label="医生名称">
					<el-input type="text" v-model="replyForm.doctorName" autocomplete="off"
						disabled>
					</el-input>
				</el-form-item>
				<el-form-item label="医学建议" prop="description">
					<el-input type="textarea" v-model="replyForm.description" autocomplete="off"
						disabled>
					</el-input>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input type="type" v-model="replyForm.title" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="用户反馈" prop="content">
					<el-input type="textarea" v-model="replyForm.content" autocomplete="off">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="replyDialogVisible = false">取消</el-button>
				<el-button type="primary" size="small" @click="submitReplyForm('replyForm')">
					提交
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import _api from '@api'
import { hMixin } from '@mixins'
import { orderState, roomState } from '@static'
import { bindIMG, notEmpty, deepClone } from '@utils'
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
			replyDialogVisible: false,
			replyForm: {},
			flag: 1,
			replyRules: {
				content: [
					{ required: true, message: '请输入反馈内容', trigger: 'blur' }
				],
				title: [{ required: true, message: '请输入反馈标题', trigger: 'blur' }]
			},
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
		...mapActions(['fetchAllUser', 'fetchAllNotice']),
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
		showMsg() {
			this.$message.success('请耐心等待，医生在提供建议后，在个人中心进行查看')
		},
		showReplyDialog() {
			const currentReply = this.allNotice.find(
				(i) => i.userId === this.user.id && i.doctorId === this.item.doctorId
			)
			console.log(currentReply)
			// fixme no unique tag
			this.$set(this.replyForm, 'userName', this.user.username)
			this.$set(this.replyForm, 'doctorName', this.item.doctor.username)
			this.$set(this.replyForm, 'description', currentReply.description)
			this.replyDialogVisible = true
		},
		submitReplyForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				const { success } = await _api.addAddvice({
					content: this.replyForm.content,
					ctime: Date.now(),
					description: '',
					state: 0,
					title: this.replyForm.title,
					userid: this.user.id,
					utime: Date.now()
				})
				if (success) {
					this.handleItem(5)
					this.$message.success('反馈成功，我们在收到反馈后会第一时间回复你')
				} else {
					this.$message.error('网络繁忙')
				}
				this.replyDialogVisible = false
			})
		},
		async orderItem() {
			const puchaseLoading = this.$loading({
				text: '支付中...'
			})
			setTimeout(() => {}, 2000)
			const { success: _success } = await _api.addOrder({
				createTime: Date.now(),
				name: this.item.name,
				price: this.item.price,
				projectId: this.item.id,
				updateTime: Date.now(),
				userId: this.user.id
			})
			setTimeout(async () => {
				puchaseLoading.close()
				if (_success) {
					const orderLoading = this.$loading({
						text: '申请中...'
					})
					const { success } = await _api.addAppointment({
						projectId: this.item.id,
						tjTime: this.myDate,
						createTime: Date.now(),
						updateTime: Date.now(),
						doctorId: this.item.doctorId,
						userId: this.user.id,
						status: 0
					})
					orderLoading.close()
					if (success) {
						this.$message.success('申请成功,请耐心等待预约结果')
						this.fetchCurrentAppointment()
					} else {
						this.$message.error('申请失败，服务繁忙，请稍后再试')
					}
				} else {
					this.$message.error('支付失败,服务繁忙,请稍后重试')
				}
			}, 1500)
		},
		async fetchOrderById(id) {
			const { list } = await _api.getOrderList({
				size: 999,
				page: 1,
				keyword: id
			})
			this.itemByOrder = list.find((item) => item.userId === this.user.id)
		},
		async updateItem() {
			this.fetchCurrentAppointment()
		},
		async handleItem(status) {
			const item = deepClone(this.currentAppointment)
			const { success } = await _api.editAppointment({
				...item,
				updateTime: Date.now(),
				status
			})
			if (status === 2) {
				this.handleMsg(
					success,
					'签到成功,请到前往' + this.item.department.address + '进行体检'
				)
			} else if (status === 3) {
				this.handleMsg(success, '体检完成!')
			}
			this.updateItem()
		},
		handleMsg(success, msg) {
			if (success) {
				this.updateItem()
				this.$message.success(msg)
			} else {
				this.$message.error('服务繁忙')
			}
		}
	},

	computed: {
		...mapState({
			item: 'currentItem',
			user: 'currentUser',
			allNotice: 'allNotice'
		}),
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
		},
		lastText() {
			return this.currentStatus === 3 ? '体检完成' : '体检取消'
		}
	},
	mounted() {
		this.fetchAllNotice()
		this.fetchAllUser()
		this.fetchCurrentAppointment()
		this.updateItem()
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
	color: #c91523;
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
				// background-color: rgba(@color-main);
				color: #fff;
				opacity: 0.8;
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
			}
			&.blue {
				background-color: #409eff;
			}
			&.red {
				background-color: tomato;
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
