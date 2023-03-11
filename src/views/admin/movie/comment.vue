<template>
  <el-card class="user">
    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="id" label="评论号" min-width="100"> </el-table-column>
      <el-table-column prop="movieId" label="电影名称" min-width="100">
        <template v-slot="{ row }">
          {{ (row.movie && row.movie.title) || '已删除' }}
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="评论内容" min-width="200"> </el-table-column>
      <el-table-column prop="userId" label="评论用户" min-width="100">
        <template v-slot="{ row }">
          {{ (row.user && row.user.username) || '已注销' }}
        </template>
      </el-table-column>
      <el-table-column prop="commentDate" label="评论日期" min-width="100">
        <template v-slot="{ row }">
          {{ row.commentDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template v-slot="{ row }">
          <el-link type="danger" @click="deleteById(deleteComment, fetchComment, row.id, '评论')"> 删除评论</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange(fetchComment, $event)"
      @current-change="handleCurrentChange(fetchComment, $event)"
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
    ...mapActions(['fetchAllUser', 'fetchAllMovie']),
    bindURL,
    bindIMG,
    deleteComment: _api.deleteComment,
    async fetchComment() {
      const { total, list } = await _api.getCommentList(this.query)
      this.total = total
      console.log(list)
      this.tableData = list.map((i) => {
        const movie = this.getMovieById(i.movieId)
        const user = this.getUserById(i.userId)
        return {
          ...i,
          movie,
          user
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getMovieById', 'getUserById'])
  },
  mixins: [aMixin],
  async created() {
    await this.fetchAllMovie()
    await this.fetchAllUser()
    this.fetchComment()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
