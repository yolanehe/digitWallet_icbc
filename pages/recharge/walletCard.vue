<template>
	<view>
		<transfer-top left_content="wallet" right_content="card" />
		<transfer-input input_text="充值金额" display_notes :amount=" dayDetail.cardTimes + '' " @button_disabled="getButtonDisabled($event)" @transfer_money="transferMoney($event)"/>
		<wallet-detail :wallet="wallet" />
		<view class="button_block">
			<button class="button-style2 button_style" @click="buttonClick()" :disabled="button_disabled">下一步</button>
		</view>
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad" note="请输入数字钱包支付密码"/>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import transferTop from '@/components/transferTop/transferTop.vue'
	import transferInput from '@/components/transferInput/transferInput.vue'
	import pickerBlock from '@/components/pickerBlock/pickerBlock.vue'
	import numberJpan from '@/components/numberJpan/numberJpan.vue'
	import walletDetail from '@/components/wallet-detail/wallet-detail.vue'
	
	export default {
		data() {
			return {
				money: 0,
				button_disabled: true,
				card: {},
				wallet: {},
				dayDetail: {},
			}
		},
		components: {
			'number-jpan': numberJpan,
			'transfer-top': transferTop,
			'transfer-input': transferInput,
			'picker-block': pickerBlock,
			'wallet-detail': walletDetail,
		},
		onLoad(option) {
			this.$request.getCardInfo(option.cid, {}).then(res => {
				this.card = res.data.cardInfo.card
				this.dayDetail = res.data.cardInfo.dayDetail
			});
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			});
		},
		methods: {
			buttonClick() {
				this.$refs.numberPad.open()
			},
			transferMoney(event) {
				this.money = Number(event)
			},
			getButtonDisabled(event) {
				this.button_disabled = event
			},
			closeChange(event) {
				this.$request.cardRecharge(this.card.cid, this.wallet.dwId, event, this.money).then(res => {
					if (res.code == '0') {
						let item = {
							'title': '充值成功',
							'button_text': '继续充值',
							'url': '/pages/recharge/walletCard', 
							'amount': this.money,
							'cardId': this.card.cid,
							'walletId': this.wallet.dwId,
							'transtype': 2
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
							'title': '充值失败',
							'button_text': '继续充值',
							'url': '/pages/recharge/walletCard', 
							'amount': this.money,
							'err_code': res.code,
							'transtype': 2,
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
		}
	}
</script>

<style>
	@import url('@/common/uni.css');
</style>
