<template>
	<el-card class="reply">
		<!--  -->
		<!--  -->
		<el-table :data="filterTableData" style="width: 100%" max-height="650px">
			<el-table-column prop="title" label="标题" min-width="120">
			</el-table-column>
			<el-table-column prop="content" label="留言内容" min-width="120">
			</el-table-column>
			<el-table-column prop="state" label="状态" min-width="60">
				<template v-slot="{ row }">
					<el-tag :type="replyState[row.state].type">{{ replyState[row.state].value }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="评论时间" min-width="80">
				<template v-slot="{ row }">
					{{ row.createTime | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="回复时间" min-width="80">
				<template v-slot="{ row }">
					{{ row.updateTime | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="80">
				<template v-slot="{ row }">
					<el-link type="primary" @click="showReplyDialog(row)" :disabled="row.state == 1">
						修改留言</el-link>
					<el-link type="danger" @click="deleteById(deleteAddvice, fetchAddvice, row.id, '评论')">
						删除留言</el-link>
				</template>
			</el-table-column>
		</el-table>
		<!--  -->
		<el-pagination @size-change="handleSizeChange(fetchAddvice, $event)"
			@current-change="handleCurrentChange(fetchAddvice, $event)" :current-page="query.page" :page-sizes="[1, 2, 5, 10]"
			:page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<el-dialog title="留言管理" :visible.sync="replyDialogVisible" width="30%" :close-on-click-modal="false">
			<el-form :model="replyForm" :rules="replyRules" ref="replyForm">
				<el-form-item label="标题" prop="title">
					<el-input type="type" v-model="replyForm.title" autocomplete="off" readonly>
					</el-input>
				</el-form-item>
				<el-form-item label="用户留言" prop="content">
					<el-input type="textarea" v-model="replyForm.content" autocomplete="off" readonly>
					</el-input>
				</el-form-item>
				<el-form-item label="后台回复" prop="description">
					<el-input type="textarea" v-model="replyForm.description" autocomplete="off">
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
	</el-card>
</template>

<script>
// import { reply } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
import { deepClone } from '@utils'
import { replyState } from '@static'
import { mapActions, mapGetters } from 'vuex'
export default {
	data () {
		return {
			searchForm: {},
			tableData: [],
			replyDialogVisible: false,
			replyForm: {},
			replyState,
			replyRules: {
				description: [
					{ required: true, message: '请输入医生回复', trigger: 'blur' }
				]
			}
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllUser']),
		deleteAddvice: _api.deleteAddvice,
		async fetchAddvice () {
			const { list, total } = await _api.getAddviceList(this.query)
			this.tableData = list
			this.total = total
		},
		showReplyDialog (row) {
			this.replyForm = deepClone(row)
			this.replyDialogVisible = true
		},
		submitReplyForm (formName) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				const { success } = await _api.editAddvice({
					...this[formName],
					utime: Date.now,
					state: 1
				})
				if (success) {
					this.$message.success('回复成功')
					this.fetchAddvice()
				} else {
					this.$message.error('服务繁忙')
				}
				this.replyDialogVisible = false
			})
		}
	},
	computed: {
		...mapGetters(['getUserById', 'getRoomById']),
		filterTableData () {
			return this.tableData
		}
	},
	created () {
		this.fetchAddvice()
		this.fetchAllUser()
	}
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
