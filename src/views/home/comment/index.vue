<template>
	<div class="Addvice">
		<div class="Addvice-title">留言中心</div>
		<el-form :model="currentForm" ref="currentForm" :rules="rules">

			<el-form-item label="留言标题" prop="title">
				<el-input type="textarea" v-model="currentForm.title" placeholder="留言标题">
				</el-input>
			</el-form-item>
			<el-form-item label="留言内容" prop="content">
				<el-input type="textarea" v-model="currentForm.content" placeholder="想说的话">
				</el-input>
			</el-form-item>
		</el-form>
		<div class="Addvice-bottom">
			<button class="Addvice-btn t-btn" @click="handleAddvice">确认留言</button>
		</div>
		<div class="Addvice-title second">留言公示</div>
		<div class="Addvice-list">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="title" label="标题" min-width="120">
				</el-table-column>
				<el-table-column prop="content" label="留言内容" min-width="120">
				</el-table-column>
				<el-table-column prop="description" label="后台回复"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间">
					<template v-slot="{ row }">
						{{ row.updateTime | formatDate }}
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态" width="180">
					<template v-slot="{ row }">
						<el-tag :type="replyState[row.state].type">{{ replyState[row.state].value }}
						</el-tag>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="t-pagination" @size-change="handleSizeChange(fetchAddvice, $event)"
				@current-change="handleCurrentChange(fetchAddvice, $event)" :current-page="query.page" :page-size="query.size"
				layout="total, prev, pager, next" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { source, replyState } from '@static'
import _api from '@api'
import { hMixin } from '@mixins'
export default {
	mixins: [hMixin],
	data () {
		return {
			currentForm: {},
			rules: {
				title: [{ required: true, message: '请输入留言标题', trigger: blur }],
				content: [{ required: true, message: '请选择留言商品', trigger: blur }],
			},
			tableData: [],
			source,
			replyState
		}
	},
	methods: {
		...mapActions(['fetchAllItem']),
		handleAddvice () {
			this.$refs.currentForm.validate(async (valid) => {
				if (!valid) return
				if (!this.currentUser.id) {
					return this.message.error('请先登录')
				}
				const { success } = await _api.addAddvice(
					Object.assign({}, this.currentForm, {
						state: 0,
						createTime: Date.now(),
						updateTime: Date.now(),
						content: this.currentForm.content,
						userid: this.currentUser.id
					})
				)
				this.$notify({
					title: '留言',
					type: success ? 'success' : 'danger',
					message: success ? '留言成功! ' : '留言失败! '
				})
				success && this.$refs.currentForm.resetFields()
				success && this.fetchAddvice()
			})
		},
		async fetchAddvice () {
			const { list, total } = await _api.getAddviceList(this.query)
			console.log(total)
			this.total = total
			this.tableData = list
		},
		handlecontent (i) {
			return i.split('__')
		}
	},
	computed: {
		...mapState(['allItem', 'currentUser'])
	},
	mounted () {
		this.fetchAddvice()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.Addvice-title {
	letter-spacing: 4px;
	font-size: 30px;
	padding-bottom: 20px;
	color: @color-red;
	text-align: center;
	border-bottom: 1px solid #f0f0f0;

	&.second {
		margin-top: 100px;
	}
}

.Addvice-bottom {
	text-align: center;

	.Addvice-btn {
		width: 80%;
	}
}

.t-pagination {
	margin-top: 20px;
	text-align: center;
}
</style>
