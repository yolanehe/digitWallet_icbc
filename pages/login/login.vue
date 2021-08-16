<template>
	<view>
		<view class="login_top">
			<view class="login_top_title">
				<image class="img" src="/static/digitwallet_logo.png"></image>
				<text class="text-log">数字人民币钱包</text>
			</view>
			<view class="image-style1">
				<image src="@/static/accounting.png" mode="aspectFit"></image>
			</view>
			<text class="title">欢迎进入数字人民币钱包首页</text>
			<button class="button-style2" @tap="login">点击进入主页面</button>
		</view>
		<view class="foot">
			<view class="foot_block">
				<image class="icon" src="@/static/thumbs.png" />
				<text class="foot_text">珠海研发二部 爱存不存夸夸群</text>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				pwd_show: true,
				count: 0,
			};
		},
		methods: {
			login() {
				uni.navigateTo({
					url: "/pages/index/index",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>
 
<style>
	@import url("@/common/uni.css");
	.login_top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
	}
	.login_top_title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.image-style1{
		margin-top:100rpx;
	}
	.title {
		margin-top: 100rpx;
		font-size: 30rpx;
		font-weight: 500;
	}
	.note {
		margin-top: 10rpx;
		font-size: 26rpx;
	}
	.count_view {
		margin-top: 240rpx;
		font-size: 25rpx;
	}
	.img {
		width: 80rpx;
		height: 80rpx;
		margin-right: 15rpx;
	}
	.text-log{
		font-size: 50rpx;
		font-weight: bold;
	}
		
	.foot {
		position: absolute;
		bottom: 25rpx;
		width: 100%;
	}
	
	.foot_block {
		display: flex;
		flex-direction: row;
		align-items: center;		
		bottom: 50rpx;
		margin-bottom: 5rpx;
	}
	
	.icon {
		width: 60rpx;
		height: 60rpx;
		margin-left: 25%;
	}
	
	.foot_text {
		margin-left: 15rpx;
		font-size: 26rpx;
		color: #b30000;
	}
</style>

