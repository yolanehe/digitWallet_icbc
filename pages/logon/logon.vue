<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="/static/digitwallet_logo.png" mode="widthFix"></image>
			</view>
			<view class="avatext">
				<text class="text-log">欢迎登录数字钱包</text>
			</view>
		</view>
		<view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" value="" placeholder="请输入用户名"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" value="" placeholder="请输入密码"/>
			</view>
			<view class="loginBtn" @tap="wallet">
				<button class="btnValue">登录</button>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
 
		},
		methods: {
			wallet() {
				uni.redirectTo({
					url: "/pages/index/index",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>
 
<style>
	.content {
		background: #EEEEEE;
		width: 100vw;
		height: 100vh;
	
	}
	.avatorWrapper{
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		top: 40rpx;
		height: 400rpx; 
		//border: 1upx solid red;
	}
	.avatext{
		margin-top: 40rpx;
		//border: 1upx solid red;
	}
	.text-log{
		color: #3B4144;
		font-size: 50rpx;
	}
	.avator{
		width: 200upx;
		height: 200upx;
		//overflow: hidden;
		margin-top: 60rpx;
		//border: 1upx solid red;
	}
	.avator .img{
		width: 100%
	}
	.form{
		padding: 0 100upx;
		margin-top: 80px;
	}
	.inputWrapper{
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}
	.inputWrapper .input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}
	.loginBtn{
		width: 100%;
		height: 80upx;
		//background: #77B307;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.loginBtn .btnValue{
		width: 800rpx;
		background: #77B307;
		color: white;
		height: 80upx;
		line-height:80upx;
		border-radius: 30px;
		display: flex;
		justify-content: center;
		text-align: center;
	}
	
	
</style>

