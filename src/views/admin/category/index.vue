<template>
	<el-card class="room">
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
		<el-table :data="tableData" style="width: 100%" max-height="650px" row-key="id"
			:tree-props="{children: 'children'}">
			>
			<el-table-column prop="name" label="商品类型" min-width="100">
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
					<el-link type="primary" @click="showDialog(1,row)">修改商品类型</el-link>
					<el-link type="danger"
						@click="deleteById(deleteCategory,fetchCategory,row.id,'商品类型')">删除商品类型
					</el-link>
				</template>
			</el-table-column>
		</el-table>

		<!--  -->
		<el-dialog :title="categoryForm.flag === 0?'添加商品类型':'修改商品类型'"
			:visible.sync="dialogVisible" width="30%" class="a-dialog"
			@close="clearDialog('categoryForm')" :close-on-click-modal="false">
			<el-form :model="categoryForm" :rules="categoryRules" ref="categoryForm"
				size="small" label-width="100px">
				<el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
					:show-file-list="false" :on-success="handleAvatarSuccess">
					<img v-if="categoryForm.icon" :src="bindIMG(categoryForm.icon)" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-form-item label="父级商品类型" prop="pid">
					<el-select v-model="categoryForm.pid">
						<el-option v-for="i in parentCategory" :key="i.id" :value="i.id"
							:label="i.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品类型" prop="name">
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
import { aMixin } from '@mixins'
import { ADD, EDIT } from '@static'
import _api from '@api'
import { getUid, deepClone, bindURL, bindIMG } from '@utils'
import { mapActions } from 'vuex'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			dialogVisible: false,
			categoryForm: {},
			categoryRules: {
				name: { required: true, message: '请输入商品类型', trigger: blur },
				description: {
					required: true,
					message: '请补充商品类型',
					trigger: blur
				},
				icon: {
					required: true,
					message: '请选择商品商品类型图片',
					trigger: blur
				}
			},
			parentCategory: []
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllCategory']),
		deleteCategory: _api.deleteCategory,
		bindURL,
		bindIMG,

		async fetchCategory() {
			const { data: list } = await _api.getCategories()
			const parent = list.filter((i) => i.pid == null)
			this.parentCategory = parent
			this.tableData = parent.map((i) => {
				const children = list.filter((j) => j.pid === i.id)
				return {
					...i,
					children
				}
			})
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
		// 头像上传
		handleAvatarSuccess(res, file) {
			this.$set(this.categoryForm, 'icon', res)
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
	computed: {},
	mounted() {
		this.fetchCategory()
	},
	created() {}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
