<template>
	<view v-if="wallet.dwId">
		<transfer-top left_content="wallet" display_detail right_content="account" />
		<transfer-input input_text="存入金额" display_detail :wallet_balance="wallet.amount" @button_disabled="getButtonDisabled($event)" @transfer_money="transferMoney($event)" />
		<picker-block :accounts="accounts" :selected_account="selected_account" @selected_index="accountIndexChanged($event)"/>
		<view class="button_block">
			<button class="button-style2 button_style" @click="buttonClick()" :disabled="button_disabled">下一步</button>
		</view>
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad" note="请输入数字钱包支付密码"/>
	</view>
</template>

<script>
	import transferTop from '@/components/transferTop/transferTop.vue'
	import transferInput from '@/components/transferInput/transferInput.vue'
	import pickerBlock from '@/components/pickerBlock/pickerBlock.vue'
	import numberJpan from '@/components/numberJpan/numberJpan.vue'
	
	export default {
		components: {
			'transfer-top': transferTop,
			'transfer-input': transferInput,
			'picker-block': pickerBlock,
			'number-jpan': numberJpan,
		},
		data() {
			return {
				wallet: {},
				account_index: 0,
				money: 0,
				accounts: [],
				selected_account: {},
				button_disabled: true,
			}
		},
		onShow() {
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			});
			this.$request.getAccounts().then(res => {
				this.accounts = res.data.cardList
				this.selected_account = this.accounts[0]
			});
			this.selected_account = this.accounts[0]
		},
		methods: {
			accountIndexChanged(event){
				this.account_index = event
			},
			getButtonDisabled(event) {
				this.button_disabled = event
			},
			buttonClick() {
				this.$refs.numberPad.open()
			},
			transferMoney(event) {
				this.button_disabled = false
				this.money = Number(event)
			},
			closeChange(event) {
				this.$request.walletWithdraw(this.accounts[this.account_index].accId, event, this.money).then(res => {
					if (res.code == '0') {
						let item = {
							'title': '存银行成功',
							'button_text': '继续存银行',
							'url': '/pages/withdraw/walletAccount', 
							'amount': this.money,
							'cardId': this.selected_account.accId,
							'walletId': this.wallet.dwId,
							'transtype': 1
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
							'title': '存银行失败',
							'button_text': '继续存银行',
							'url': '/pages/withdraw/walletAccount', 
							'amount': this.money,
							'err_code': res.code,
							'transtype': 1
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
