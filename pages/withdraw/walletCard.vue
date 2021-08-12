<template>
	<view v-if="card.cid">
		<transfer-top left_content="card" right_content="wallet" />
		<view class="card_detail">
			<text class="card_detail_title">卡式软钱包</text>
			<view class="card_detail_block">
				<image class="card_detail_icon" src="@/static/card.png" />
				<text class="card_detail_text">卡号: {{ parseInt(card.cid, 16) }}</text>
			</view>
			<view class="card_detail_block">
				<image class="card_detail_icon" src="@/static/balance.png" />
				<text class="card_detail_text">余额: {{ parseFloat(card.amount).toFixed(2) }} 元</text>
			</view>
			<text v-if="disabled_withdraw" class="transfer_input_notes">卡式软钱包余额为0,请先充值再提现</text>
		</view>
		<wallet-detail :wallet="wallet" />
		<view class="button_block">
			<button class="button-style2 button_style" @click="buttonClick">{{ button_text }}</button>
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
				disabled_withdraw: false,
				button_text: '一键提现',
				card: {},
				wallet: {},
			}
		},
		components: {
			'transfer-top': transferTop,
			'picker-block': pickerBlock,
			'walletdetail': walletDetail,
		},
		onLoad(option) {
			this.$request.getCardInfo(option.cid, {}).then(res => {
				this.card = res.data.cardInfo.card
				
				if (this.card.amount == 0) {
					this.button_text = "返回软卡主页面"
					this.disabled_withdraw = true
				}
				
				console.log('card:', this.card)
				console.log('button_text:', this.button_text)
				console.log('disabled_withdraw:', this.disabled_withdraw)
			});
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			});
		},
		methods: {
			buttonClick() {
				if (!this.disabled_withdraw) {
					this.$request.cardWithdraw(this.card.cid, this.wallet.dwId).then(res => {
						if (res.code == '0') {
							let item = {
								'title': '提现成功',
								'button_text': '继续提现',
								'url': '/pages/withdraw/walletCard', 
								'amount': this.card.amount,
								'cardId': this.card.cid,
								'walletId': this.wallet.dwId,
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
								'title': '提现失败',
								'button_text': '继续提现',
								'url': '/pages/withdraw/walletCard', 
								'amount': this.money,
								'err_code': res.code,
								'transtype': 3,
								'cardId': this.card.cid,
							}
							
							uni.redirectTo({
								url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					})
				}
				else {
					uni.redirectTo({
						url: "/pages/carddetail/carddetail?cid=" + this.card.cid,
						success: res => {},
						fail: () => {},
						complete: () => {}
					})
				}
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
	
	.transfer_input_notes {
		margin-left: 42rpx;
		margin-top: 20rpx;
		
		font-size: 26rpx;
		font-weight: bold;
		color: #b30000;
	}
</style>
