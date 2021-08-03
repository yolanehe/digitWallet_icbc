<template>
	<view class="transfer_input">
		<text class="transfer_input_text">{{ input_text }}</text>
		<view class="transfer_input_view">
			<image class="icon" src="@/static/rmb_logo_black.png" mode="aspectFill" />
			<input class="transfer_input_style" placeholder="请输入金额"
				placeholder-style="font-size: 40rpx; margin-bottom: 30rpx;" type="digit" confirm-type="done"
				@blur="formatInput" @input="checkInput" v-model="money" :disabled="input_disabled" />
			<image class="icon" src="@/static/delete.png" mode="aspectFit" @click="deleteMoney" />
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
				input_disabled: false,
				button_disabled: true,
			};
		},
		props:['input_text'],
		methods: {
			formatInput(event) {
				if (!/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
					// uni.$emit('button_disabled', true)
					this.button_disabled = true
				} else {
					if (event.target.value > Config.getMAXMoney() || event.target.value == 0) {
						// uni.$emit('button_disabled', true)
						this.button_disabled = true
					} else {
						this.money = parseFloat(event.target.value).toFixed(2)
						// uni.$emit('button_disabled', false)
						this.button_disabled = false
					}
				}
				uni.$emit('button_disabled', this.button_disabled)
				console.log('formatInput input_disabled: ', this.input_disabled)
				console.log('formatInput button_disabled: ', this.button_disabled)
			},
			checkInput(event) {
				if (/^\d+(\.\d{0,2})?$/.test(event.target.value) || event.target.value == '') {
					this.input_disabled = false
					if (/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
						// uni.$emit('button_disabled', false)
						this.button_disabled = false
					}
					else {
						// uni.$emit('button_disabled', true)
						this.button_disabled = true
					}
				}
				else {
					this.input_disabled = true
					// uni.$emit('button_disabled', false)
					this.button_disabled = false
				}
				uni.$emit('button_disabled', this.button_disabled)
				console.log('checkInput input_disabled: ', this.input_disabled)
				console.log('checkInput button_disabled: ', this.button_disabled)
			},
			deleteMoney() {
				this.money = ''
				this.input_disabled = false
				// uni.$emit('button_disabled', false)
				this.button_disabled = true
				uni.$emit('button_disabled', this.button_disabled)
				console.log('deleteMoney input_disabled: ', this.input_disabled)
				console.log('deleteMoney button_disabled: ', this.button_disabled)
			},
		}
	}
</script>

<style>
	.transfer_input {
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
		
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	
	.icon {
		width: 50rpx;
		height: 50rpx;
	}
	
	.transfer_input_text {
		// border: 1upx solid black;
	
		margin-left: 10rpx;
		margin-top: 4rpx;
	
		font-size: 26rpx;
		font-weight: bold;
	}
	
	.transfer_input_style {
		border-bottom: 1rpx solid grey;
	
		// border: 1upx solid red;
		margin-left: 15rpx;
		margin-right: 10rpx;
	
		width: 100%;
	}
</style>
