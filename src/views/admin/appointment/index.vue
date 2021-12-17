<template>
	<el-card class="comment">
		<!--  -->
		<!-- <el-form v-model="searchForm" :inline="true" size="small">
			<el-row>
				<el-col :span="4">
					<el-form-item>
						<el-input v-model="searchForm.rName" placeholder="请输入房间名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="search()">查询
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form> -->
		<!--  -->
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
					<el-link type="primary" :disabled="row.status !== 0 && row.status!==3"
						@click="handleItem(row)">
						体检审核
					</el-link>
					<!-- <el-link type="success" v-else-if="row.status === 1">入场签到</el-link> -->
					<!-- <el-link type="danger" v-else-if="row.status === 2">结束签退</el-link> -->
					<el-link type="danger" :disabled="row.status !== 4 && row.status!==3"
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
			orderState
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
		handleItem(row) {
			console.log(row)
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
			}
		}
	},
	computed: {
		...mapGetters(['getUserById', 'getItemById']),
		filterTableData() {
			// if (this.hasFilter) {
			// 	const { uName, rName } = this.searchForm
			// 	let data = deepClone(this.tableData)
			// 	if (data && uName && uName.trim().length > 0) {
			// 		data = data.filter((item) => item.user.username.indexOf(uName) !== -1)
			// 	}
			// 	if (data && rName && rName.trim().length > 0) {
			// 		data = data.filter((item) => item.room.name.indexOf(rName) !== -1)
			// 	}
			// 	this.initSearch()
			// 	return data
			// } else {
			// 	return this.tableData
			// }
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
