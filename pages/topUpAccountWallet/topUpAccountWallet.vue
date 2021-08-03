<template>
	<view>
		<transfer-top left_content="account" right_content="wallet" />
		<transfer-input input_text="充入金额" @button_disabled="getButtonDisabled($event)" @transfer_money="transferMoney($event)"/>
		<view class="picker_unit">
			<view style="display: flex; align-items: center;">
				<image class="icon" src="@/static/select_cards.png" />
				<text class="transfer_input_text" style="color: #515151; margin-left: 8rpx;">选择银行卡</text>
			</view>
			<view class="picker_unit_right">
				<view class="default_account">
					<image class="account_icon" :src="getAccountIcon(selected_account.bankCode)" mode="aspectFit" />
					<text class="picker_text">{{ selected_account.accId.substr(0, 4) + '****' + selected_account.accId.substr(15, 4) }}</text>
				</view>
				<image class="icon" :src="getImageSrc()" @click="clickPickAccounts" />
			</view>
		</view>
		<view v-if="showHidden" style="border-bottom: 1rpx solid grey; margin-left: 55rpx; margin-right: 55rpx;" />
		<scroll-view class="account_list_scroll" scroll-y="true" v-if="showHidden">
			<radio-group class="account_list" v-for="(item,index) in accounts" :key="index">
				<view style="display: flex; align-items: center;">
					<image class="account_icon" :src="getAccountIcon(item.bankCode)" mode="aspectFit" />
					<text class="picker_text">{{ item.accId.substr(0, 4) + ' **** ' +  item.accId.substr(15, 4)}}</text>
				</view>
				<view>
					<radio :value="item.accId" :checked="index == account_index" @click="radioIndexChange(index)"/>
				</view>
			</radio-group>
		</scroll-view>
		<button class="button-style2 button_style" @click="buttonClick()" :disabled="button_disabled">下一步</button>
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad" note="请输入数字钱包支付密码" :bankCode="selected_account.bankCode" :accId='selected_account.accId'/>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import numberJpan from '@/components/numberJpan/numberJpan.vue'
	import transferTop from '@/components/transferTop/transferTop.vue'
	import transferInput from '@/components/transferInput/transferInput.vue'

	export default {
		components: {
			'number-jpan': numberJpan,
			'transfer-top': transferTop,
			'transfer-input': transferInput,
		},
		data() {
			return {
				account_index: 0,
				money: 0,
				showHidden: false,
				bankCode: Config.getBankCode(),
				/*accounts: [{
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
				}],*/
				accounts: [],
				selected_account: {},
				button_disabled: true,
			}
		},
		onShow() {
			this.$request.getAccounts().then(res => {
				console.log(res)
				this.accounts = res.data.cardList
				this.selected_account = this.accounts[0]
				console.log('selected_account:', this.selected_account)
			})
			// this.selected_account = this.accounts[0]
		},
		methods: {
			getImageSrc() {
				if (this.showHidden) {
					return require('@/static/up.png')
				} else {
					return require('@/static/down.png')
				}
			},
			clickPickAccounts() {
				this.showHidden = !this.showHidden
			},
			getAccountIcon(src) {
				return require('@/static/' + this.bankCode[src]['short'] + '.png')
			},
			radioIndexChange(index) {
				this.account_index = index
				this.selected_account = this.accounts[this.account_index]
			},
			buttonClick() {
				console.log(this.accounts[this.account_index])
				this.$refs.numberPad.open()
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
	
	.default_account {
		// border: 1rpx solid black;
		
		display: flex;
		align-items: center;
	}

	.account_picker {
		// border: 1rpx solid blue;
		
		margin-right: 5rpx;
	}
	
	.picker_unit_right {
		// border: 1rpx solid blue;
		
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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
		margin-bottom: 20rpx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.account_list_scroll {
		display: flex;
		flex-direction: row; 
		align-items: center;
		height: 470rpx;
		width: 100%;
	}

	.account_list {
		// border: 1rpx solid blue;

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

	.account_icon {
		// border: 1rpx solid red;

		width: 60rpx;
		height: 60rpx;
	}
	
	.button_style {
		margin-top: 20rpx;
		margin-bottom: 5rpx;
	}
	
	.icon {
		width: 50rpx;
		height: 50rpx;
	}
	
	.transfer_input_text {
		// border: 1upx solid black;
	
		margin-left: 10rpx;
		margin-top: 4rpx;
	
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
