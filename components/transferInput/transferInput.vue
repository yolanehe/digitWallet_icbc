<template>
	<view>
		<view class="transfer_input">
			<view class="transfer_input_title">
				<text class="transfer_input_text">{{ input_text }}</text>
				<text v-if="display_warning" class="transfer_input_notes">{{ warning_text }}</text>
				</text>
			</view>
			<view class="transfer_input_view">
				<image class="icon" src="@/static/rmb_logo_black.png" mode="aspectFill" />
				<input class="transfer_input_style" placeholder="请输入金额"
					placeholder-style="font-size: 40rpx; margin-bottom: 30rpx;" confirm-type="done"
					@blur="formatInput" @input="checkInput" :value="money"/>
				<image class="icon" src="@/static/delete.png" mode="aspectFit" @click="deleteMoney" />
			</view>
			<view class="transfer_notes" v-if="display_notes">
				<text class="transfer_input_text">当日可充次数: {{ transfer_amount }} 次</text>
				<text class="wallet_detail_notes">每次可充值上限为500.00元</text>
			</view>
			<view class="transfer_notes" v-if="display_notes">
				<text class="transfer_input_text">卡式钱包可充金额: {{ card_balance }} 元</text>
				<text class="wallet_detail_notes">卡式钱包余额上限为20000.00元</text>
			</view>
		</view>
		<view class="wallet_detail" v-if="display_detail">
			<text class="wallet_detail_text">可用金额: {{ parseFloat(wallet_balance).toFixed(2) }} 元</text>
			<button class="button-style1 total_button" @click="totalWalletMoney">全部存入</button>
		</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	
	export default {
		name:"transferInput",
		data() {
			return {
				money: '',
				button_disabled: true,
				max_money: Config.getMAXMoney(),
				warning_text: '输入金额超过最大金额上限',
				display_warning: false
			};
		},
		props: ['input_text', 'display_detail', 'card_balance', 'display_button', 'transfer_amount', 'wallet_balance','display_notes'],
		created:function(){
			if (this.display_notes) {
				this.max_money = 500
			}
		},
		methods: {
			formatInput(event) {
				if (this.money != '') {
					this.money = parseFloat(this.money).toFixed(2)
					
					this.button_disabled = true 
				
					
					if (this.money == 0 || this.money > this.max_money) {
						this.button_disabled = true
						this.display_warning = false
					}
					else {
						if ((this.display_detail ||  this.display_notes) && (this.money > this.wallet_balance)) {
							this.button_disabled = true
							this.display_warning = true
							
							this.warning_text = '输入金额超过数字钱包余额上限'
						}
						else {
							this.display_warning = false
							this.button_disabled = false
						}
					}
				}
				else {
					this.display_warning = false
					this.button_disabled = true
				}
				
				this.$emit('button_disabled', this.button_disabled)
				this.$emit('transfer_money', this.money)
			},
			checkInput(event) {
				let curr = event.detail.value
				
				if(/^([1-9]\d{0,7}|0)([.]?|(\.\d{1,2})?)$/.test(curr) && curr <= this.max_money) {
					this.display_warning = false
					this.button_disabled = false
					this.money = curr
				}
				else {
					if (curr > this.max_money) {
						this.display_warning = true
					}
					this.button_disabled = true
					this.money = curr.substr(0, curr.length - 1)
				}
				this.$emit('button_disabled', this.button_disabled)
				return this.money
			},
			deleteMoney() {
				this.money = ''
				this.button_disabled = true
				this.display_warning = false
				this.$emit('button_disabled', this.button_disabled)
			},
			totalWalletMoney() {
				this.money = parseFloat(this.wallet_balance).toFixed(2)
				if (this.money == 0) {
					this.button_disabled = true
				}
				else {
					this.button_disabled = false
				}
				this.display_warning = false
				this.$emit('transfer_money', this.money)
				this.$emit('button_disabled', this.button_disabled)
			}
		}
	}
</script>

<style>
	.transfer_input {
		border-top: 2rpx solid #b30000;
		border-bottom: 2rpx solid #b30000;
	
		padding-top: 25rpx;
		padding-bottom: 20rpx;
	
		margin-top: 50rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	
		justify-content: center;
	}
	
	.transfer_input_view {
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	
	.icon {
		width: 50rpx;
		height: 50rpx;
	}
	
	.transfer_input_title {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.transfer_input_text {
		margin-left: 10rpx;
		margin-top: 4rpx;
	
		font-size: 26rpx;
		font-weight: bold;
	}
	
	.transfer_input_notes {
		font-size: 22rpx;
		color: #b30000;
		margin-left: 15rpx;
	}
	
	.transfer_input_style {
		border-bottom: 1rpx solid grey;
		margin-left: 15rpx;
		margin-right: 10rpx;
	
		width: 100%;
	}
	.transfer_notes {
		display: flex;
		flex-direction: row;
		
		margin-top: 10rpx;
		
		align-items: center;
		justify-content: space-between;
	}
	
	.wallet_detail {
		display: flex;
		flex-direction: row;
		
		margin-left: 40rpx;
		margin-right: 30rpx;
		margin-top: 35rpx;
		
		align-items: center;
		justify-content: space-between;
	}
	.wallet_detail_text {
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.total_button {
		margin: 0;
		font-size: 25rpx;
		width: 25%;
	}
	
	.wallet_detail_notes {
		color: #b30000;
		font-size: 24rpx;
		font-weight: bold;
	}
</style>
