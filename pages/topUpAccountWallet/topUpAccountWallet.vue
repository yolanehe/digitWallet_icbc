<template>
	<view>
		<transfer-top left_content="account" right_content="wallet" />
		<transfer-input input_text="充入金额" @button_disabled="getButtonDisabled($event)" @transfer_money="transferMoney($event)"/>
		<picker-block :accounts="accounts" @selected_index="accountIndexChanged($event)"/>
		<view class="button_block">
			<button class="button-style2 button_style" @click="buttonClick()" :disabled="button_disabled">下一步</button>
		</view>
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad" note="请输入数字钱包支付密码" :bankCode="selected_account.bankCode" :accId='selected_account.accId'/>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import numberJpan from '@/components/numberJpan/numberJpan.vue'
	import transferTop from '@/components/transferTop/transferTop.vue'
	import transferInput from '@/components/transferInput/transferInput.vue'
	import pickerBlock from '@/components/pickerBlock/pickerBlock.vue'

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
				accounts: [{
					'bankCode': '102',
					'accId': '2002002020100021324',
				}, {
					'bankCode': '104',
					'accId': '2002002020100021324',
				}, {
					'bankCode': '103',
					'accId': '2005124440100021324',
				}, {
					'bankCode': '103',
					'accId': '3882002020100021324',
				}, {
					'bankCode': '102',
					'accId': '2002002020100021324',
				}, {
					'bankCode': '104',
					'accId': '2002002020100021324',
				}, {
					'bankCode': '103',
					'accId': '2005124440100021324',
				}, {
					'bankCode': '103',
					'accId': '3882002020100021324',
				}],
				// accounts: [],
				selected_account: {},
				button_disabled: true,
			}
		},
		onShow() {
			/*this.$request.getAccounts().then(res => {
				console.log(res)
				this.accounts = res.data.cardList
				this.selected_account = this.accounts[0]
				console.log('selected_account:', this.selected_account)
			})*/
			this.selected_account = this.accounts[0]
		},
		methods: {
			buttonClick() {
				console.log(this.accounts[this.account_index])
				this.$refs.numberPad.open()
			},
			accountIndexChanged(event){
				this.account_index = event
				console.log('accountIndexSelectedChanged:', event)
			},
			transferMoney(event) {
				console.log('topup transferMoney event:', event)
				this.money = Number(event)
			},
			getButtonDisabled(event) {
				this.button_disabled = event
			},
			closeChange(event) {
				console.log('closeChange:', this.money)
				this.$request.walletRecharge(this.accounts[this.account_index].accId, event, this.money).then(res => {
					if (res.code == '0') {
						let item = {
							'title': '充值成功',
							'button_text': '继续充值',
							'url': '/pages/topUpAccountWallet/topUpAccountWallet', 
							'amount': this.money,
							'Id': '00929',
							'transtype': 0
						}
						
						uni.navigateTo({
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
							'url': '/pages/topUpAccountWallet/topUpAccountWallet', 
							'amount': this.money,
							'Id': '00929',
							'err_code': res.code
						}
						
						uni.navigateTo({
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
	
	.picker_block{
		margin-top: 50rpx;
	}
	
	.picker_unit {
		border: 3rpx dashed grey;
		border-radius: 40rpx;
	
		padding-left: 30rpx;
		padding-right: 25rpx;
		padding-top: 20rpx;
		padding-bottom: 25rpx;
	
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 35rpx;
	
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.picker_unit_left {
		display: flex;
		align-items: center;
	}
	
	.picker_unit_right {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.transfer_input_text {
		margin-left: 10rpx;
		margin-top: 4rpx;
	
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.icon {
		width: 50rpx;
		height: 50rpx;
	}
	
	.default_account {
		display: flex;
		align-items: center;
	}
	
	.parting {
		border-bottom: 1rpx solid grey; 
		margin-left: 55rpx; 
		margin-right: 55rpx;
	}

	.account_picker {
		margin-right: 5rpx;
	}
	
	.account_list_scroll {
		display: flex;
		flex-direction: row; 
		align-items: center;
		height: 400rpx;
		width: 100%;
		
		transition-duration: 3s;
	}

	.account_list {
		border-bottom: 1rpx solid grey;

		margin-left: 55rpx;
		margin-right: 55rpx;

		padding-top: 5rpx;
		padding-bottom: 5rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.picker_text {
		// border: 1rpx solid pink;

		font-size: 30rpx;
	}
	
	.content-open {
		height: 400rpx;
		overflow: hidden;
		transition: all 0.2s linear;
	}
	
	.content-close {
		height: 0;
		transition: all 0.2s linear;
	}
	
	.item-close {
		opacity: 0;
		height: 0;
	}

	.account_icon {
		width: 60rpx;
		height: 60rpx;
	}
	
	.button_block {
		position: absolute;
		bottom: 25rpx;
		width: 100%;
	}
	
	.button_style {
		margin: 0 auto;
	}
</style>
