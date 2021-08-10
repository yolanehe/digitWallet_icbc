<template>
	<view>
		<view class="transfer_input">
			<view class="transfer_input_title">
				<text class="transfer_input_text">{{ input_text }}</text>
				<!--<text v-if="display_warning" class="transfer_input_notes">输入金额超过数字钱包余额</text>-->
				</text>
			</view>
			<view class="transfer_input_view">
				<image class="icon" src="@/static/rmb_logo_black.png" mode="aspectFill" />
				<input class="transfer_input_style" placeholder="请输入金额"
					placeholder-style="font-size: 40rpx; margin-bottom: 30rpx;" confirm-type="done"
					@blur="formatInput" @input="checkInput" v-model="money"/>
				<image class="icon" src="@/static/delete.png" mode="aspectFit" @click="deleteMoney" />
			</view>
			<view class="transfer_notes" v-if="display_notes">
				<text class="transfer_input_text">可充金额: {{ parseFloat(amount).toFixed(2) }} 元</text>
				<text v-if="display_notes" class="wallet_detail_notes">贴一贴卡式钱包余额上限为200.00元</text>
				<button v-if="display_button" class="button-style1 total_button" @click="totalWalletMoney">全部存入</button>
			</view>
		</view>
		<view class="wallet_detail" v-if="display_detail">
			<text class="wallet_detail_text">可用金额: {{ parseFloat(amount).toFixed(2) }} 元</text>
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
			};
		},
		props: ['input_text', 'display_detail', 'display_button', 'amount', 'display_notes', 'display_warning'],
		methods: {
			formatInput(event) {
				if (this.money != '') {
					this.money = parseFloat(this.money).toFixed(2)
					
					if (this.money == 0 || this.money[this.money.length - 1] == '.') {
						this.button_disabled = true
					}
					else {
						this.button_disabled = false
					}
				}
				else {
					this.button_disabled = true
				}
				
				this.$emit('button_disabled', this.button_disabled)
				this.$emit('transfer_money', this.money)
			},
			checkInput(event) {
				let curr = event.detail.value
	
				if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,3})?$/.test(curr) && curr <= Config.getMAXMoney()) {
					this.button_disabled = false
				}
				else {
					this.button_disabled = true
				}
				this.$emit('button_disabled', this.button_disabled)
				this.$nextTick(() => {
					this.money = (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(curr) && curr <= Config.getMAXMoney()) ? curr : curr.substr(0, curr.length - 1)
				})
			},
			deleteMoney() {
				this.money = ''
				this.button_disabled = true
				this.$emit('button_disabled', this.button_disabled)
			},
			totalWalletMoney() {
				this.money = parseFloat(this.amount).toFixed(2)
				this.$emit('transfer_money', this.money)
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
		
		margin-top: 20rpx;
		
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
