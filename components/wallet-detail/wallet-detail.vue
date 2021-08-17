<template>
	<view class="wallet_detail">
		<text class="wallet_detail_text">交易钱包</text>
		<view class="wallet_info_block">
			<view class="wallet_info">
				<image class="wallet_info_logo" src="@/static/digitwallet_logo.png" />
				<text class="wallet_info_text">数字人民币钱包(尾号:{{ wallet.dwId.toString().substr(wallet.dwId.length - 4, 4) }})</text>
			</view>
			<text class="wallet_amount">可用余额: {{ parseFloat(wallet.amount).toFixed(2) }} 元</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"wallet-detail",
		props:['wallet'],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.wallet_detail {
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
	
	.wallet_detail_text {
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.wallet_info_block {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	
	.wallet_info {
		display: flex;
		flex-direction: row;
		align-items: center;
		
		margin-bottom: 8rpx;
	}
	
	.wallet_info_logo {
		width: 40rpx;
		height: 40rpx;
		
		margin-right: 5rpx;
	}
	
	.wallet_info_text {
		font-size: 26rpx;
	}
	
	.wallet_amount {
		font-size: 26rpx;
		color: #666666;
	}
</style>
