<template>
  <div class="donate">
    <div class="donate-title">捐赠中心</div>
    <el-form :model="donateForm" ref="donateForm" :rules="donateRules">
      <el-form-item label="捐赠标题" prop="name">
        <el-input type="textarea" v-model="donateForm.name" placeholder="捐赠标题"> </el-input>
      </el-form-item>
      <el-form-item label="捐赠说明" prop="description">
        <el-input type="textarea" v-model="donateForm.description" placeholder="想说的话"> </el-input>
      </el-form-item>
      <el-form-item label="捐赠内容" prop="comment">
        <el-select v-model="donateForm.comment" multiple style="width: 100%">
          <el-option :label="i.name" :value="i.name" v-for="i in allItem" :key="i.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="捐赠类型" prop="source">
        <el-select v-model="donateForm.source" style="width: 100%">
          <el-option :label="i.text" :value="i.text" v-for="i in source" :key="i.id"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="donate-bottom">
      <button class="donate-btn t-btn" @click="handleDonate">确认捐赠</button>
    </div>
    <div class="donate-title second">捐赠公示</div>
    <div class="donate-list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="标题" width="180"> </el-table-column>
        <el-table-column prop="comment" label="内容">
          <template v-slot="{ row }">
            <p v-for="(i, idx) in handleComment(row.comment)" :key="idx">{{ i }} * 1</p>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="类型"> </el-table-column>
        <el-table-column prop="updateTime" label="更新时间">
          <template v-slot="{ row }">
            {{ row.updateTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
          <template v-slot="{ row }">
            <el-tag :type="donateState[row.state].type">{{ donateState[row.state].label }} </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="t-pagination"
        @size-change="handleSizeChange(fetchDonate, $event)"
        @current-change="handleCurrentChange(fetchDonate, $event)"
        :current-page="query.page"
        :page-size="query.size"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { source, donateState } from '@static'
import _api from '@api'
import { hMixin } from '@mixins'
export default {
  mixins: [hMixin],
  data() {
    return {
      donateForm: {}, // 捐赠表单数据
      donateRules: {
        // 捐赠表单校验规则
        name: [{ required: true, message: '请输入捐赠标题', trigger: blur }],
        description: [{ required: true, message: '请输入捐赠描述', trigger: blur }],
        comment: [{ required: true, message: '请选择捐赠商品', trigger: blur }],
        source: [{ required: true, message: '请选择捐赠类型', trigger: blur }]
      },
      tableData: [], // 捐赠列表数据
      source, // 捐赠来源类型枚举值
      donateState // 捐赠状态枚举值
    }
  },
  methods: {
    ...mapActions(['fetchAllItem']), // 从 store 中映射 fetchAllItem 方法
    handleDonate() {
      // 处理捐赠表单提交
      this.$refs.donateForm.validate(async (valid) => {
        if (!valid) return
        console.log(
          Object.assign({}, this.donateForm, {
            state: 0,
            createTime: Date.now(),
            updateTime: Date.now()
          })
        )
        const { success } = await _api.addDonate(
          Object.assign({}, this.donateForm, {
            state: 0,
            createTime: Date.now(),
            updateTime: Date.now(),
            comment: this.donateForm.comment.join('__')
          })
        )
        this.$notify({
          title: '捐赠',
          type: success ? 'success' : 'danger',
          message: success ? '捐赠成功! ' : '捐赠失败! '
        })
        success && this.$refs.donateForm.resetFields()
        success && this.fetchDonate()
      })
    },
    async fetchDonate() {
      // 获取捐赠列表数据
      const { list, total } = await _api.getDonateList(this.query)
      console.log(total)
      this.total = total
      this.tableData = list
    },
    handleComment(i) {
      // 处理捐赠商品注释，将字符串转化为数组
      return i.split('__')
    }
  },
  computed: {
    ...mapState(['allItem']) // 从 store 中映射 allItem 数据
  },
  mounted() {
    this.fetchDonate() // 获取捐赠列表数据
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.donate-title {
  letter-spacing: 4px;
  font-size: 30px;
  padding-bottom: 20px;
  color: @color-red;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  &.second {
    margin-top: 100px;
  }
}
.donate-bottom {
  text-align: center;
  .donate-btn {
    width: 80%;
  }
}
.t-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
