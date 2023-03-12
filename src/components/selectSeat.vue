<template>
  <div class="select-panel">
    <div class="screen"></div>
    <ul class="seat-list">
      <li class="seat-item" v-for="(i, index) in layout" :key="index">
        <span class="seat-item-order">{{ toAscii(index) }}</span>
        <div class="seat-row" v-for="(j, idx) in i" :key="idx + 1 * 100" @click="selectSeat(index, idx, i)">
          <img v-if="selected.includes(toText(index, idx))" alt="" class="img-disabled" src="@/assets/seat-disabled.png" />
          <img v-else-if="!isSelect(index, idx)" src="@/assets/seat-default.png" :class="{ 'hidden-vs': j === '-' }" alt="" />
          <img v-else src="@/assets/seat-fill.png" :class="{ 'hidden-vs': j === '-' }" alt="" />
        </div>
      </li>
    </ul>
    <div class="seat-desc">
      <div class="seat-desc-tip">
        <div>
          <img src="@/assets/seat-default.png" alt="" />
          <span>可选座位</span>
        </div>
        <div>
          <img src="@/assets/seat-disabled.png" alt="" />
          <span>已售座位</span>
        </div>
        <div>
          <img src="@/assets/seat-fill.png" alt="" />
          <span>已选座位</span>
        </div>
      </div>
      <div class="seat-desc-text">本影厅共有座位 {{ count }} 个，当前已售 {{ selected.length }} 个</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['layout', 'select', 'selected', 'count'],
  data() {
    return {}
  },
  methods: {
    toAscii(i) {
      return String.fromCharCode(65 + i)
    },
    AsciiToIj(str) {
      const i = str[0].charCodeAt() - 65
      const j = str[1] - 1
      return { i, j, text: str }
    },
    toText(i, j) {
      return `${this.toAscii(i)}${j + 1}`
    },
    selectSeat(i, j, row) {
      const realJ = row.indexOf('*')
      const text = this.toText(i, j)
      console.log('text: ', text)
      if (this.selected.includes(text)) return
      const index = this.select.findIndex((i) => i.text === text)
      if (index === -1) {
        if (this.select.length === 5) {
          return this.$message.warning('最多选择5个座位')
        }
        this.$emit('layout', { i, j, realI: i, realJ: j - realJ, text })
      } else {
        this.$emit('layout', { index, isDelete: true })
      }
    },
    isSelect(i, j) {
      return this.select.some((item) => item.i === i && item.j === j)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.select-panel {
  flex: 3;
  user-select: none;
  .screen {
    background: url(~@/assets/screen.png) no-repeat 0 0;
    width: 580px;
    height: 28px;
    margin: 0 auto 40px;
  }
  .seat-list {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px 0 30px;
  }
  .seat-item {
    display: flex;
    align-items: center;
    justify-content: center;
    &-order {
      font-size: 14px;
      display: inline-block;
      background-color: @color-primary;
      color: @color-white;
      height: 26px;
      width: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
    .seat-row {
      padding: 4px 6px;
      img:hover {
        cursor: pointer;
        opacity: 0.7;
      }
      .img-disabled {
        pointer-events: none;
      }
    }
  }
  .seat-desc {
    margin-top: 20px;
    &-tip {
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        display: flex;
        align-items: center;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
      span {
        margin-left: 10px;
      }
    }
    &-text {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
