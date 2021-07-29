<template>
	<view class="view">
		<image class="img" src="@/static/success.png" mode="widthFix" />
		<text class="text">充值成功</text>
		<view class="view1">
			<button class="button_continue" type="warn">继续充值</button>
			<button class="button_back" >返回</button>
		</view>
		
	</view>
</template>

<script>
	
</script>

<style>
	.view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.img{
		margin-top: 100rpx;
		margin-bottom: 50rpx;
		width: 130px;
	}
	.text{
		height:100rpx;
	}
	.view1{
		height:80rpx;
		width: 100%;
		
	}
	.button_continue
	{
		width: 100%;
		color: white;
		font-size: 35upx;
	}
	.button_back{
		margin-top: 50rpx;
		width: 100%;
		color:black;
		font-size: 35upx;
	}
</style>
