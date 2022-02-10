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
			<el-table-column prop="name" label="封面" min-width="200">
				<template v-slot="{row}">
					<img :src="bindIMG(row.filePath)" class="t-img">
				</template>
			</el-table-column>
			<el-table-column prop="originalFileName" label="标题" min-width="150">
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
					<el-link type="primary" @click="showDialog(1,row)">修改轮播图</el-link>
					<el-link type="danger"
						@click="deleteById(deleteCategory,fetchCategory,row.id,'轮播图')">删除轮播图</el-link>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :originalFileName="carouselForm.flag === 0?'添加轮播图':'修改轮播图'"
			:visible.sync="dialogVisible" width="30%" class="a-dialog"
			@close="clearDialog('carouselForm')" :close-on-click-modal="false">
			<el-form :model="carouselForm" :rules="carouselRules" ref="carouselForm"
				size="small" label-width="100px">
				<el-form-item prop="filePath" label-width="0">
					<el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
						:show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="carouselForm.filePath" :src="bindIMG(carouselForm.filePath)"
							class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="轮播图标题" prop="originalFileName">
					<el-input v-model="carouselForm.originalFileName"></el-input>
				</el-form-item>
				<el-form-item label="轮播图内容" prop="fullFilePath">
					<el-input v-model="carouselForm.fullFilePath" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="info" @click="dialogVisible = false" size="small">取 消
				</el-button>
				<el-button type="success" @click="submitDialog('carouselForm',carouselForm.flag)"
					size="small">
					{{carouselForm.flag === 0?'添加':'修改'}}
				</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
// todo del carousel
import { aMixin } from '@mixins'
import { ADD, EDIT } from '@static'
import _api from '@api'
import { deepClone, getUid, bindURL, bindIMG } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			dialogVisible: false,
			carouselForm: {},
			carouselRules: {
				filePath: { required: true, message: '请选择图片', trigger: blur },
				originalFileName: {
					required: true,
					message: '请输入标题',
					trigger: blur
				},
				fullFilePath: {
					required: true,
					message: '请输入标题',
					trigger: blur
				}
			}
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllCategory']),
		bindURL,
		bindIMG,
		deleteCategory: _api.deleteCategory,
		async fetchCategory() {
			const { data: list } = await _api.getShopFile()
			this.tableData = list
		},
		// 头像上传
		handleAvatarSuccess(res, file) {
			console.log(res, file)
			this.$set(this.carouselForm, 'filePath', res)
		},
		// 显示对话框
		showDialog(flag, data) {
			this.dialogVisible = true
			if (flag === ADD) {
				//
			} else if (flag === EDIT) {
				this.carouselForm = deepClone(data)
			}
			this.carouselForm.flag = flag
		},
		// 提交对话框
		submitDialog(formName, flag) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				this[formName].updateTime = Date.now()
				// 删除flag属性
				delete this[formName].flag
				console.log(this)
				if (flag === ADD) {
					Object.assign(this[formName], {
						id: getUid(),
						createTime: Date.now()
					})
					console.log(this[formName])
					const { success } = await _api.addShopFile(this[formName])
					this.handleSuccess(success, '添加', this.fetchCategory)
				} else if (flag === EDIT) {
					const { success } = await _api.editShopFile(this[formName])
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
