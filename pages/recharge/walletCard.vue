<template>
	<view v-if="wallet.dwId">
		<transfer-top left_content="wallet" right_content="card" />
		<transfer-input input_text="充值金额" display_notes :transfer_amount="dayDetail.cardTimes" :wallet_balance="wallet.amount" :card_balance="20000-card.amount" @button_disabled="getButtonDisabled($event)" @transfer_money="transferMoney($event)"/>
		<wallet-detail :wallet="wallet" />
		<view class="button_block">
			<button class="button-style2 button_style" @click="buttonClick()" :disabled="button_disabled">下一步</button>
		</view>
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad" note="请输入数字钱包支付密码进行软卡校验" transferType="转入" :transfer_money="money"/>
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
			this.$request.getCardInfo(option.cid).then(res => {
				this.card = res.data.cardInfo.card
				this.dayDetail = res.data.cardInfo.dayDetail
			});
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			});
			
			if (this.dayDetail.cardTimes == 0) {
				this.button_disabled = true
			}
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
				this.pwd = event
				uni.redirectTo({
					url: '/pages/identifyCard/identifyCard?type=2&checkType=0&Id=' + this.card.cid + '&dwId=' + this.wallet.dwId + '&money=' + this.money + '&pwd=' + event,
				})
			}
		}
	}
</script>

<style>
	@import url('@/common/uni.css');
</style>
