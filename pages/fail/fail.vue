<template>
	<view class="view">
		<view class="top">
			<image class="img" src="@/static/fail.png" />
		</view>
		<text class="title_text">{{ title }}</text>
		<text v-if="transtype != 4 && transtype != 5" class="money">{{ amount }}元</text>
		<text class="text">错误原因:{{ text }}</text>
		<view class="view_button">
			<button class="button-style2 button_style" @tap="navi">{{ button_text }}</button>
			<button v-if ="showButton" class="button-style1 button_style" @tap="navi_index">返回首页</button>
		</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	
	export default {
		data() {
			return {
				title: '操作失败',
				button_text: '继续充值',
				url: '/pages/topUpAccountWallet/topUpAccountWallet',
				amount: 0,
				text: '',
				transtype: 0,
				err_map: Config.getErrMessage(),
				cardId: '',
				type: 0,
				showButton: true,
				button_back_index_text: '返回主页'
			};
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item))
			this.title = item.title
			this.url = item.url
			this.transtype = item.transtype
			this.text = this.err_map[item.err_code]
			this.button_text = item.button_text
			
			if (this.transtype == 5) {
				this.showButton = false
			}
			else {
				this.Id = item.Id
				
				if (this.transtype == 2 || this.transtype == 3) {
					this.cardId = item.cardId
				}
				
				if (this.transtype != 4) {
					this.amount = parseFloat(item.amount).toFixed(2)
				}
			}
			
			console.log('this.transtype:', this.transtype)
			
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods:{
			navi_index() {
				if (this.transtype == 2 || this.transtype == 3) {
					uni.redirectTo({
						url: "/pages/carddetail/carddetail?cid=" + this.cardId,
					});
				}
				else {
					uni.redirectTo({
						url: "/pages/index/index"
					});
				}
			},
			navi() {
				// console.log('url:',this.url)
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
		flex-direction: column;
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
		color: #b30000;
	}
	.view_button{
		position: absolute;
		bottom: 320rpx;
		width: 100%;
	}
	.button_style
	{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>