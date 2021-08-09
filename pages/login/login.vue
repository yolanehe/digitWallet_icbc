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
				<!-- <input class="input" type="text" value="" placeholder="请输入用户名"/> -->
				<input v-model.trim="phone" maxlength="11" placeholder-style="color: #AFAFB8" class="input" type="number" placeholder="请输入手机号" />
			</view>
			<view class="inputWrapper">
				<!-- <input class="input" type="password" value="" placeholder="请输入密码"/> -->
				<input v-model.trim="password" maxlength="8" placeholder-style="color: #AFAFB8" class="input" type="text" placeholder="请输入密码" :password="pwd_show" />
			</view>
			<!-- <view class="" @tap="wallet">
				<button class="btnValue">登录</button>
			</view> -->
			<view class="loginBtn" :class="(phone.length == 11 && password.length == 8) ? 'btn2' : ''" @click="login" @tap="wallet">登录</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				pwd_show: true
			};
		},
		onLoad() {
 
		},
		methods: {
			wallet() {
				const { phone, password } = this;
				if (phone !== '18831636610') {
					uni.showToast({
						title: '手机号不正确',
						icon: 'none'
					});
					return;
				}
				if (password !== '88888888') {
					uni.showToast({
						title: '密码不正确',
						icon: 'none'
					});
					return;
				}
				if (phone == '18831636610'&&password == '88888888'){
					uni.showToast({
						title: '登陆成功',
						duration:2000
					});
					setTimeout(function() {
						uni.redirectTo({
							url: "/pages/index/index",
							title: '登录成功',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					},2000);
				}
			},
			login() {
				const { phone, password } = this;
				if (phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				if (password == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}
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
		color: white;
		background: #dd8683;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.btn2 {
		background-color: #c80b1e !important;
	}	
</style>

