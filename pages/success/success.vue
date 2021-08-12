<template>
	<view class="view">
		<view class="top">
			<image class="img" src="@/static/success.png" />
		</view>
		<text class="title_text">{{ title }}</text>
		<text v-if="transtype != 4" class="money">{{ amount }}元</text>
		<text class="text">{{ text }}</text>
		<view class="view_button">
			<button class="button-style2 button_style" @tap="navi">{{ button_text }}</button>
			<button class="button-style1 button_style" @tap="navi_index">返回首页</button>
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
			this.transtype = item.transtype
			
			if (this.transtype != 4) {
				this.amount = parseFloat(item.amount).toFixed(2)
				this.walletId = item.walletId
				this.cardId = item.cardId
			}
			
			// 0: 充钱包 1: 存银行
			// 2: 充值 3: 提现
			// 4: 开立软卡
			switch (this.transtype) {
				case 0:
					this.text = '已成功向尾号为' + this.walletId.substr(this.walletId.length - 4, 4) + '的数字钱包充值 ' + this.amount + ' 元'
					break;
				case 1:
					this.text = '已成功向尾号为' + this.cardId.substr(this.cardId.length - 4, 4) + '的银行卡存入 ' + this.amount + ' 元'
					break;
				case 2:
					this.text = '已成功向尾号为' + parseInt(this.cardId, 16) % 10000 + '的卡式软钱包充值 ' + this.amount + ' 元'
					break;
				case 3:
					this.text = '已成功向尾号为' + this.walletId.substr(this.walletId.length - 4, 4) + '的数字钱包提现 ' + this.amount + ' 元'
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
				if (this.transtype == 2 || this.transtype == 3) {
					this.url += '?cid=' + this.cardId
				}
				
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
		
		padding-top: 120rpx;
		padding-bottom: 50rpx;
	}
	.img{
		width: 180rpx;
		height: 180rpx;
	}
	.title_text {
		font-weight: bold;
		font-size: 34rpx;
	}
	.money {
		font-size: 75rpx;
		font-weight: bold;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	.text {
		font-size: 30rpx;
		font-weight: bold;
		
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		
		padding-bottom: 12rpx;
	}
	.view_button{
		width: 100%;
		
		position: absolute;
		bottom: 320rpx;
	}
	.button_style
	{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
