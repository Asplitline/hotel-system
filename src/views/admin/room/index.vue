<template>
	<el-card class="room">
		<!--  -->
		<el-form v-model="searchForm" :inline="true" size="small">
			<el-row justify="space-between" type="flex">
				<!-- <el-col :span="10">
					<el-form-item label="科室号码">
						<el-input v-model="query.keyword" placeholder="请输入房号" clearable
							@clear="fetchRoom" />
					</el-form-item>
					<el-button type="primary" icon="el-icon-search" size="small" @click="fetchRoom">
						查询
					</el-button>
				</el-col> -->
				<el-col :span="4">
					<el-form-item>
						<el-button type="success" icon="el-icon-plus" @click="showDialog(0)">
							新增
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--  -->
		<el-table :data="tableData" style="width: 100%" max-height="600px">
			<el-table-column prop="url" label="科室图片" min-width="240">
				<template v-slot="{row}">
					<img :src="bindIMG(row.url)" alt="" class="cover">
				</template>
			</el-table-column>
			<el-table-column prop="number" label="科室名称" min-width="100">
				<template v-slot="{row}">
					<el-tag type="warning">{{row.name}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="url" label="科室位置" min-width="120">
				<template v-slot="{row}">
					<el-tag type="primary">{{row.address}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="url" label="创建时间" min-width="120">
				<template v-slot="{row}">
					{{row.createTime | formatDate }}
				</template>
			</el-table-column>
			<el-table-column prop="url" label="更新时间" min-width="120">
				<template v-slot="{row}">
					{{row.updateTime | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template v-slot="{row}">
					<el-link type="primary" @click="showDialog(1,row)">更新科室</el-link>
					<el-link type="danger" @click="deleteById(deleteRoom,fetchRoom,row.id,'科室')">
						删除科室</el-link>
				</template>
			</el-table-column>
		</el-table>
		<!--  -->
		<el-pagination @size-change="handleSizeChange(fetchRoom,$event)"
			@current-change="handleCurrentChange(fetchRoom,$event)" :current-page="query.page"
			:page-sizes="[1, 2, 5, 10]" :page-size="query.size"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!--  -->
		<el-dialog :title="roomForm.flag === 0?'添加科室':'修改科室'" :visible.sync="dialogVisible"
			width="30%" class="a-dialog" @close="clearDialog('roomForm')"
			:close-on-click-modal="false">
			<el-form :model="roomForm" :rules="roomRules" ref="roomForm" size="small">
				<el-form-item label="科室图片" prop="url">
					<el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
						:show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="roomForm.url" :src="bindIMG(roomForm.url)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="科室名称" prop="name">
					<el-input v-model="roomForm.name" placeholder="科室名称"></el-input>
				</el-form-item>
				<el-form-item label="科室位置" prop="address">
					<el-input v-model="roomForm.address" placeholder="科室位置"></el-input>
				</el-form-item>
				<el-form-item label="科室描述" prop="description">
					<el-input type="textarea" v-model="roomForm.description"></el-input>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="info" @click="dialogVisible = false" size="small">取 消
				</el-button>
				<el-button type="success" @click="submitDialog('roomForm',roomForm.flag)"
					size="small">
					{{roomForm.flag === 0?'添加':'修改'}}
				</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
// import { room } from '@mock'
import { aMixin } from '@mixins'
import { roomState, ADD, EDIT } from '@static'
import { mapActions, mapGetters } from 'vuex'
import _api from '@api'
import { bindURL, bindIMG, getUid, deepClone } from '@utils'
export default {
	data() {
		const validateAddress = (rule, value, callback) => {
			const reg = /^\d+$/g
			if (!reg.test(value)) {
				callback(new Error('科室位置由数字构成'))
			} else {
				const num = Number(value)
				if (num >= 100 && num < 500) {
					callback()
				} else {
					callback(new Error('目前仅开放100-499科室'))
				}
			}
		}
		return {
			searchForm: {},
			tableData: [],
			roomState,
			dialogVisible: false,
			roomRules: {
				url: [{ required: true, message: '选择科室图片', trigger: 'blur' }],
				name: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
				address: [
					{ required: true, message: '填入科室地址', trigger: 'blur' },
					{
						validator: validateAddress,
						trigger: 'blur'
					}
				],
				description: [
					{ required: true, message: '为科室添加描述', trigger: 'blur' }
				]
			},
			roomForm: {}
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllCategory']),
		deleteRoom: _api.deleteRoom,
		bindURL,
		bindIMG,
		async fetchRoom() {
			try {
				const { list, total } = await _api.getRoomList(this.query)
				this.tableData = list
				this.total = total
			} catch (error) {
				console.log(error)
			}
		},
		// 显示对话框
		showDialog(flag, data) {
			this.dialogVisible = true
			if (flag === ADD) {
				//
			} else if (flag === EDIT) {
				this.roomForm = deepClone(data)
			}
			this.roomForm.flag = flag
		},
		// 提交对话框
		submitDialog(formName, flag) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				delete this[formName].flag
				if (flag === ADD) {
					Object.assign(this[formName], {
						id: getUid(),
						createTime: Date.now(),
						updateTime: Date.now()
					})
					const { success } = await _api.addRoom(this[formName])
					this.handleSuccess(success, '添加', this.fetchRoom)
				} else if (flag === EDIT) {
					const { success } = await _api.editRoom(this[formName])
					this.handleSuccess(success, '修改', this.fetchRoom)
				}
				this.dialogVisible = false
			})
		},
		// 头像上传
		handleAvatarSuccess(res, file) {
			this.$set(this.roomForm, 'url', res)
		}
	},
	computed: {
		...mapGetters(['getMiniCategory', 'getCategoryById'])
	},
	created() {
		this.fetchRoom()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
.cover {
	width: 200px;
	height: auto;
}
</style>
