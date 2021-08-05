<template>
	<view class="view">
		<view class="top">
			<image class="img" src="@/static/success.png" />
			<text class="title_text">{{ title }}</text>
		</view>
		<text class="text">{{ text }}</text>
		<view class="view1">
			<button class="button-style2" @tap="navi">{{ button_text }}</button>
			<button class="button-style1" @tap="navi_index">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				button_text: '',
				url: '',
				amount: 0,
				walletId: '',
				cardId: '',
				text: '',
				transtype: 0
			};
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item))
			this.title = item.title
			this.button_text = item.button_text
			this.url = item.url
			this.amount = parseFloat(item.amount).toFixed(2)
			this.transtype = item.transtype
			this.walletId = item.walletId
			this.cardId = item.cardId
			
			console.log(this.amount)
			
			// 0: 充钱包 1: 存银行
			// 2: 充值 3: 提现
			switch (this.transtype) {
				case 0:
					this.text = '已成功向尾号为' + this.walletId + '的数字钱包充值 ' + this.amount + ' 元'
					break;
				case 1:
					this.text = '已成功向尾号为' + this.cardId + '的银行卡存入 ' + this.amount + ' 元'
					break;
				case 2:
					this.text = '已成功向尾号为' + this.cardId + '的卡式软钱包充值 ' + this.amount + ' 元'
					break;
				case 3:
					this.text = '已成功向尾号为' + this.walletId + '的数字钱包提现 ' + this.amount + ' 元'
					break;
				default:
					break;
			}
		},
		methods:{
			navi_index() {
				uni.redirectTo({
					url: "/pages/index/index"
				});
			},
			navi() {
				uni.redirectTo({
					url: this.url
				});
			}
		}
	}
</script>

<style>
	@import url("@/common/uni.css");
	.view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.top {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		
		padding-top: 50rpx;
		padding-bottom: 50rpx;
	}
	.img{
		width: 180rpx;
		height: 180rpx;
	}
	.title_text {
		color: #0e932e;
		margin-left: 15rpx;
		font-weight: bold;
		font-size: 38rpx;
	}
	.text {
		font-size: 30rpx;
		font-weight: bold;
		
		margin-top: 30rpx;
		margin-bottom: 40rpx;
		
		padding-bottom: 12rpx;
		border-bottom: 1rpx dashed black;
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
