<template>
	<view v-if="wallet.dwId">
		<transfer-top left_content="account" right_content="wallet" />
		<transfer-input input_text="充入金额" @button_disabled="getButtonDisabled($event)" @transfer_money="transferMoney($event)"/>
		<picker-block :accounts="accounts" :selected_account="selected_account" @selected_index="accountIndexChanged($event)"/>
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

	export default {
		components: {
			'number-jpan': numberJpan,
			'transfer-top': transferTop,
			'transfer-input': transferInput,
			'picker-block': pickerBlock,
		},
		data() {
			return {
				account_index: 0,
				money: 0,
				bankCode: Config.getBankCode(),
				accounts: [],
				selected_account: {},
				button_disabled: true,
				wallet: {},
			}
		},
		onShow() {
			this.$request.getAccounts().then(res => {
				this.accounts = res.data.cardList
				this.selected_account = this.accounts[0]
			})
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			});
			this.selected_account = this.accounts[0]
		},
		methods: {
			buttonClick() {
				this.$refs.numberPad.open()
			},
			accountIndexChanged(event){
				this.account_index = event
			},
			transferMoney(event) {
				this.money = Number(event)
			},
			getButtonDisabled(event) {
				this.button_disabled = event
			},
			closeChange(event) {
				this.$request.walletRecharge(this.accounts[this.account_index].accId, event, this.money).then(res => {
					if (res.code == '0') {
						let item = {
							'title': '充钱包成功',
							'button_text': '继续充钱包',
							'url': '/pages/recharge/walletAccount', 
							'amount': this.money,
							'cardId': this.selected_account.accId,
							'walletId': this.wallet.dwId,
							'transtype': 0
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
							'url': '/pages/recharge/walletAccount', 
							'amount': this.money,
							'err_code': res.code,
							'transtype': 0
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
	@import url("@/common/uni.css");
	
	.button_block {
		position: absolute;
		bottom: 25rpx;
		width: 100%;
	}
	
	.button_style {
		margin: 0 auto;
	}
</style>
