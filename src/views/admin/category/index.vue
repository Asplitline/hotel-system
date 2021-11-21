<template>
	<el-card class="room">
		<!--  -->
		<el-form v-model="searchForm" :inline="true" size="small">
			<el-row>

				<el-col :span="2" :offset="22">
					<el-form-item>
						<el-button type="success" icon="el-icon-plus" @click="showDialog(0)">新增
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--  -->
		<el-table :data="tableData" style="width: 100%" max-height="650px">
			<el-table-column prop="name" label="体检类型" min-width="100">
			</el-table-column>
			<el-table-column prop="description" label="类型描述" min-width="150">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="150">
				<template v-slot="{row}">
					{{row.createTime|formatDate}}
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="150">
				<template v-slot="{row}">
					{{row.updateTime|formatDate}}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="100">
				<template v-slot="{row}">
					<el-link type="primary" @click="showDialog(1,row)">修改类型</el-link>
					<el-link type="danger"
						@click="deleteById(deleteCategory,fetchCategory,row.id,'房型')">删除类型</el-link>
				</template>
			</el-table-column>
		</el-table>
		<!--  -->
		<el-pagination @size-change="handleSizeChange(fetchCategory,$event)"
			@current-change="handleCurrentChange(fetchCategory,$event)"
			:current-page="query.page" :page-sizes="[1, 2, 5, 10]" :page-size="query.size"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!--  -->
		<el-dialog :title="categoryForm.flag === 0?'添加房型':'修改房型'"
			:visible.sync="dialogVisible" width="30%" class="a-dialog"
			@close="clearDialog('categoryForm')" :close-on-click-modal="false">
			<el-form :model="categoryForm" :rules="categoryRules" ref="categoryForm"
				size="small" label-width="100px">
				<el-form-item label="体检类型" prop="name">
					<el-input v-model="categoryForm.name"></el-input>
				</el-form-item>
				<el-form-item label="类型简介" prop="description">
					<el-input v-model="categoryForm.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="info" @click="dialogVisible = false" size="small">取 消
				</el-button>
				<el-button type="success" @click="submitDialog('categoryForm',categoryForm.flag)"
					size="small">
					{{categoryForm.flag === 0?'添加':'修改'}}
				</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
// import { category } from '@mock'
import { aMixin } from '@mixins'
import { ADD, EDIT } from '@static'
import _api from '@api'
import { getUid, deepClone } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			dialogVisible: false,
			categoryForm: {},
			categoryRules: {
				name: { required: true, message: '请输入房间类型', trigger: blur },
				description: {
					required: true,
					message: '请补充房间类型',
					trigger: blur
				}
			}
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllCategory']),
		deleteCategory: _api.deleteCategory,
		async fetchCategory() {
			const { list, total } = await _api.getCategoryList(this.query)
			this.tableData = list
			this.total = total
		},
		// 显示对话框
		showDialog(flag, data) {
			this.dialogVisible = true
			if (flag === ADD) {
				//
			} else if (flag === EDIT) {
				this.categoryForm = deepClone(data)
			}
			this.categoryForm.flag = flag
		},
		// 提交对话框
		submitDialog(formName, flag) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				this[formName].updateTime = Date.now()
				// 删除flag属性
				delete this[formName].flag
				if (flag === ADD) {
					Object.assign(this[formName], {
						id: getUid(),
						createTime: Date.now()
					})
					const { success } = await _api.addCategory(this[formName])
					this.handleSuccess(success, '添加', this.fetchCategory)
				} else if (flag === EDIT) {
					const { success } = await _api.editCategory(this[formName])
					this.handleSuccess(success, '修改', this.fetchCategory)
				}
				this.dialogVisible = false
			})
		}
	},
	computed: {
		...mapGetters(['getMiniCategory'])
	},
	created() {
		this.fetchCategory()
		this.fetchAllCategory()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
