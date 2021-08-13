<template>
	<view>
		<view class="productList" v-for="(item,index) in productList" :key="index">
			<view class="tran-list">
				<view class="time-list">
					<text class="time-date">{{item.days}}</text>
					<text class="time-week">{{item.week}}</text>
				</view>
				<view class="content-list">
					<view class="content-left">
						<text class="type">{{item.transTypeName}}</text>
						<text class="desc">{{item.transObjName}}</text>
					</view>
					<view class="content-right">
						<text :class="(item.transTypeName === '充值' || item.transTypeName === '转入') ? 'incr': 'decr'">{{item.resultAmount}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'detail_list',
		//从父组件传入的参数
		props: {
			productList: {
				type: Array, //参数的类型
				default () {
					return [];
				},
			},
		}
	};
</script>

<style>
	.productList {
		margin: 0 auto;
		width: 90%;
	}

	.tran-list {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.time-list {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 20%;
		padding: 10rpx 0;
	}

	.content-list {
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 0;
		justify-content: space-between;
		width: 80%;
		border-top: 1rpx solid #e1e1e1;
		padding: 10rpx 0;
	}

	.content-left{
		display: flex;
		flex-direction: column;
	}

	.content-right {
		display: flex;
		align-items: center;
	}

	.incr {
		font-size: 36rpx;
		color: #b30000;
	}

	.decr {
		font-size: 36rpx;
		color: green;
	}

	.time-date {
		font-size: 30rpx;
		font-weight: 600;
		color: #607483;
		line-height: 48rpx;
	}

	.time-week {
		font-size: 25rpx;
		line-height: 48rpx;
		color: #606266;
	}

	.type {
		color: #333333;
		font-size: 28rpx;
		line-height: 48rpx;
	}

	.desc {
		color: #999999;
		font-size: 24rpx;
		line-height: 48rpx;
	}
</style>
