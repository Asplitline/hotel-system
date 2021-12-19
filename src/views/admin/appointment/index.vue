<template>
	<el-card class="comment">
		<el-table :data="filterTableData" style="width: 100%" max-height="650px">
			<el-table-column prop="project.name" label="项目名称" min-width="140">
			</el-table-column>
			<el-table-column prop="user.username" label="用户名称" min-width="80">
			</el-table-column>
			<el-table-column prop="doctor.username" label="医生名称" min-width="80">
			</el-table-column>

			<el-table-column prop="status" label="当前状态" min-width="80">
				<template v-slot="{row}">
					<el-tag :type="orderState[row.status]&&orderState[row.status].type">
						{{orderState[row.status]&&orderState[row.status].value}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="tjTime" label="体检时间" min-width="80">
				<template v-slot="{row}">
					<el-tag effect="dark" type="info">
						{{row.tjTime | formatDate(1)}}
					</el-tag>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="createTime" label="创建时间" min-width="80">
			</el-table-column> -->
			<el-table-column prop="updateTime" label="更新时间" min-width="120">
				<template v-slot="{row}">
					{{row.updateTime | formatDate}}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template v-slot="{row}">
					<el-link type="primary" :disabled="row.status !== 0 " @click="handleItem(row)">
						体检审核
					</el-link>
					<el-link type="success" :disabled="row.status!==3"
						@click="showCommentDialog(row)">
						提交医嘱
					</el-link>
					<el-link type="danger" :disabled="row.status!==5"
						@click="deleteById(deleteAppointment,fetchAppointment,row.id,'体检记录')">删除记录
					</el-link>
				</template>
			</el-table-column>
		</el-table>
		<!--  -->
		<el-pagination @size-change="handleSizeChange(fetchComment,$event)"
			@current-change="handleCurrentChange(fetchComment,$event)"
			:current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<el-dialog title="提供医嘱" :visible.sync="commentFormVisible" width="30%"
			:close-on-click-modal="false">
			<el-form :model="commentForm" :rules="commentRules" ref="commentForm">
				<el-form-item label="用户名">
					<el-input type="text" v-model="commentForm.userName" autocomplete="off"
						readonly>
					</el-input>
				</el-form-item>
				<el-form-item label="医生名称">
					<el-input type="text" v-model="commentForm.doctorName" autocomplete="off"
						readonly>
					</el-input>
				</el-form-item>
				<el-form-item label="医学建议" prop="description">
					<el-input type="textarea" v-model="commentForm.description" autocomplete="off">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="commentFormVisible = false">取消</el-button>
				<el-button type="primary" size="small" @click="submitCommentForm('commentForm')">
					提交
				</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
// import { comment } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
import { deepClone } from '@utils'
import { orderState } from '@static'
import { mapActions, mapGetters } from 'vuex'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			commentForm: {},
			commentRules: {
				description: [
					{ required: true, message: '请填入医嘱', trigger: 'blur' }
				]
			},
			currentRow: {},
			orderState,
			commentFormVisible: false
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllUser', 'fetchAllItem']),
		deleteAppointment: _api.deleteAppointment,
		async fetchAppointment() {
			const { list, total } = await _api.getAppointmentList(this.query)
			this.total = total
			this.tableData = list.map((i) => {
				const user = this.getUserById(i.userId)
				const project = this.getItemById(i.projectId)
				const doctor = this.getUserById(i.doctorId)
				return { ...i, user, project, doctor }
			})
		},
		showCommentDialog(row) {
			this.currentRow = deepClone(row)
			this.$set(this.commentForm, 'userName', row.user.username)
			this.$set(this.commentForm, 'userId', row.userId)
			this.$set(this.commentForm, 'doctorName', row.doctor.username)
			this.$set(this.commentForm, 'doctorId', row.doctor.id)
			this.commentFormVisible = true
		},
		async handleItem(row) {
			if (row.status === 0) {
				this.$confirm(
					`是否通过${row.user.username}申请${row.project.name}`,
					'提示',
					{
						confirmButtonText: '通过',
						cancelButtonText: '取消',
						type: 'success',
						center: true
					}
				).then(async () => {
					const item = deepClone(row)
					delete item.project
					delete item.doctor
					delete item.user
					const { success } = await _api.editAppointment({
						...item,
						updateTime: Date.now(),
						status: 1
					})
					if (success) {
						this.fetchAppointment()
						this.$message.success('审核通过')
					} else {
						this.$message.error('服务繁忙')
					}
				})
			} else if (row.status === 3) {
				const item = deepClone(row)
				delete item.project
				delete item.doctor
				delete item.user
				const { success } = await _api.editAppointment({
					...item,
					updateTime: Date.now(),
					status: 4
				})
				if (success) {
					this.fetchAppointment()
				} else {
					this.$message.error('服务繁忙')
				}
			}
		},
		submitCommentForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				const { success } = await _api.addNotice({
					...this[formName],
					createTime: Date.now(),
					updateTime: Date.now()
				})
				if (success) {
					this.handleItem(this.currentRow)
					this.$message.success('医学建议已提交~')
				} else {
					this.$message.error('服务繁忙')
				}
			})
			this.commentFormVisible = false
		}
	},
	computed: {
		...mapGetters(['getUserById', 'getItemById']),
		filterTableData() {
			return this.tableData
		}
	},
	mounted() {
		this.fetchAllUser()
		this.fetchAllItem()
		this.fetchAppointment()
	}
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
