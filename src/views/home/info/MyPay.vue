<template>
	<div class="my-order">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="goodsName" label="商品" min-width="100">
			</el-table-column>
			<el-table-column prop="price" label="价格" min-width="100">
				<template v-slot="{ row }">
					<el-tag type="danger" effect="plain">{{ row.price | $ }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="状态" min-width="100">
				<template v-slot="{ row }">
					<el-tag :type="orderState[row.status].type">{{ orderState[row.status].label }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="购买时间" min-width="100">
				<template v-slot="{ row }">
					{{ row.creatTime || Date.now() | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="100">
				<template v-slot="{ row }">
					<el-popconfirm title="是否确认收货" @confirm="handleOrder(row, 3)">
						<el-link type="success" :disabled="row.status !== 2" slot="reference">
							确认收货</el-link>
					</el-popconfirm>
					<el-link type="danger" @click="deleteById(deleteOrder, fetchOrder, row.id, '支付记录')"
						:disabled="row.status !== 3">
						删除记录</el-link>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="t-pagination" @size-change="handleSizeChange(fetchOrder, $event)"
			@current-change="handleCurrentChange(fetchOrder, $event)" :current-page="query.page" :page-size="query.size"
			layout="total, prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script>
import { hMixin } from '@mixins'
import { orderState } from '@static'
import _api from '@api'
export default {
	props: {
		id: {
			type: Number
		}
	},
	mixins: [hMixin],
	data () {
		return {
			tableData: [],
			orderState
		}
	},
	methods: {
		deleteOrder: _api.deleteGoodsOrder,
		async fetchOrder () {
			const { list } = await _api.getGoodsOrderList()
			this.tableData = list.filter((i) => i.userId === this.id.toString())
		},
		async handleOrder (i, status) {
			const { success } = await _api.editGoodsOrder({ id: i.id, status })
			success && this.fetchOrder()
		}
	},
	computed: {},
	created () {
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

.t-pagination {
	margin-top: 20px;
	text-align: center;
}
</style>
