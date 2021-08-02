<template>
	<view>
		<view class="transfer_top">
			<view class="transfer-block">
				<image class="transfer-icon" src="@/static/logo1.png" mode="widthFix" />
				<text class="transfer-text">银行卡</text>
			</view>
			<image class="transfer-arrow" src="@/static/arrow.png" mode="widthFix" />
			<view class="transfer-block">
				<image class="transfer-icon" src="@/static/logo2.png" mode="widthFix" />
				<text class="transfer-text">数字银行钱包</text>
			</view>
		</view>
		<view class="transfer_input">
			<text class="transfer_input_text">充入金额</text>
			<view class="transfer_input_view">
				<image class="icon" src="@/static/rmb_logo_black.png" mode="aspectFill" />
				<input class="transfer_input_style" placeholder="请输入金额"
					placeholder-style="font-size: 30rpx; margin-bottom: 15rpx;" type="digit" confirm-type="done"
					@blur="formatInput" @input="checkInput" v-model="money" />
				<image class="icon" src="@/static/delete.png" mode="aspectFit" @click="deleteMoney" />
			</view>
		</view>
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
		<radio-group class="account_list" v-for="(item,index) in accounts" :key="index"
			v-if="showHidden">
			<view style="display: flex; align-items: center;">
				<image class="account_icon" :src="getAccountIcon(item.bankCode)" mode="aspectFit" />
				<text class="picker_text">{{ item.accId.substr(0, 4) + ' **** ' +  item.accId.substr(15, 4)}}</text>
			</view>
			<view>
				<radio :value="item.accId" :checked="index == account_index" @click="radioIndexChange(index)"/>
			</view>
		</radio-group>
		<button class="button-style2" @click="buttonClick()">下一步</button>
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad" note="请输入银行卡密码" :bankCode="selected_account.bankCode" :accId='selected_account.accId'/>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import numberJpan from '@/components/numberJpan/numberJpan.vue'

	export default {
		components: {
			'number-jpan': numberJpan
		},
		data() {
			return {
				account_index: 0,
				money: '',
				showHidden: false,
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
				}],
				selected_account: {}
			}
		},
		onShow() {
			/*this.$request.getAccounts().then(res => {
				console.log(res)
				this.accounts = res.data.cardList
				this.default_account = this.accounts[0]
				console.log('default_account:', this.default_account)
			})*/
			this.selected_account = this.accounts[0]
		},
		methods: {
			outputcents(amount) {
				amount = Math.round(((amount) - Math.floor(amount)) * 100)
				return (amount < 10 ? '.0' + amount : '.' + amount);
			},
			outputdollars(number) {
				if (number.length <= 3)
					return (number == '' ? '0' : number)
				else {
					var mod = number.length % 3;
					var output = (mod == 0 ? '' : (number.substring(0, mod)));

					for (var i = 0; i < Math.floor(number.length / 3); i++) {
						if ((mod == 0) && (i == 0))
							output += number.substring(mod + 3 * i, mod + 3 * i + 3);
						else
							output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
					}

					console.log('outputdollars', output)

					return (output)
				}
			},
			toThousands(number) {
				number = number + "";
				number = number.replace(/\,/g, "");

				if (isNaN(number) || number == "") return "";

				number = Math.round(number * 100) / 100;

				if (number < 0) {
					return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(
						number) - 0);
				} else {
					return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
				}

			},
			formatInput(event) {
				if (!/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
					this.money = ''
				} else {
					if (event.target.value > Config.getMAXMoney()) {
						uni.showToast({
							title: '输入超过最大值',
							icon: 'error',
							duration: 2000,
							mask: true,
							success: () => {
								this.money = ''
							}
						})
					} else {
						this.money = parseFloat(event.target.value).toFixed(2)
					}
				}
			},
			checkInput(event) {
				if (!/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
					uni.showToast({
						title: '输入不合法',
						icon: 'error',
						duration: 2000,
						mask: true,
						success: () => {
							this.money = ''
						}
					})
				}
			},
			deleteMoney() {
				this.money = ''
			},
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
				// console.log('@/static/' + this.bankCode[src]['short'] + '.png')
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
			closeChange(event) {
				this.$request.walletRecharge(this.accounts[this.account_index].accId, event, this.money).then(res => {
					console.log('res:', res)
					console.log('res.code:', res.code)
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
			},
		}
	}
</script>

<style>
	@import url("@/common/uni.css");

	.transfer_top {
		// border: 1upx solid black;
		margin-top: 30rpx;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		display: flex;
	}

	.transfer-icon {
		// border: 1upx solid red;
		width: 120rpx;
		height: 100rpx;
	}

	.transfer-block {
		// border: 1rpx solid blue;

		flex-direction: column;
		display: flex;

		align-items: center;
	}

	.transfer-arrow {
		margin-left: 60rpx;
		margin-right: 60rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		// border: 1upx solid red;

		width: 72rpx;
		height: 72rpx;
	}

	.transfer-text {
		// border: 1rpx solid black;

		font-size: 30rpx;
		align-content: center;
	}

	.transfer_input {
		// border: 1upx solid red;
		border-top: 2rpx solid #b30000;
		border-bottom: 2rpx solid #b30000;

		padding-top: 25rpx;
		padding-bottom: 40rpx;

		margin-top: 50rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 50rpx;

		justify-content: center;
	}

	.transfer_input_view {
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;

		// border: 1rpx solid black;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.icon {
		// border: 1rpx solid red;

		width: 50rpx;
		height: 50rpx;
	}

	.transfer_input_text {
		// border: 1upx solid black;

		margin-left: 10rpx;
		margin-top: 4rpx;

		font-size: 34rpx;
		font-weight: bold;
	}

	.transfer_input_style {
		border-bottom: 1rpx solid grey;

		// border: 1upx solid red;
		margin-left: 15rpx;
		margin-right: 10rpx;

		width: 100%;
	}
	
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

		font-size: 36rpx;
	}

	.account_icon {
		// border: 1rpx solid red;

		width: 60rpx;
		height: 60rpx;
	}
</style>
