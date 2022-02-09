<template>
	<el-card class="item">
		<!--  -->
		<el-form v-model="searchForm" :inline="true" size="small">
			<el-row type="flex" justify="space-between">
				<el-col :span="6">
					<el-form-item>
						<el-input v-model="searchForm.name" placeholder="输入商品名称" clearable />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="search">
							查询
						</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item>
						<el-button type="success" @click="showDialog(0)">
							新增商品
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table :data="tableData" style="width: 100%" max-height="650px" class="demo-table">
			<el-table-column type="expand">
				<template v-slot="{row}">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="商品名称">
							<span>{{ row.name }}</span>
						</el-form-item>
						<el-form-item label="商品 ID">
							<span>{{ row.id }}</span>
						</el-form-item>
						<el-form-item label="商品分类">
							<span>{{ row.typeInfo.name }}</span>
						</el-form-item>
						<el-form-item label="商品产地">
							<span>{{ row.address }}</span>
						</el-form-item>
						<el-form-item label="商品库存">
							<span>{{ row.num }}</span>
						</el-form-item>
						<el-form-item label="商品价格">
							<span>{{ row.price }}</span>
						</el-form-item>
						<el-form-item label="添加时间">
							<span>{{ row.createTime | formatDate }}</span>
						</el-form-item>
						<el-form-item label="修改时间">
							<span>{{ row.updateTime  | formatDate}}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="url" label="商品图片" min-width="160">
				<template v-slot="{row}">
					<img :src="bindIMG(row.url)" alt="" class="tb-avatar" />
				</template>
			</el-table-column>
			<el-table-column prop="roomId" label="商品名称" min-width="160">
				<template v-slot="{row}">
					{{row.name}}
				</template>
			</el-table-column>
			<el-table-column prop="typeInfo.name" label="商品分类" min-width="100">
			</el-table-column>
			<el-table-column prop="price" label="商品价格" min-width="80">
				<template v-slot="{row}">
					<el-tag type="danger" effect="plain">{{row.price }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="上架状态" min-width="100">
				<template v-slot="{row}">
					<el-tag :type="row.statusInfo.type">{{row.statusInfo.label }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template v-slot="{row}">
					<el-link :type="row.status===0?'success':'warning'" @click="toggleStatus(row)">
						{{row.status===0?'上架商品':'下架商品'}} </el-link>
					<el-link type="primary" @click="showDialog(1,row)">
						修改商品</el-link>
					<el-link type="danger" @click="deleteById(deleteItem,fetchItem,row.id,'用户')">
						删除商品
					</el-link>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="flag === 0?'添加商品':'修改商品'" :visible.sync="dialogVisible" width="30%"
			class="a-dialog" @close="clearDialog('itemForm')" :close-on-click-modal="false">
			<el-form :model="itemForm" :rules="itemRules" ref="itemForm" size="small"
				label-width="100px">
				<el-form-item prop="url" label-width="0">
					<el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
						:show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="itemForm.url" :src="bindIMG(itemForm.url)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="名称" prop="name">
					<el-input v-model="itemForm.name" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item label="分类" prop="type">
					<el-select v-model="itemForm.type" placeholder="所属分类">
						<el-option v-for="item in allCategory" :key="item.id" :label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="价格" prop="price">
					<el-input v-model.number="itemForm.price" type="number" placeholder="商品价格">
					</el-input>
				</el-form-item>
				<el-form-item label="数量" prop="num">
					<el-input v-model.number="itemForm.num" type="number" placeholder="商品数量">
					</el-input>
				</el-form-item>
				<!--todo 级联选择  -->
				<el-form-item label="产地" prop="address">
					<el-input v-model="itemForm.address" placeholder="商品产地"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input type="textarea" v-model="itemForm.description" placeholder="商品描述">
					</el-input>
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

// todo del goods
// todo search goods
import { aMixin } from '@mixins'
import { goodsState } from '@/static'
import _api from '@api'
import { mapActions, mapGetters, mapState } from 'vuex'
import { deepClone, bindURL, bindIMG } from '@utils'
export default {
	data() {
		return {
			searchForm: {},
			tableData: [],
			itemForm: {},
			itemRules: {
				url: [{ required: true, message: '请选择商品图片', trigger: 'blur' }],
				name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
				type: [{ required: true, message: '请选择商品类型', trigger: 'blur' }],
				price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
				num: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
				address: [
					{ required: true, message: '请输入商品产地', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请输入商品描述', trigger: 'blur' }
				]
			},
			dialogVisible: false,
			flag: 0,
			goodsState
		}
	},
	mixins: [aMixin],
	methods: {
		...mapActions(['fetchAllUser', 'fetchAllCategory']),
		deleteItem: _api.deleteItem,
		bindURL,
		bindIMG,
		async fetchItem() {
			const { list } = await _api.getItemList(this.query)
			this.tableData = list.map((i) => {
				const typeInfo = this.getCategoryById(i.type)
				const statusInfo = this.goodsState.find(
					(j) => j.value === Number(i.status)
				)

				return {
					...i,
					typeInfo,
					statusInfo
				}
			})
		},
		async handleItem(data, flag) {},
		handleAvatarSuccess(res, file) {
			this.$set(this.itemForm, 'url', res)
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
					Object.assign(this[formName], {
						createTime: Date.now(),
						updateTime: Date.now(),
						status: 0
					})
					const { success } = await _api.addItem(this[formName])
					this.handleSuccess(success, '添加', this.fetchItem)
					this.dialogVisible = false
				} else if (flag === 1) {
					delete this[formName].typeInfo
					delete this[formName].statusInfo
					const { success } = await _api.editItem(this[formName])
					this.handleSuccess(success, '修改', this.fetchItem)
					this.dialogVisible = false
				}
			})
		},
		async toggleStatus(row) {
			console.log(row)
			const status = row.status === 0 ? 1 : 0
			const { success } = await _api.editItem({
				id: row.id,
				updateTime: Date.now(),
				status
			})
			this.handleSuccess(
				success,
				status === 0 ? '下架' : '上架',
				this.fetchItem
			)
		}
	},
	computed: {
		...mapGetters(['getUserById', 'getRoomById', 'getCategoryById']),
		...mapState(['allRoom', 'allCategory'])
	},
	mounted() {
		this.fetchAllUser()
		this.fetchAllCategory()
		this.fetchItem()
	}
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
.demo-table {
	.demo-table-expand {
		font-size: 0;
	}
	/deep/.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
		font-size: 15px;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
}
</style>
