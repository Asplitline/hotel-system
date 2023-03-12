<template>
  <el-card class="user">
    <!--  -->
    <el-form :inline="true" size="small">
      <el-row>
        <el-col :span="18">
          <el-form-item label="电影名称">
            <el-input v-model="query.keyword" placeholder="请输入电影名称" clearable @clear="fetchMovie" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询电影 </el-button>
            <el-button type="success" icon="el-icon-plus" @click="showDialog(0)">新增电影 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  -->

    <el-table :data="tableData" style="width: 100%" max-height="650px">
      <el-table-column prop="url" label="电影封面" min-width="100">
        <template v-slot="{ row }">
          <img :src="bindIMG(row.url)" alt="" class="tb-avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="电影名称" min-width="120"> </el-table-column>
      <el-table-column prop="genre" label="电影题材" min-width="120">
        <template v-slot="{ row }">
          <el-tag>
            {{ (row.category && row.category.name) || '未知' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="releaseDate" label="上映时间" min-width="60">
        <template v-slot="{ row }"> {{ row.releaseDate | formatDate(1) }}</template>
      </el-table-column>
      <el-table-column prop="duration" label="电影时长" min-width="60">
        <template v-slot="{ row }">
          <el-tag type="danger" effect="plain">{{ row.duration }} 分钟</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="电影状态" min-width="60">
        <template v-slot="{ row }">
          <el-tag :type="movieState[row.status].type" effect="dark">
            {{ movieState[row.status].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template v-slot="{ row }">
          <!-- <el-link type="primary" @click="showDialog(1, row)">电影详情</el-link> -->
          <el-link type="primary" @click="showDialog(1, row)">修改电影</el-link>
          <el-link type="danger" @click="deleteById(deleteMovie, fetchMovie, row.id, '电影')"> 删除电影</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange(fetchMovie, $event)"
      @current-change="handleCurrentChange(fetchMovie, $event)"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      :title="movieForm.flag === 0 ? '添加电影' : '修改电影'"
      :visible.sync="dialogVisible"
      width="50%"
      class="a-dialog"
      @close="clearDialog('movieForm')"
      :close-on-click-modal="false"
    >
      <el-form :model="movieForm" :rules="movieRules" ref="movieForm" size="small" label-width="140px">
        <el-form-item label="" prop="url" label-width="0">
          <el-upload
            class="avatar-uploader"
            :action="bindURL('/file/uploadFile')"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="files"
          >
            <img v-if="movieForm.url" :src="bindIMG(movieForm.url)" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="电影名称" prop="title">
          <el-input v-model="movieForm.title" placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="上映日期" prop="releaseDate">
          <el-date-picker v-model="movieForm.releaseDate" type="date" placeholder="选择上映日期" style="width: 100%"> </el-date-picker>
        </el-form-item>
        <el-form-item label="电影时长(分钟)" prop="duration">
          <el-input-number v-model="movieForm.duration" :min="1" :max="999" label="请输入电影时长"></el-input-number>
        </el-form-item>
        <el-form-item label="电影类型" prop="genre">
          <el-select v-model="movieForm.genre" placeholder="请选择电影类型">
            <el-option-group v-for="category in movieCategory" :key="category.id" :label="category.name">
              <el-option v-for="item in category.children" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="制片国家/地区" prop="country">
          <el-select v-model="movieForm.country" placeholder="请选择制片国家/地区">
            <el-option v-for="item in locationList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-select v-model="movieForm.language" placeholder="请选择语言">
            <el-option v-for="item in languageList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导演名称" prop="director">
          <el-input v-model="movieForm.director" placeholder="请输入导演名称"></el-input>
        </el-form-item>
        <el-form-item label="编剧名称" prop="writer">
          <el-input v-model="movieForm.writer" placeholder="请输入编剧名称"></el-input>
        </el-form-item>
        <el-form-item label="主演名称" prop="cast">
          <el-input v-model="movieForm.cast" placeholder="请输入主演名称"></el-input>
        </el-form-item>
        <el-form-item label="剧情简介" prop="plot">
          <el-input type="textarea" v-model="movieForm.plot" placeholder="请输入剧情简介"></el-input>
        </el-form-item>
        <el-form-item label="影院类型" prop="extend1">
          <el-select v-model="movieForm.extend1" placeholder="请选择展厅类型" @change="extend1Change">
            <el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.label"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="影票单价" prop="price">
          <el-input v-model.number="movieForm.extend2" readonly type="number" placeholder="请输入影票单价"> </el-input>
        </el-form-item>
        <!-- <el-form-item label="制作预算" prop="budget">
          <el-input v-model="movieForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="票房收入" prop="boxOffice">
          <el-radio v-model="movieForm.status" v-for="item in movieState" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-radio v-model="movieForm.status" v-for="item in movieState" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false" size="small">取 消 </el-button>
        <el-button type="success" @click="submitDialog('movieForm', movieForm.flag)" size="small">
          {{ movieForm.flag === 0 ? '添加' : '修改' }}
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import _api from '@api'
import { aMixin } from '@mixins'
import { ADD, EDIT, languageList, locationList, movieState, roomList, sexInfo, stateInfo } from '@static'
import { bindIMG, bindURL, deepClone, getUid } from '@utils'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      roomList,
      locationList,
      languageList,
      tableData: [],
      sexInfo,
      stateInfo,
      movieState,
      movieForm: {},
      movieRules: {
        url: [{ required: true, message: '请选择电影封面', trigger: 'blur' }],
        title: [{ required: true, message: '请输入电影名称', trigger: 'blur' }],
        releaseDate: [{ required: true, message: '请输入上映日期', trigger: 'blur' }],
        duration: [{ required: true, message: '请输入电影时长', trigger: 'blur' }],
        genre: [{ required: true, message: '请输入电影类型', trigger: 'blur' }],
        director: [{ required: true, message: '请输入导演名称', trigger: 'blur' }],
        writer: [{ required: true, message: '请输入编剧名称', trigger: 'blur' }],
        cast: [{ required: true, message: '请输入主演名称', trigger: 'blur' }],
        plot: [{ required: true, message: '请输入剧情简介', trigger: 'blur' }],
        language: [{ required: true, message: '请输入语言', trigger: 'blur' }],
        country: [{ required: true, message: '请输入制片国家/地区', trigger: 'blur' }],
        extend1: [{ required: true, message: '请选择展厅类型', trigger: 'blur' }],
        extend2: [{ required: true, message: '请输入影票单价', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory']),
    bindURL,
    bindIMG,
    deleteMovie: _api.deleteMovie,
    async fetchMovie() {
      const { total, list } = await _api.getMovieList(this.query)
      console.log('list: ', list)
      this.total = total
      this.tableData = list.map((i) => {
        const category = this.getCategoryById(i.genre)
        return {
          ...i,
          category
        }
      })
    },
    // 显示对话框
    showDialog(flag, data) {
      this.dialogVisible = true
      if (flag === ADD) {
        //
      } else if (flag === EDIT) {
        this.movieForm = deepClone(data)
      }
      this.movieForm.flag = flag
    },
    // 提交对话框
    submitDialog(formName, flag) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        delete this[formName].flag
        if (flag === ADD) {
          Object.assign(this[formName], {
            id: getUid(),
            createTime: Date.now()
          })
          const { success } = await _api.addMovie(this[formName])
          this.handleSuccess(success, '添加', this.fetchMovie)
        } else if (flag === EDIT) {
          const { success } = await _api.editMovie(this[formName])
          this.handleSuccess(success, '修改', this.fetchMovie)
        }
        this.dialogVisible = false
      })
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      console.log(res)
      this.$set(this.movieForm, 'url', res)
    },
    search() {
      this.fetchMovie()
    },
    extend1Change(v) {
      const room = roomList.find((i) => i.label === v) || { price: 48 }
      this.$set(this.movieForm, 'extend2', room.price)
    }
  },
  computed: {
    ...mapGetters(['movieCategory', 'getCategoryById'])
  },
  mixins: [aMixin],
  created() {
    this.fetchAllCategory()
    this.fetchMovie()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/acommon.less';
</style>
