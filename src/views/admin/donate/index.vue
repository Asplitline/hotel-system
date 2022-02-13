<template>
	<el-card class="notice">
		<el-table :data="tableData" style="width: 100%" max-height="650px">
			<el-table-column prop="name" label="捐赠标题" min-width="150">
			</el-table-column>
			<el-table-column prop="comment" label="捐赠内容" min-width="150">

			</el-table-column>
			<el-table-column prop="source" label="捐赠类型" min-width="150">
			</el-table-column>
			<el-table-column prop="createTime" label="捐赠时间" min-width="150">
				<template v-slot="{row}">
					{{row.createTime|formatDate}}
				</template>
			</el-table-column>
			<el-table-column prop="state" label="状态" min-width="80">
				<template v-slot="{row}">
					<el-tag :type="donateState[row.state].type">{{donateState[row.state].label}}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column label="操作" min-width="160">
				<template v-slot="{row}">
					<el-popconfirm title="是否同意捐赠？" @confirm="handleDonate(row,1)">
						<el-link type="success" slot="reference" :disabled="row.state !==0">
							通过捐赠</el-link>
					</el-popconfirm>
					<el-popconfirm title="是否拒绝捐赠？" @confirm="handleDonate(row,2)">
						<el-link type="info" slot="reference" :disabled="row.state !==0">
							拒绝捐赠</el-link>
					</el-popconfirm>

					<el-link type="danger"
						@click="deleteById(deleteDonate,fetchDonate,row.id,'捐赠')">删除捐赠</el-link>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange(fetchDonate,$event)"
			@current-change="handleCurrentChange(fetchDonate,$event)" :current-page="query.page"
			:page-sizes="[1, 2, 5, 10]" :page-size="query.size"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

	</el-card>
</template>

<script>
// import { notice } from '@mock'
import { aMixin } from '@mixins'
import _api from '@api'
import { ADD, EDIT, donateState } from '@static'
import { deepClone } from '@utils'
export default {
	data() {
		return {
			tableData: [],
			donateState
		}
	},
	methods: {
		deleteDonate: _api.deleteDonate,
		async fetchDonate() {
			const { list, total } = await _api.getDonateList(this.query)
			this.tableData = list
			this.total = total
		}, // 显示对话框
		showDialog(flag, data) {
			this.dialogVisible = true
			if (flag === ADD) {
				//
			} else if (flag === EDIT) {
				this.noticeForm = deepClone(data)
			}
			this.noticeForm.flag = flag
		},
		async handleDonate(row, state) {
			const { success } = await _api.editDonate({ id: row.id, state })
			success && this.fetchDonate()
		}
	},
	mixins: [aMixin],
	created() {},
	mounted() {
		this.fetchDonate()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
.cover {
	width: 200px;
	// height: auto;
	height: 100%;
}
</style>
