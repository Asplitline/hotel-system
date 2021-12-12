<template>
	<el-card class="item">
		<!--  -->
		<el-form v-model="searchForm" :inline="true" size="small">
			<el-row>
				<el-col :span="6">
					<el-form-item>
						<el-input v-model="searchForm.name" placeholder="请输入项目名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="search()">
							查询
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="showDialog(0)">
							新增体检项
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table :data="tableData" style="width: 100%" max-height="650px">
			<el-table-column prop="roomId" label="体检名称" min-width="80">
				<template v-slot="{row}">
					{{row.name}}
				</template>
			</el-table-column>
			<el-table-column prop="price" label="体检价格" min-width="80">
				<template v-slot="{row}">
					<el-tag type="danger" effect="plain">{{row.price | $}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="doctorName" label="体检医生" min-width="80">
			</el-table-column>
			<el-table-column prop="types.name" label="体检类型" min-width="80">

			</el-table-column>
			<el-table-column prop="department.name" label="体检科室" min-width="100">
			</el-table-column>
			<el-table-column prop="address" label="体检地址" min-width="100">
				<template v-slot="{row}">
					{{row.address}}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template v-slot="{row}">
					<el-link type="primary" @click="showDialog(1,row)">
						修改体检项</el-link>
					<el-link type="danger" @click="deleteById(deleteItem,fetchItem,row.id,'用户')">
						删除体检项
					</el-link>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="flag === 0?'添加体检项':'修改体检项'" :visible.sync="dialogVisible"
			width="30%" class="a-dialog" @close="clearDialog('itemForm')"
			:close-on-click-modal="false">
			<el-form :model="itemForm" :rules="itemRules" ref="itemForm" size="small"
				label-width="100px">
				<el-form-item label="体检项名称" prop="name">
					<el-input v-model="itemForm.name" placeholder="体检项名称"></el-input>
				</el-form-item>
				<el-form-item label="体检科室" prop="depaetmentId">
					<el-select v-model="itemForm.depaetmentId" placeholder="体检科室">
						<el-option v-for="item in allRoom" :key="item.id" :label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="体检医生" prop="doctorId">
					<el-select v-model="itemForm.doctorId" placeholder="科室位置">
						<el-option v-for="item in doctors" :key="item.id" :label="item.username"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="体检类型" prop="doctorId">
					<el-select v-model="itemForm.typeId" placeholder="科室位置">
						<el-option v-for="item in allCategory" :key="item.id" :label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="体检地址" prop="address">
					<el-input v-model="itemForm.address" placeholder="体检地址"></el-input>
				</el-form-item>
				<el-form-item label="体检价格" prop="price">
					<el-input v-model="itemForm.price" placeholder="体检价格"></el-input>
				</el-form-item>
				<el-form-item label="体检项明细" prop="description">
					<el-input type="textarea" v-model="itemForm.desription"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="info" @click="dialogVisible = false" size="small">取 消
				</el-button>
				<el-button type="success" @click="submitDialog('itemForm',flag)" size="small">
					{{flag === 0?'添加':'修改'}}
				</el-button>
			</span>
		</el-dialog>
		<el-pagination @size-change="handleSizeChange(fetchItem,$event)"
			@current-change="handleCurrentChange(fetchItem,$event)" :current-page="query.page"
			:page-sizes="[1, 2, 5, 10]" :page-size="query.size"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</el-card>
</template>

<script>
// import { order } from '@mock'
import { aMixin } from '@mixins'
import { ACCEPT, REJECT, FINISH } from '@static'
import _api from '@api'
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepClone } from '@utils'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			itemForm: {},
			itemRules: {
				name: [{ required: true, message: '请输入体检名称', trigger: 'blur' }],
				depaetmentId: [
					{ required: true, message: '请选择体检科室', trigger: 'blur' }
				],
				doctorId: [
					{ required: true, message: '请选择体检医生', trigger: 'blur' }
				],
				typeId: [
					{ required: true, message: '请选择体检类型', trigger: 'blur' }
				],
				address: [
					{ required: true, message: '请输入体检价格', trigger: 'blur' }
				],
				price: [{ required: true, message: '请输入体检科室', trigger: 'blur' }]
				// description: [
				// 	{ required: true, message: '请输入体检地址', trigger: 'blur' }
				// ]
			},
			dialogVisible: false,
			flag: 0
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllUser', 'fetchAllRoom', 'fetchAllCategory']),
		deleteItem: _api.deleteItem,

		async fetchItem() {
			const { list, total } = await _api.getItemList(this.query)
			this.tableData = list.map((i) => {
				const department = this.getRoomById(i.depaetmentId)
				const types = this.getCategoryById(i.typeId)
				return { ...i, department, types }
			})
			this.total = total
		},
		async handleItem(data, flag) {
			data = deepClone(data)
			switch (flag) {
				case ACCEPT:
					this.confirmInfo(data, flag, '将同意客户入住', this.fetchItem, 1)
					break
				case REJECT:
					this.confirmInfo(data, flag, '将拒绝客户入住', this.fetchItem)
					break
				case FINISH:
					this.confirmInfo(data, flag, '将为客人退房', this.fetchItem, 0)
					break
			}
		},
		showDialog(flag, row) {
			this.flag = flag
			if (flag === 0) {
			} else {
				this.itemForm = deepClone(row)
			}
			this.dialogVisible = true
		},
		submitDialog(formName, flag) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				if (flag === 0) {
					const currentDoctor = this.doctors.find(
						(i) => i.id === this[formName].doctorId
					)
					Object.assign(this[formName], {
						createTime: Date.now(),
						updateTime: Date.now(),
						doctorName: currentDoctor.username
					})
					const { success } = await _api.addItem(this[formName])
					this.handleSuccess(success, '添加', this.fetchItem)
					this.dialogVisible = false
				} else if (flag === 1) {
					delete this[formName].department
					const { success } = await _api.editItem(this[formName])
					this.handleSuccess(success, '修改', this.fetchItem)
					this.dialogVisible = false
				}
			})
		},
		confirmInfo(data, flag, info, callback, roomFlag) {
			this.$confirm(info + ', 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					const { success: oSuccess } = await _api.editOrder({
						id: data.id,
						state: flag
					})
					const { success: rSuccess = true } =
						roomFlag !== undefined &&
						(await _api.editRoom({
							id: data.roomId,
							state: roomFlag
						}))

					if (oSuccess && rSuccess) {
						this.$message.success('操作成功')
						callback && callback()
					}
				})
				.catch(() => {
					this.$message.warning('操作已取消')
				})
		}
	},
	computed: {
		...mapGetters([
			'getUserById',
			'getRoomById',
			'g_doctors',
			'getCategoryById'
		]),
		...mapState(['allRoom', 'allCategory']),
		doctors() {
			return this.g_doctors()
		}
	},
	created() {
		this.fetchAllUser()
		this.fetchAllRoom()
		this.fetchAllCategory()
		this.fetchItem()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
