<template>
  <el-card class="user">
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="id" label="回复号" min-width="100"> </el-table-column>
      <el-table-column prop="commentId" label="评论" min-width="200">
        <template v-slot="{ row }">
          {{ (row.comment && row.comment.comment) || '已删除' }}
        </template>
      </el-table-column>
      <el-table-column prop="reply" label="回复内容" min-width="200"> </el-table-column>
      <el-table-column prop="userId" label="回复用户" min-width="100">
        <template v-slot="{ row }">
          {{ (row.user && row.user.username) || '已注销' }}
        </template>
      </el-table-column>
      <el-table-column prop="commentDate" label="回复日期" min-width="100">
        <template v-slot="{ row }">
          {{ row.replyDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template v-slot="{ row }">
          <el-link type="danger" @click="deleteById(deleteCommentReplies, fetchCommentReplies, row.id, '回复')"> 删除回复</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange(fetchCommentReplies, $event)"
      @current-change="handleCurrentChange(fetchCommentReplies, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!--  -->
  </el-card>
</template>

<script>
import _api from '@api'
import { aMixin } from '@mixins'
import { bindIMG, bindURL } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions(['fetchAllUser', 'fetchAllComment']),
    bindURL,
    bindIMG,
    deleteCommentReplies: _api.deleteCommentReplies,
    async fetchCommentReplies() {
      const { total, list } = await _api.getCommentRepliesList(this.query)
      this.total = total
      console.log(list)
      this.tableData = list.map((i) => {
        const comment = this.getCommentById(i.commentId)
        const user = this.getUserById(i.userId)
        return {
          ...i,
          comment,
          user
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getCommentById', 'getUserById'])
  },
  mixins: [aMixin],
  async created() {
    await this.fetchAllComment()
    await this.fetchAllUser()
    this.fetchCommentReplies()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
