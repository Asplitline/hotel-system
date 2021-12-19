<template>
	<el-card class="comment">

		<el-table :data="filterTableData" style="width: 100%" max-height="650px">
			<el-table-column prop="user.username" label="用户名" min-width="80">
				<template v-slot="{row}">
					<el-tag type="success">{{row.user.username}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="doctor.username" label="医生名称" min-width="80">
				<template v-slot="{row}">
					<el-tag type="primary">{{row.doctor.username}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="roomId" label="医嘱" min-width="120">
				<template v-slot="{row}">
					<el-tooltip :content="row.description" placement="bottom" effect="light">
						<p>{{row.description}}</p>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="100">
				<template v-slot="{row}">
					{{row.createTime | formatDate}}
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="修改时间" min-width="100">
				<template v-slot="{row}">
					{{row.updateTime | formatDate}}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="60">
				<template v-slot="{row}">
					<el-link type="danger"
						@click="deleteById(deleteComment,fetchComment,row.id,'医嘱')">
						删除医嘱</el-link>
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
// import { deepClone } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
	data() {
		return {
			searchForm: {},
			tableData: []
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllUser', 'fetchAllRoom']),
		deleteComment: _api.deleteComment,
		async fetchComment() {
			const { data: list } = await _api.getComments(this.query)
			this.tableData = list.map((item) => {
				const user = this.getUserById(item.userId)
				const doctor = this.getUserById(item.doctorId)
				return { ...item, user, doctor }
			})
			// this.tableData = list
			// this.total = total
		}
	},
	computed: {
		...mapGetters(['getUserById', 'getRoomById']),
		filterTableData() {
			return this.tableData
		}
	},
	created() {
		this.fetchComment()
		this.fetchAllUser()
		this.fetchAllRoom()
	}
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
