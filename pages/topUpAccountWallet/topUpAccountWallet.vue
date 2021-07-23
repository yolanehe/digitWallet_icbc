<template>
	<view>
		<view class="transfer_top">
			<view class="transfer-block">
				<image class="transfer-icon" src="@/static/logo1.png" mode="widthFix" />
				<text class="transfer-text">银行卡</text>
			</view>
			<image class="transfer-arrow" src="@/static/arrow.png" mode="widthFix" />
			<view class="transfer-block">
				<image class="transfer-icon" src="@/static/logo2.png" mode="widthFix" />
				<text class="transfer-text">数字银行钱包</text>
			</view>
		</view>
		<view class="transfer_input">
			<text class="transfer_input_text">充入金额</text>
			<input class="transfer_input_style" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("@/common/uni.css");
	
	.transfer_top {
		border: 1upx solid black;
		margin-top: 30rpx;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		display: flex;
	}
	
	.transfer-icon {
		border: 1upx solid red;
		width: 120rpx;
		height: 100rpx;
	}
	
	.transfer-block {
		border: 1rpx solid blue;
		
		flex-direction: column;
		display: flex;
		
		align-items: center;
	}
	
	.transfer-arrow {
		margin-left: 60rpx;
		margin-right: 60rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		border: 1upx solid red;
		
		width: 72rpx;
		height: 72rpx;
	}
	
	.transfer-text {
		border: 1rpx solid black;
		
		font-size: 30rpx;
		align-content: center;
	}
	.transfer_input {
		border: 1upx solid red;
		
		border-bottom: 1rpx solid grey;
		
		margin-top: 60rpx;
	}
	.transfer_input_text {
		border: 1upx solid black;
		
		margin-left: 20rpx;
		
		font-size: 40rpx;
		font-weight: bold;
	}
	.transfer_input_style {
		margin-top: 20rpx;
		
		margin-left: 20rpx;
		
		border: 1upx solid red;
	}
</style>
