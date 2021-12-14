<template>
	<!-- todo infiniteScroll -->
	<ul class="item-list">
		<!-- {{itemList}} -->
		<template v-if="itemList.length!==0">
			<li class="item-item" v-for="item in itemList" :key="item.id">
				<h2 class="i-title">{{item.name}}</h2>

				<ul class="i-info">
					<li class="i-item">
						<i class="fa fa-user-md"></i>
						<span>{{item.doctorName}}</span>
					</li>
					<li class="i-item">
						<i class="fa fa-tags"></i>
						<span>{{item.types.name}}</span>
					</li>
					<li class="i-item">
						<i class="fa fa-hospital-o" aria-hidden="true"></i>
						<span>{{item.department.name}}</span>
					</li>
					<li class="i-item">
						<i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
						<!-- <span>{{item.department.name}}</span> -->
						<span>{{getLevelName(item.department.address)}}</span>
					</li>

				</ul>
				<p class="i-price">
					<!-- <i class="fa fa-jpy bg" aria-hidden="true"></i> -->
					{{item.price | $}}
				</p>
				<button class="i-btn" @click="goItemDetail(item)">详情</button>
			</li>
			<li class="item-item hidden-vs" v-for="index in blankNum" :key="index"></li>
		</template>
		<template v-else>
			<div class="not-found">暂无房间信息</div>
		</template>
	</ul>
</template>

<script>
import { mapMutations } from 'vuex'
import { bindIMG } from '@utils'
import { floorList } from '@static'
export default {
	name: 'item-list',
	props: {
		data: {
			type: Array,
			default: function () {
				return []
			}
		}
	},
	data() {
		return {
			itemList: []
		}
	},
	methods: {
		...mapMutations(['setCurrentItem']),
		bindIMG,
		goItemDetail(data) {
			this.setCurrentItem(data)
			this.$router.push({ name: 'medical-detail', params: { id: data.id } })
		},
		getLevelName(str) {
			const lv = Number(str[0]) - 1
			return floorList[lv].name
		}
	},
	computed: {
		totalNum() {
			return this.itemList.length
		},
		blankNum() {
			return this.totalNum % 4 === 0 ? 0 : 4 - (this.totalNum % 4)
		}
	},
	/* note  parent -> children (async data) #1
	 * children -> watch data
	 */
	watch: {
		data(val) {
			this.itemList = val
		}
	},
	/* ques [√]data [x]itemList
	 */
	created() {
		this.itemList = this.data
	}
	// updated() {
	//   console.log(123)
	// }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.item-list {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.item-item {
		width: 30%;
		box-sizing: border-box;
		// height: 240px;
		border: 1px solid #e8e8e8;
		padding: 20px;
		margin-bottom: 20px;
		border-radius: 8px;
		transition: all 0.3s linear;
		display: inline-block;
		height: 100%;
		margin-right: 5%;
		&:nth-child(3n) {
			margin-right: 0;
		}
		h2 {
			text-align: center;
			font-weight: 400;
		}
		h2,
		p {
			margin: 0;
		}
		.i-info {
			padding: 30px 20px 0;
			.i-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30px;
				line-height: 1.5;
				i {
					color: #003366;
				}
				span {
					font-size: 24px;
					color: rgba(102, 102, 102, 0.9);
				}
			}
		}
		.i-price {
			text-align: center;
			font-size: 40px;
			margin: 20px 0 30px;
			position: relative;
			letter-spacing: 2px;
			color: #003366;
		}
		.i-btn {
			// background-color: #003366;
			color: #003366;
			outline: none;
			border: 1px solid #003366;
			background-color: transparent;
			width: 100%;
			height: 40px;
			cursor: pointer;
			border-radius: 10px;
			transition: all 0.2s linear;
			font-size: 16px;
			&:hover {
				background-color: #003366;
				color: #e8e8e8;
				// transform: scale(1.01);
			}
		}
		&:hover {
			border-color: #c8c8c8;
			transform: translateY(4px);
			box-shadow: 0px 0px 4px 2px rgba(102, 102, 102, 0.2);
			cursor: pointer;
		}

		// .r-title {
		// 	margin: 0;
		// 	font-size: 16px;
		// 	text-align: center;
		// 	color: #555;
		// 	margin-bottom: 6px;
		// 	letter-spacing: 0.1em;
		// 	&:hover {
		// 		color: @color-main;
		// 	}
		// }
		// .r-info {
		// 	text-align: center;
		// }
		// span[class^='r-'] {
		// 	display: inline-block;
		// 	// border: 1px solid #e8e8e8;
		// 	font-size: 14px;
		// 	height: 24px;
		// 	line-height: 24px;
		// 	padding: 0 10px;
		// 	box-sizing: border-box;
		// 	margin-right: 4px;
		// 	border-radius: 2px;
		// 	text-align: center;
		// 	&:last-child {
		// 		margin-right: 0;
		// 	}
		// }
		// .r-type {
		// 	background-color: @color-main;
		// 	color: #fff;
		// }
		// .r-price {
		// 	background-color: @color-red;
		// 	color: #fff;
		// 	&::first-letter {
		// 		font-size: 13px;
		// 	}
		// }
		// .r-floor {
		// 	background-color: @color-green;
		// 	color: #fff;
		// }
	}
}
</style>
