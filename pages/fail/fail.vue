<template>
	<view class="view">
		<view class="top">
			<image class="img" src="@/static/fail.png" />
			<text class="title_text">{{ text }}</text>
		</view>
		<view class="view1">
			<button class="button-style2" @tap="navi">{{ button_text }}</button>
			<button class="button-style1" @tap="navi_index">返回首页</button>
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
			};
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item))
			this.title = item.title
			this.button_text = item.button_text
			this.url = item.url
			this.amount = item.amount
			this.transtype = item.transtype
			this.Id = item.Id
			this.text = this.err_map[item.err_code]
			this.transtype = item.transtype
			
			if (this.transtype == 2 || this.transtype == 3) {
				this.cardId = item.cardId
			}
			
			console.log('title:', this.title)
			
			uni.setNavigationBarTitle({
				title: this.title
			})
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
		flex-direction: column;
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
		margin-top: 35rpx;
		
		font-weight: bold;
		font-size: 38rpx;
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