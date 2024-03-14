<template>
	<el-card class="comment">
		<el-form :inline="true" size="small">
			<el-row>
				<el-col :span="2" :offset="22">
					<el-form-item>
						<el-button type="success" icon="el-icon-plus" @click="showDialog(0)">新增
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="drugName" label="商品" min-width="100">
			</el-table-column>
			<el-table-column prop="supplierName" label="供应商" min-width="100">
			</el-table-column>
			<el-table-column prop="reson" label="采购原因" min-width="100">
			</el-table-column>
			<el-table-column prop="number" label="采购数量" min-width="100">
			</el-table-column>
			<el-table-column prop="status" label="状态" min-width="100">
				<template v-slot="{ row }">
					<el-tag :type="procureOrderState[row.status].type">{{ procureOrderState[row.status].label }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="100">
				<template v-slot="{ row }">
					<template v-if="!isAdmin">
						<el-link type="primary" :disabled="+row.status !== 0" slot="reference" @click="showDialog(1, row)">
							编辑订单</el-link>
					</template>
					<template v-else>
						<el-link type="primary" :disabled="+row.status !== 0" slot="reference" @click="showDialog(2, row)">
							审核订单</el-link>
					</template>
					<el-link type="danger" @click="deleteById(deleteOrder, fetchProcureOrder, row.id, '采购记录')"
						:disabled="!isAdmin && row.status === 0">
						删除记录</el-link>
				</template>
			</el-table-column>
		</el-table>
		<!--  -->
		<el-pagination @size-change="handleSizeChange(fetchComment, $event)"
			@current-change="handleCurrentChange(fetchComment, $event)" :current-page="query.page" :page-sizes="[1, 2, 5, 10]"
			:page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<el-dialog :title="currentForm.flag === 0 ? '添加采购订单' : currentForm.flag === 1 ? '修改采购订单' : '审核采购订单'"
			:visible.sync="dialogVisible" width="40%" class="a-dialog" @close="clearDialog('currentForm')"
			:close-on-click-modal="false">
			<el-form :model="currentForm" :rules="rules" ref="currentForm" size="small" label-width="100px"
				:disabled="currentForm.flag === 2">
				<el-form-item label="商品" prop="goodsid">
					<el-select v-model="currentForm.goodsid">
						<el-option v-for="i in allItem" :key="i.id" :value="i.id" :label="i.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="供应商" prop="supplier">
					<el-select v-model="currentForm.supplier">
						<el-option v-for="i in allSupplier" :key="i.id" :value="i.id" :label="i.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采购数量" prop="number">
					<el-input v-model.number="currentForm.number" type="number" placeholder="采购数量">
					</el-input>
				</el-form-item>
				<el-form-item label="采购原因" prop="reson">
					<el-input v-model="currentForm.reson" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<template v-if="currentForm.flag === 2">
					<el-button type="danger" @click="submitDialog('currentForm', 3, 2)" size="small">
						拒绝申请
					</el-button>
					<el-button type="success" @click="submitDialog('currentForm', 3, 1)" size="small">
						同意申请
					</el-button>
				</template>
				<template v-else>
					<el-button type="info" @click="dialogVisible = false" size="small">取 消
					</el-button>
					<el-button type="success" @click="submitDialog('currentForm', currentForm.flag)" size="small">
						{{ currentForm.flag === 0 ? '添加' : '修改' }}
					</el-button>
				</template>

			</span>
		</el-dialog>
	</el-card>
</template>

<script>
import _api from '@api'
import { aMixin } from '@mixins'
import { ADD, EDIT, OTHER, procureOrderState } from '@static'
import { deepClone } from '@utils'

import { mapActions, mapState } from 'vuex'
export default {
	data () {
		return {
			tableData: [],
			procureOrderState,
			currentForm: {},
			rules: {
				name: { required: true, message: '请输入商品类型', trigger: 'blur' },
				goodsid: {
					required: true,
					message: '请选择商品',
					trigger: 'blur'
				},
				supplier: {
					required: true,
					message: '请选择供应商',
					trigger: 'blur'
				},
				number: {
					required: true,
					// type: 'number',
					message: '采购数量不能为空',
					trigger: 'blur'
				}
			},
			parentCategory: [],
			dialogVisible: false
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllItem', 'fetchAllSupplier']),
		deleteOrder: _api.deleteProcureOrder,
		async fetchProcureOrder () {
			const { list } = await _api.getProcureOrderList()
			this.tableData = list.map(item => {
				const good = this.allItem.find(i => i.id === item.goodsid)
				const supplier = this.allSupplier.find(i => i.id === item.supplier)
				return {
					...item,
					drugName: good?.name || '',
					supplierName: supplier?.name || ''
				}
			})
		},

		async handleOrder (i, status) {
			const { success } = await _api.editProcureOrder({ id: i.id, status })
			this.handleSuccess(success, ['', '派送', '送达'][status], this.fetchProcureOrder)
		},
		showDialog (flag, data) {
			this.dialogVisible = true
			if (flag === ADD) {
				//
			} else if (flag === EDIT || flag === OTHER) {
				this.currentForm = deepClone(data)
			}
			this.currentForm.flag = flag
		},
		// 提交对话框
		submitDialog (formName, flag, status) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				this[formName].updateTime = Date.now()
				// 删除flag属性
				delete this[formName].flag
				if (flag === ADD) {
					Object.assign(this[formName], {
						createTime: Date.now(),
						status: 0,
					})
					const { success } = await _api.addProcureOrder(this[formName])
					this.handleSuccess(success, '添加', this.fetchProcureOrder)
				} else if (flag === EDIT) {
					const { success } = await _api.editProcureOrder(this[formName])
					this.handleSuccess(success, '修改', this.fetchProcureOrder)
				} else {
					const { success } = await _api.editProcureOrder({ ...this[formName], status: status })
					this.handleSuccess(success, '操作', this.fetchProcureOrder)
				}
				this.dialogVisible = false
			})
		}
	},
	computed: {
		...mapState(['allItem', 'allSupplier']),
		filterTableData () {
			return this.tableData
		}
	},
	async mounted () {
		await this.fetchAllItem()
		await this.fetchAllSupplier()
		this.fetchProcureOrder()
		console.log('this.isAdmin', this.isAdmin)
	}
}
</script>
<style lang="less">
@import '~@css/acommon.less';
</style>
