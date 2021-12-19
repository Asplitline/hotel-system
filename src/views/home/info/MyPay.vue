<template>
	<div class="my-order">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="订单号" min-width="200">
			</el-table-column>
			<el-table-column prop="price" label="项目名称" min-width="100">
			</el-table-column>
			<el-table-column prop="price" label="预定价格" min-width="100">
				<template v-slot="{row}">
					<el-tag type="danger" effect="plain">{{row.price | $}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="支付时间" min-width="100">
				<template v-slot="{row}">
					{{row.creatTime || Date.now() | formatDate}}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="100">
				<template v-slot="{row}">
					<el-link type="danger"
						@click="deleteById(deleteOrder,fetchOrder,row.id,'支付记录')">
						删除记录</el-link>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { hMixin } from '@mixins'
import _api from '@api'
export default {
	props: {
		id: {
			type: String
		}
	},
	mixins: [hMixin],
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		deleteOrder: _api.deleteOrder,
		async fetchOrder() {
			const { data } = await _api.getOrders()
			this.tableData = data.filter((i) => this.id === i.userId)
		}
	},
	computed: {},
	created() {
		this.fetchOrder()
	}
}
</script>

<style lang="less" scoped>
.el-pagination {
	margin-top: 10px;
}
.el-link {
	margin-right: 10px;
}
</style>
