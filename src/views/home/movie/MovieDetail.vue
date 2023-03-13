<template>
  <div class="item-detail">
    <!-- <div class="h-header">体检详情<a href="javascript:;" @click="back()">返回</a></div> -->
    <div class="h-header">
      <i class="fa fa-chevron-circle-left" aria-hidden="true" @click="back()">返回</i>
    </div>
    <div class="h-content">
      <div class="h-bg" :style="{ backgroundImage: `url(${bindIMG(item.url)})` }"></div>
      <div class="l-content">
        <div class="img-warp">
          <img :src="bindIMG(item.url)" alt="" />
        </div>
      </div>
      <div class="r-content">
        <div class="r-hd">{{ item.name }}</div>
        <div class="r-bd">
          <p>
            <span>电影名称</span><span>{{ item.title }}</span>
          </p>
          <p>
            <span>上映日期</span><span>{{ item.releaseDate | formatDate(1) }}</span>
          </p>
          <p>
            <span>电影时长</span><span class="h-num">{{ item.duration }}分钟</span>
          </p>
          <p>
            <span>电影类型</span><span>{{ item.genre }}</span>
          </p>
          <p>
            <span>制片国家</span><span class="h-desc">{{ item.country }}</span>
          </p>
          <p>
            <span>语言</span><span class="h-desc">{{ item.language }}</span>
          </p>
          <p>
            <span>导演名称</span><span>{{ item.director }}</span>
          </p>
          <p>
            <span>编剧名称</span><span>{{ item.writer }}</span>
          </p>
          <p>
            <span>主演名称</span><span class="h-num">{{ item.cast }}</span>
          </p>
          <p>
            <span>展厅类型</span><span>{{ item.extend1 }}</span>
          </p>
          <p>
            <span>剧情简介</span><span class="h-desc">{{ item.plot }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="b-content">
      <div class="mv-title">{{ item.title }} - 放映情况</div>
      <div>
        <el-table :data="arrangeList" style="width: 100%">
          <el-table-column prop="startTime" label="放映时间">
            <template v-slot="{ row }">
              <div class="release-time">
                <span class="start">{{ row.startTime | formatTime }}</span>
                <span class="end">预计 {{ row.endTime | formatTime }} 散场</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="language" label="语言版本"> </el-table-column>
          <el-table-column prop="room" label="放映厅"> </el-table-column>
          <el-table-column prop="seatCount" label="座位数量"> </el-table-column>
          <el-table-column prop="price" label="影片价格">
            <template v-slot="{ row }">
              <div class="price">
                <span class="real">{{ row.price | $ }}</span>
                <span class="default"> {{ Math.ceil(row.price * 1.2) | $ }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="选座购票">
            <template v-slot="{ row }">
              <!-- {{ row. }} -->
              <button class="btn-movie" v-if="!row.isOver" @click="showDialog(row)">
                选座购票
                <Icon size="20">
                  <CartArrowDown size="16"></CartArrowDown>
                </Icon>
              </button>
              <button class="btn-movie offline" v-else>放映结束</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="mv-title">{{ item.title }} - 影评</div>
    <div class="h-comment">
      <div class="h-edit">
        <template v-if="isLogin">
          <input type="text" v-model="commentVal" @keyup.enter="comment()" />
          <div class="h-edit-footer">
            <button @click="comment()" :class="{ disabled: commentIsEmpty }">评论</button>
          </div>
          <span>支持 Enter 键进行评论。购票后能才能进行评论和打分。</span>
        </template>
        <template v-else>
          <p class="no-login">请先进行<a href="javascript:;">登录</a>，登陆后才能回复</p>
        </template>
      </div>
      <ul class="h-list" v-if="commentList.length">
        <li class="h-item" v-for="item in commentList" :key="item.id">
          <img :src="bindIMG(item.user.url)" alt="" />
          <span class="h-author">{{ item.user.username }}</span>
          <span class="h-date"
            >评论于 <em>{{ item.commentDate | formatDate }}</em></span
          >
          <div>{{ item.comment }}</div>
        </li>
      </ul>
      <div class="not-found" v-else>暂无评论</div>
    </div>

    <el-dialog title="" :visible.sync="dialogVisible" @close="resetData" width="60%" class="a-dialog" :close-on-click-modal="false">
      <div class="select-seat">
        <select-seat
          ref="selectSeat"
          :count="currentItem.seatCount"
          :selected="disabledSeat"
          :layout="currentItem.layout"
          :select="currentSelectSeat"
          @layout="getLayout"
        ></select-seat>
        <div class="select-info">
          <div class="cover">
            <img :src="bindIMG(item.url)" alt="" />
            <div class="cover-desc">
              <span>{{ item.title }}</span>
              <span>语言：{{ item.language }}</span>
              <span>片长：{{ item.duration }}分钟</span>
            </div>
          </div>
          <div class="desc-list">
            <div class="desc-item">
              <span>影厅</span>
              <span>{{ item.extend1 }}</span>
            </div>
            <div class="desc-item">
              <span>场次</span>
              <span class="red">{{ currentItem.startTime | formatTime }}</span>
            </div>
            <div class="desc-item" v-if="!isSellOver">
              <span>座位</span>
              <div class="desc-seat">
                <div class="desc-seat-list">
                  <div class="desc-seat-item" v-for="(i, index) in currentSelectSeat" :key="index">{{ i.text }}</div>
                </div>
              </div>
            </div>
            <div class="desc-item">
              <span>价格</span>
              <span class="red">{{ currentItem.price | $ }} x {{ 2 }}</span>
            </div>
            <div class="desc-item" v-if="!isSellOver">
              <span>总计</span>
              <span class="total">{{ (+currentItem.price * currentSelectSeat.length) | $ }}</span>
            </div>
          </div>
          <div class="desc-form" v-if="!isSellOver">
            <el-form
              :model="ticketForm"
              :show-message="false"
              status-icon
              :rules="ticketRules"
              ref="ticketForm"
              size="small"
              label-width="0"
            >
              <el-form-item label="" prop="username">
                <el-input v-model="ticketForm.username" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="" prop="phone">
                <el-input v-model="ticketForm.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-form>
            <div>
              <button class="btn-movie" @click="buyTicket">购买</button>
            </div>
          </div>
          <div class="t-empty" style="margin-top: 20px" v-else>
            <p>暂无余票</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _api from '@api'
import { hMixin } from '@mixins'
import { generateSeat, roomList } from '@static'
import { bindIMG, checkPhone } from '@utils'
import { CartArrowDown } from '@v2icons/fa'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import SelectSeat from '@/components/selectSeat'
export default {
  props: ['id'],
  components: {
    CartArrowDown,
    SelectSeat
  },
  data() {
    return {
      myDate: '',
      replyDialogVisible: false,
      replyForm: {},
      item: {},
      commentVal: '',
      commentList: [],
      dialogVisible: false,
      currentItem: {},
      ticketRules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      ticketForm: {},
      currentSelectSeat: [],
      disabledSeat: [],
      orderList: []
    }
  },
  mixins: [hMixin],
  computed: {
    ...mapState({
      currentUser: 'currentUser'
    }),
    ...mapGetters(['getCategoryById', 'getUserById', 'isLogin']),
    isSellOver() {
      return this.currentItem?.seatCount === this.disabledSeat?.length && this.disabledSeat?.length !== 0
    },
    commentIsEmpty() {
      return this.commentVal.trim().length === 0 && this.orderList.length > 0
    },
    arrangeList() {
      const count = Math.floor(1440 / (this.item?.duration + 30))
      if (Number.isNaN(count)) return []
      const date = new Date()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const now = hour * 60 + minute
      return Array.from({ length: count }, (_, idx) => {
        const startTime = idx * (this.item.duration + 30)
        const roomType = roomList.find((i) => i.label === this.item.extend1)
        const layout = generateSeat(roomType.value)
        console.log('now :', now)
        return {
          startTime,
          endTime: startTime + this.item.duration,
          language: this.item.language,
          room: roomType.label,
          seatCount: roomType.value,
          price: this.item.extend2,
          // isOver: startTime < now,
          isOver: false,
          layout
        }
      })
    }
  },
  methods: {
    ...mapMutations(['setCurrentItem']),
    ...mapActions(['fetchMyCart', 'fetchAllCategory']),
    bindIMG,
    async fetchMovieDetail() {
      const { data } = await _api.getMovieById({ id: this.id })
      const category = this.getCategoryById(data.genre) || { name: '暂无' }
      console.log('category: ', category)
      this.item = { ...data, category }
    },
    async showDialog(row) {
      this.disabledSeat = []
      const { list } = await _api.getMovieOrdersByMovieId({ keyword: this.item.id, size: 999 })
      const filterList = list.filter((i) => +i.extend2 === row.startTime)
      filterList.forEach((item) => {
        console.log('item: ', item)
        const res = item.seatNumber.split(',')
        this.disabledSeat.push(...res)
      })
      this.currentItem = row
      this.dialogVisible = true
    },
    buyTicket() {
      if (this.currentSelectSeat.length === 0) {
        return this.$message.error('请选择座位')
      }
      this.$refs.ticketForm.validate(async (valid) => {
        if (!valid) return
        const payload = {
          customerName: this.ticketForm.username,
          customerPhone: this.ticketForm.phone,
          orderDate: Date.now(),
          seatNumber: this.currentSelectSeat.map((i) => i.text).join(','),
          isRefunded: 0,
          movieId: this.item.id,
          extend1: this.currentUser.id,
          extend2: this.currentItem.startTime
        }
        const { success } = await _api.addMovieOrders(payload)
        this.handleSuccess(success, '购票', () => {
          this.dialogVisible = false
        })
      })
    },
    getLayout(payload) {
      if (payload?.isDelete) {
        this.currentSelectSeat.splice(payload.index, 1)
      } else {
        this.currentSelectSeat.push(payload)
      }
    },
    resetData() {
      this.currentSelectSeat = []
      this.ticketForm = {}
      if (this.$refs.ticketForm) {
        this.$refs.ticketForm.clearValidate()
      }
    },
    async fetchMovieByUser() {
      if (!this.currentUser?.id) return
      const { list } = await _api.getMovieOrdersByUserId({ keyword: this.currentUser.id, size: 999 })
      this.orderList = list
    },
    async fetchCommentList() {
      const { list } = await _api.getCommentByMovieId({ keyword: this.item.id, size: 999 })
      console.log('list: ', list)
      this.commentList = list.map((i) => {
        const user = this.getUserById(i.userId) || { username: '已注销' }
        return {
          ...i,
          user
        }
      })
    },
    async comment() {
      const { success } = await _api.addComment({
        // id: getUid(),
        movieId: this.item.id,
        userId: this.currentUser.id,
        // commentDate: Date.now(),
        // commentDate: Date.now(),
        comment: this.commentVal
      })
      this.handleSuccess(success, '评论', this.fetchCommentList)
      if (success) {
        this.commentVal = ''
      }
    }
  },

  async mounted() {
    await this.fetchAllCategory()
    await this.fetchMovieDetail()
    await this.fetchMovieByUser()
    this.fetchCommentList()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.h-content {
  display: flex;
  position: relative;
  margin-bottom: 20px;
  border-radius: 2px;

  background-color: #000000cc;
  .h-bg {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background: url(~@/assets/bg.jpg);
    background-size: cover;
    filter: blur(10px);
  }
}

.h-header {
  // border-left: 3px solid @color-main;
  margin-bottom: 10px;
  text-align: left;
  font-size: 30px;
  color: #3e54ac;
  height: 40px;
  i:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  i::before {
    margin-right: 10px;
  }
}

.h-title {
  font-size: 28px;
  margin-bottom: 12px;
  color: #666;
}
.l-content {
  flex: 2;
  height: 100%;
  position: relative;
  // border: 1px solid #f0f0f0;
  box-sizing: border-box;
  padding: 20px;
  .img-warp {
    padding: 40px 60px;
    padding-left: 30px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    // height: 0;
    // padding-bottom: 100%;
    img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
  }
}

.r-content {
  z-index: 2;

  flex: 3;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  .r-hd {
    color: #111;
    padding-top: 10px;
    line-height: 28px;
    font-size: 24px;
    margin-bottom: 5px;
  }
  .r-bd {
    flex: 1;
    padding: 20px 0;
    p {
      margin: 0;
      margin-bottom: 20px;
    }
    span {
      display: inline-block;
      color: #fff;
      font-size: 15px;

      &:first-child {
        width: 120px;
        text-align: left;
        letter-spacing: 2px;
      }
      &:last-child {
        //   width: 100%;
        color: #f0f0f0;
        text-align: left;
        letter-spacing: 0.3em;
      }
      &.h-price {
        color: @color-red;
        //   font-size: larger;
        transform: scale(1.2);
        letter-spacing: 2px;
      }
      &.h-num {
        // color: @color-red;
      }
    }
  }
  .r-bottom {
    display: flex;
    justify-content: space-evenly;
    [class*='-cart'] {
      outline: none;
      width: 120px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      border: none;
      background-color: @color-red;
      color: #fff;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    .my-cart {
      position: relative;
      // border: 1px solid #dfdfdf;
      // background: #f9f9f9;
      color: #666;
      .corner-ico {
        position: absolute;
        right: 0;
        top: -10px;
        padding: 0 4px;
        min-width: 14px;
        height: 20px;
        line-height: 20px;
        background-color: @color-red;
        color: #fff;
        border-radius: 10px 10px 10px 4px;
        font-size: 14px;
      }
    }
  }
}

.h-divider {
  margin: 30px 0;
  border-color: #f8f8f8;
}
.h-comment {
  margin-top: 20px;
  .h-edit {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100px;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    // width: 100%;
    background-color: #eee;
    input {
      width: 100%;
      flex: 1;
      border-radius: 2px;
      outline: none;
      border: 1px solid #999;
      font-size: 18px;
      height: 40px;
      padding-left: 1em;
      box-sizing: border-box;
      color: #666;
      &:focus {
        box-shadow: 0 0 3px 3px rgba(#888, 0.3);
      }
    }
    button {
      height: 40px;
      border-radius: 2px;
      width: 80px;
      margin-top: 6px;
      margin-left: auto;
      outline: none;
      background-color: @color-primary;
      color: #fff;
      border: 1px solid @color-primary;
      cursor: pointer;
      &:hover {
        background-color: rgba(@color-primary, 0.8);
      }
      &.disabled {
        background-color: transparent;
        color: @color-primary;
        cursor: default;
        user-select: none;
      }
    }
    span {
      position: absolute;
      left: 27px;
      bottom: 11px;
      font-size: 14px;
      color: #888;
    }
    &-footer {
      margin-left: auto;
    }
  }
  .no-login {
    letter-spacing: 2px;
    a {
      color: @color-red;
    }
  }
}

.h-list {
  padding: 20px;
  //   background-color: #e8e8e8;
  margin-top: 20px;
  border: 1px solid #ccc;
  .h-item {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      border-radius: 50%;
    }
    span {
      color: #444;
      vertical-align: middle;
      margin-left: 8px;
    }
    .h-author {
      color: @color-main;
    }
    .h-date {
      font-size: 14px;
      em {
        color: #666;
        font-style: normal;
      }
    }
    div {
      margin-left: 50px;
      width: 600px;
      padding: 14px 4px;
    }
  }
}

.h-desc {
  color: #666;
  padding-top: 10px;
}

.not-found {
  margin-top: 10px;
}

::v-deep .md-empty {
  background-color: #fafafa;
  p {
    color: @color-blue;
    font-size: 20px;
  }
}

.md-title {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 20px;
  color: @color-primary;
  font-weight: 700;
}
// .b-content {
//   &-title {

//   }
// }

/deep/ .el-table th.el-table__cell {
  background-color: #f5f7f9;
}

.release-time {
  display: flex;
  flex-direction: column;
  .start {
    color: #666;
    font-size: 20px;
    font-weight: 700;
  }
  .end {
    color: #888;
    font-size: 14px;
  }
}

.price {
  .real {
    color: @color-red;
    font-size: 18px;
  }
  .default {
    color: #888;
    font-size: 14px;
    text-decoration: line-through;
    margin-left: 4px;
  }
}

.mv-title {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 20px;
  color: @color-primary;
  font-weight: 700;
}

.select-seat {
  height: 600px;
  display: flex;

  .select-info {
    flex: 1;
    background: rgba(@color-primary, 0.1);
    padding: 20px;
    .cover {
      display: flex;
      img {
        width: 80px;
        height: auto;
      }
      &-desc {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        span {
          line-height: 30px;
          font-size: 14px;
          &:first-child {
            font-weight: 700;
            font-size: 16px;
          }
        }
      }
    }
    .desc-list {
      // background-color: #fff;
      margin-top: 20px;
      .desc-item {
        display: flex;
        box-sizing: border-box;
        padding: 5px 10px;
        .desc-seat {
          display: flex;
          align-items: center;
          &-list {
            display: flex;
            flex-wrap: wrap;
          }
          &-item {
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            background-color: @color-white;
            height: 20px;
            padding: 0 6px;
            border-radius: 2px;
            border: 1px solid @color-primary;
            color: @color-primary;
            margin-right: 4px;
          }
        }
        & > span {
          height: 42px;
          line-height: 42px;
          &:first-child {
            width: 60px;
          }
          &:last-child {
            flex: 1;
          }
          &.red {
            // font-size: 16px;
            // color: @color-red;
          }
          &.total {
            font-size: 18px;
            font-weight: 700;
            color: @color-red;
          }
        }
      }
    }

    .desc-form {
      margin-top: 10px;
    }
  }
}
</style>
