<template>
	<view class="card_detail">
		<text class="card_detail_text">交易钱包</text>
		<view class="card_info_block">
			<view class="card_info">
				<image class="card_info_logo" src="@/static/digitwallet_logo.png" />
				<text class="card_info_text">数字人民币钱包(尾号:{{ wallet.dwId.substr(wallet.dwId.length - 4, 4) }})</text>
			</view>
			<text class="card_amount">可用余额: {{ parseFloat(wallet.amount).toFixed(2) }} 元</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"card-detail",
		props:['wallet'],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.card_detail {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 40rpx;
		
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		
		border: 3rpx dashed grey;
		border-radius: 35rpx;
	}
	
	.card_detail_text {
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.card_info_block {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	
	.card_info {
		display: flex;
		flex-direction: row;
		align-items: center;
		
		margin-bottom: 8rpx;
	}
	
	.card_info_logo {
		width: 40rpx;
		height: 40rpx;
		
		margin-right: 5rpx;
	}
	
	.card_info_text {
		font-size: 26rpx;
	}
	
	.card_amount {
		font-size: 26rpx;
		color: #666666;
	}
</style>
