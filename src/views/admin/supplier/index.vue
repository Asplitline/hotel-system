<template>
	<el-card class="carousel">
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
		<el-table :data="tableData" style="width: 100%" max-height="650px">
			<el-table-column prop="name" label="供应商" min-width="150">
			</el-table-column>
			<el-table-column prop="phone" label="联系电话" min-width="150">
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="150">
			</el-table-column>
			<el-table-column prop="description" label="描述" min-width="150">
			</el-table-column>
			<el-table-column prop="ctime" label="创建时间" min-width="150">
				<template v-slot="{ row }">
					{{ row.ctime | formatDate }}
				</template>
			</el-table-column>
			<el-table-column prop="utime" label="更新时间" min-width="150">
				<template v-slot="{ row }">
					{{ row.utime | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="100">
				<template v-slot="{ row }">
					<el-link type="primary" @click="showDialog(1, row)">修改供应商</el-link>
					<el-link type="danger" @click="deleteById(deleteSupplier, fetchSupplier, row.id, '供应商')">删除供应商</el-link>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :originalFileName="currentForm.flag === 0 ? '添加供应商' : '修改供应商'" :visible.sync="dialogVisible" width="30%"
			class="a-dialog" @close="clearDialog('currentForm')" :close-on-click-modal="false">
			<el-form :model="currentForm" :rules="rules" ref="currentForm" size="small" label-width="100px">
				<el-form-item label="供应商" prop="name">
					<el-input v-model="currentForm.name"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="currentForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="currentForm.address" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="currentForm.description" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="info" @click="dialogVisible = false" size="small">取 消
				</el-button>
				<el-button type="success" @click="submitDialog('currentForm', currentForm.flag)" size="small">
					{{ currentForm.flag === 0 ? '添加' : '修改' }}
				</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
import _api from '@api'
import { aMixin } from '@mixins'
import { ADD, EDIT } from '@static'
import { bindIMG, bindURL, checkPhone, deepClone, getUid } from '@utils'
import { mapActions } from 'vuex'
export default {
	data () {
		return {
			searchForm: {},
			tableData: [],
			dialogVisible: false,
			currentForm: {},
			rules: {
				name: {
					required: true,
					message: '供应商不能为空',
					trigger: 'blur'
				},
				phone: [
					{ required: true, message: '请输入电话号码', trigger: 'blur' },
					{ validator: checkPhone, trigger: 'blur' }
				],
			}
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllCategory']),
		bindURL,
		bindIMG,
		deleteSupplier: _api.deleteSupplier,
		async fetchSupplier () {
			const { list } = await _api.getSupplierList()
			this.tableData = list
		},
		// 头像上传
		handleAvatarSuccess (res, file) {
			console.log(res, file)
			this.$set(this.currentForm, 'filePath', res)
		},
		// 显示对话框
		showDialog (flag, data) {
			this.dialogVisible = true
			if (flag === ADD) {
				//
			} else if (flag === EDIT) {
				this.currentForm = deepClone(data)
			}
			this.currentForm.flag = flag
		},
		// 提交对话框
		submitDialog (formName, flag) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				this[formName].utime = Date.now()
				// 删除flag属性
				delete this[formName].flag
				console.log(this)
				if (flag === ADD) {
					Object.assign(this[formName], {
						id: getUid(),
						ctime: Date.now()
					})
					console.log(this[formName])
					const { success } = await _api.addSupplier({ ...this[formName], utime: Date.now() })
					this.handleSuccess(success, '添加', this.fetchSupplier)
				} else if (flag === EDIT) {
					const { success } = await _api.editSupplier(this[formName])
					this.handleSuccess(success, '修改', this.fetchSupplier)
				}
				this.dialogVisible = false
			})
		}
	},
	// computed: {
	// 	...mapGetters(['getMiniCategory'])
	// },
	created () {
		this.fetchSupplier()
		// this.fetchAllCategory()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';

.t-img {
	height: 80px;
	width: auto;
}

.avatar-uploader {
	padding-bottom: 0;

	.avatar {
		width: auto;
		height: 200px;
	}
}
</style>
