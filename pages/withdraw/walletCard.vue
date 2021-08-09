<template>
	<view>
		<transfer-top left_content="card" right_content="wallet" />
		<view class="card_detail">
			<text class="card_detail_title">卡式软钱包</text>
			<view class="card_detail_block">
				<image class="card_detail_icon" src="@/static/card.png" />
				<text class="card_detail_text">卡号: {{ card.cid }}</text>
			</view>
			<view class="card_detail_block">
				<image class="card_detail_icon" src="@/static/balance.png" />
				<text class="card_detail_text">余额: {{ parseFloat(card.amount).toFixed(2) }} 元</text>
			</view>
		</view>
		<wallet-detail :wallet="wallet" />
		<view class="button_block">
			<button class="button-style2 button_style" @click="buttonClick()" :disabled="button_disabled">一键提现</button>
		</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import transferTop from '@/components/transferTop/transferTop.vue'
	import pickerBlock from '@/components/pickerBlock/pickerBlock.vue'
	import walletDetail from '@/components/wallet-detail/wallet-detail.vue'
	
	export default {
		data() {
			return {
				button_disabled: false,
				card: {},
				wallet: {},
			}
		},
		components: {
			'transfer-top': transferTop,
			'picker-block': pickerBlock,
			'walletdetail': walletDetail,
		},
		onShow() {
			this.$request.getCardInfo('0021002192001892', {}).then(res => {
				this.card = res.data.cardInfo.card
			});
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			});
		},
		methods: {
			buttonClick() {
				this.$request.cardWithdraw(this.card.cid, this.wallet.dwId).then(res => {
					if (res.code == '0') {
						let item = {
							'title': '充值成功',
							'button_text': '继续充值',
							'url': '/pages/withdraw/walletCard', 
							'amount': this.card.amount,
							'cardId': this.card.cid.substr(this.card.cid.length - 4, 4),
							'walletId': this.wallet.dwId.substr(this.wallet.dwId.length - 4, 4),
							'transtype': 3
						}
						
						uni.redirectTo({
							url: "/pages/success/success?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
					else {
						let item = {
							'title': '充钱包失败',
							'button_text': '继续充钱包',
							'url': '/pages/withdraw/walletCard', 
							'amount': this.money,
							'err_code': res.code
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
		}
	}
</script>

<style>
	@import url('@/common/uni.css');
	
	.card_detail {
		border-top: 2rpx solid #b30000;
		border-bottom: 2rpx solid #b30000;
	
		padding-top: 25rpx;
		padding-bottom: 30rpx;
	
		margin-top: 50rpx;
		margin-left: 28rpx;
		margin-right: 28rpx;
		margin-bottom: 20rpx;
	
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
	}
	
	.card_detail_title {
		margin-left: 38rpx;
		margin-bottom: 18rpx;
			
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.card_detail_block {
		margin-top: 8rpx;
		margin-left: 125rpx;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	
	.card_detail_icon {
		width: 45rpx;
		height: 45rpx;
		
		margin-right: 12rpx;
	}
	
	.card_detail_text {
		font-size: 30rpx;
	}
</style>
