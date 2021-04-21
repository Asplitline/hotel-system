<template>
  <el-card class="room">
    <!--  -->
    <el-form v-model="searchForm" :inline="true" size="small">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客房号码">
            <el-input v-model="searchForm.number" placeholder="请输入房号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客房类型" prop="roomType">
            <el-select v-model="searchForm.roomType" placeholder="请选择客房类型" clearable>
              <el-option v-for="item in getMiniCategory()" :key="item.id"
                :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客房费用">
            <el-input v-model="searchForm.minPrice" placeholder="最低房费" clearable
              style="width:48%" />-
            <el-input v-model="searchForm.maxPrice" placeholder="最高房费" clearable
              style="width:48%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客房状态">
            <el-select v-model="searchForm.state" placeholder="请选择客房状态" clearable>
              <el-option v-for="item in roomState" :key="item.id" :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">
              查询
            </el-button>
            <el-button type="success" icon="el-icon-plus" @click="showDialog(0)">
              新增
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->
    <el-table :data="filterTableData" style="width: 100%" max-height="600px">
      <el-table-column prop="url" label="展示图" min-width="120">
        <template v-slot="{row}">
          <img :src="bindIMG(row.url)" alt="" class="cover">
        </template>
      </el-table-column>
      <el-table-column prop="number" label="房间号" min-width="100">
        <template v-slot="{row}">
          <el-tag type="warning">{{row.number}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lx" label="客房类型" min-width="60">
        <template v-slot="{row}">
          {{getCategoryById(row.lx)&&getCategoryById(row.lx).name}}
        </template>
      </el-table-column>
      <el-table-column prop="mj" label="占地面积" min-width="60">
        <template v-slot="{row}">
          {{row.mj + ' m²'}}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="客房价格" min-width="100">
        <template v-slot="{row}">
          <el-tag type="danger" effect="plain">{{'￥'+row.price +'.00'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="客房状态" min-width="60">
        <template v-slot="{row}">
          <el-tag :type="roomState[row.state].type" effect="dark">
            {{roomState[row.state].value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template v-slot="{row}">
          <el-link type="primary" @click="showDialog(1,row)">更新客房</el-link>
          <el-link type="danger" @click="deleteById(deleteRoom,fetchRoom,row.id,'客房')">
            删除客房</el-link>
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
    <el-dialog :title="roomForm.flag === 0?'添加客房':'修改客房'" :visible.sync="dialogVisible"
      width="30%" class="a-dialog" @close="clearDialog('roomForm')"
      :close-on-click-modal="false">
      <el-form :model="roomForm" :rules="roomRules" ref="roomForm" size="small"
        label-width="70px">
        <el-form-item label="展示图" prop="url">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="roomForm.url" :src="bindIMG(roomForm.url)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="roomForm.name" placeholder="房间名称"></el-input>
        </el-form-item>
        <el-form-item label="号码" prop="number">
          <el-input v-model="roomForm.number" placeholder="房间号码"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="lx">
          <el-select v-model="roomForm.lx" placeholder="房间类型">
            <el-option :label="item.name" v-for="item in getMiniCategory()" :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面积" prop="mj">
          <el-input v-model="roomForm.mj" placeholder="房间面积"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="roomForm.price" placeholder="房间价格"></el-input>
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
    return {
      searchForm: {},
      tableData: [],
      roomState,
      dialogVisible: false,
      roomRules: {
        url: [{ required: true, message: '请选择图片', trigger: 'blur' }],
        name: [{ required: true, message: '请输入房间名称', trigger: 'blur' }],
        number: [
          { required: true, message: '请输入房间号码', trigger: 'blur' }
        ],
        lx: [{ required: true, message: '请选择房间类型', trigger: 'blur' }],
        mj: [{ required: true, message: '请输入房间面积', trigger: 'blur' }],
        price: [{ required: true, message: '请输入房间价格', trigger: 'blur' }]
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
      const { list, total } = await _api.getRoomList(this.query)
      this.tableData = list
      this.total = total
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
            state: 0
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
    ...mapGetters(['getMiniCategory', 'getCategoryById']),
    filterTableData() {
      const {
        number,
        roomType,
        minPrice = 0,
        maxPrice = 9999,
        state
      } = this.searchForm
      if (this.hasFilter) {
        let data = deepClone(this.tableData)
        // 房号
        if (data && number && number.trim().length > 0) {
          data = data.filter((item) => item.number === number)
        }
        // 类型
        if (data && typeof roomType === 'number') {
          data = data.filter((item) => item.lx === roomType)
        }
        // 价格
        if (data) {
          data = data.filter(
            (item) => item.price >= minPrice && item.price <= maxPrice
          )
        }
        // 状态
        if (data && typeof state === 'number') {
          data = data.filter((item) => item.state === state)
        }
        this.initSearch()
        return data
      } else {
        return this.tableData
      }
    }
  },
  created() {
    this.fetchRoom()
    this.fetchAllCategory()
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
