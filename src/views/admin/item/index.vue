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
			<el-table-column prop="roomId" label="体检名称" min-width="100">
				<template v-slot="{row}">
					<!-- ques  data no response -->
					<!-- done : variable speel err -->
					{{row.room&&row.room.name}}
				</template>
			</el-table-column>
			<el-table-column prop="userId" label="体检医生" min-width="60">
				<template v-slot="{row}">
					{{row.user&&row.user.username}}
				</template>
			</el-table-column>

			<el-table-column prop="price" label="体检价格" min-width="100">
				<template v-slot="{row}">
					<el-tag type="danger" effect="plain">{{row.price | $}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="userId" label="体检科室" min-width="60">
				<template v-slot="{row}">
					{{row.user&&row.user.username}}
				</template>
			</el-table-column>
			<el-table-column prop="state" label="体检地址" min-width="100">

			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template v-slot="{row}">
					<el-link type="success" @click="handleItem(row,3)" :disabled="row.state!==1">
						同意入住</el-link>
					<el-link type="danger" @click="handleItem(row,2)" :disabled="row.state!==1">
						拒绝入住</el-link>
					<el-link type="primary" @click="handleItem(row,5)" :disabled="row.state!==4">
						退房处理
					</el-link>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="flag === 0?'添加体检项':'修改体检项'" :visible.sync="dialogVisible"
			width="30%" class="a-dialog" @close="clearDialog('itemForm')"
			:close-on-click-modal="false">
			<el-form :model="itemForm" :rules="itemRules" ref="itemForm" size="small">
				<el-form-item label="体检项名称" prop="name">
					<el-input v-model="itemForm.name" placeholder="科室名称"></el-input>
				</el-form-item>
				<el-form-item label="体检科室" prop="name">
					<el-input v-model="itemForm.name" placeholder="科室名称"></el-input>
				</el-form-item>
				<el-form-item label="体检医生" prop="address">
					<el-input v-model="itemForm.address" placeholder="科室位置"></el-input>
				</el-form-item>
				<el-form-item label="体检地址" prop="address">
					<el-input v-model="itemForm.address" placeholder="科室位置"></el-input>
				</el-form-item>
				<el-form-item label="体检价格" prop="address">
					<el-input v-model="itemForm.address" placeholder="科室位置"></el-input>
				</el-form-item>
				<el-form-item label="体检项明细" prop="description">
					<el-input type="textarea" v-model="itemForm.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="info" @click="dialogVisible = false" size="small">取 消
				</el-button>
				<el-button type="success" @click="submitDialog('itemForm',flag)" size="small">
					{{itemForm.flag === 0?'添加':'修改'}}
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
import { mapActions, mapGetters } from 'vuex'
import { deepClone } from '@utils'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			itemForm: [],
			itemRules: {},
			dialogVisible: false,
			flag: 0
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllUser', 'fetchAllRoom']),
		async fetchItem() {
			const { list, total } = await _api.getItemList(this.query)
			this.tableData = list
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
		showDialog(flag) {
			this.flag = flag
			if (flag === 0) {
				this.dialogVisible = true
			} else {
			}
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
		...mapGetters(['getUserById', 'getRoomById', 'g_doctors']),
		doctors() {
			return this.g_doctors()
		}
	},
	created() {
		this.fetchAllUser()
		this.fetchItem()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
