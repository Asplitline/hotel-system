<template>
	<div class="hotel-list">
		<h2>体检大楼 - {{cChar[this.floor]}}楼</h2>
		<ul class="h-list" v-if="roomNum">
			<li class="h-item" v-for="item in filterRoom" :key="item.id">
				<a href="javascript:;" @click="goHotelDetail(item)">
					<img :src="bindIMG(item.url)">
					<p class="h-title">{{item.name}}</p>
					<div class="h-info">
						<span class="h-tag-num">No.{{item.address}}</span>
						<!-- <span class="h-tag-price">￥{{item.price}}.00</span> -->
					</div>
				</a>
			</li>
			<li class="h-item hidden-vs" v-for="index in blankNum" :key="index"></li>
		</ul>
		<div v-else class="not-found"><i class="el-icon-school"></i>该楼层暂无体检信息</div>
	</div>
</template>

<script>
import { cChar } from '@static'
import { mapMutations } from 'vuex'
import { bindIMG } from '@utils'
export default {
	name: 'hotel-list',
	props: {
		floor: {
			type: Number
		},
		num: {
			type: Number,
			default: 4
		},
		data: {
			type: Array
		}
	},
	data() {
		return {
			cChar
		}
	},
	methods: {
		...mapMutations(['setCurrentHotel']),
		bindIMG,
		// 跳转到房间详情
		goHotelDetail(data) {
			this.setCurrentHotel(data)
			this.$router.push({ name: 'hotel-detail', params: { id: data.id } })
		}
	},
	computed: {
		filterRoom() {
			return this.data
				.filter((item) => {
					const fl = item.address.toString().substr(0, 1)
					return this.floor === Number(fl)
				})
				.slice(0, this.num)
		},
		roomNum() {
			return this.filterRoom.length
		},
		blankNum() {
			return this.roomNum % this.num === 0 ? 0 : 4 - this.roomNum
		}
	},
	created() {}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.hotel-list {
	background-color: #fff;
	padding: 0 10px 10px;
	margin: 20px 0;
	overflow: hidden;
	h2 {
		border-left: 3px solid @color-main;
		padding-left: 20px;
		font-weight: normal;
		letter-spacing: 2px;
	}
	.h-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 10px;
		.h-item {
			width: 260px;
			height: 240px;
			border: 1px solid #e8e8e8;
			transition: all 0.5 ease-in;
			a {
				display: inline-block;
				width: 100%;
				height: 100%;
				img {
					width: 100%;
					height: 170px;
					vertical-align: bottom;
				}
			}
			&:hover {
				border-color: #c8c8c8;
				box-shadow: 0px 0px 4px 2px rgba(102, 102, 102, 0.2);
			}
			.h-title {
				margin: 7px 0;
				font-size: 16px;
				text-align: center;
				color: #555;
				letter-spacing: 0.1em;
				&:hover {
					color: @color-main;
				}
			}
			.h-info {
				text-align: center;
			}
			[class^='h-tag'] {
				display: inline-block;
				// border: 1px solid #e8e8e8;
				font-size: 14px;
				height: 24px;
				line-height: 24px;
				width: 66px;
				box-sizing: border-box;
				margin-right: 2px;
				border-radius: 2px;
			}
			.h-tag-num {
				background-color: @color-main;
				color: #fff;
			}
			.h-tag-price {
				background-color: @color-red;
				color: #fff;
				margin-right: 0;
				&::first-letter {
					font-size: 13px;
				}
			}
		}
	}
}
</style>
