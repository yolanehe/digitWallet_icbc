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
				<image class="money_icon" src="@/static/rmb_logo_black.png" mode="aspectFill"/>
				<input class="transfer_input_style" placeholder="请输入金额" placeholder-style="font-size: 40rpx; margin-bottom: 10rpx;" type="number" confirm-type="done" @blur="onKeyInput" v-model="money_format"/>
				<image class="delete_icon" src="@/static/delete.png" mode="aspectFit" @tap="deleteMoney"/>
			</view> 
		</view>
	</view>
</template>

<script>
	import tkiFloatKeyboard from '@/components/tki-float-keyboard/tki-float-keyboard.vue'
	export default {
		components: {
			tkiFloatKeyboard
		},
		data() {
			return {
				money: 0,
				money_format: '',
			}
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
				number = number +"";
				number = number.replace(/\,/g, "");
			
				if(isNaN(number) || number == "") return "";
			
				number = Math.round(number * 100) / 100;
			
			    if (number < 0) {
					return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0);
				}
			    else {
					return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
				}
			
			},
			onKeyInput(event) {
				if (!/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
					uni.showToast({
						title: '输入不合法',
					})
					
					this.money = 0
					this.money_format = ''
				}
				else {
					this.money = parseFloat(event.target.value).toFixed(2)
					this.money_format = this.toThousands(event.target.value)
					
					// console.log(this.money)
					// console.log(this.money_format)
				}
			},
			deleteMoney() {
				this.money = 0
				this.money_format = ''
				// console.log(this.money)
				// console.log(this.money_format)
			}
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
		border: 1rpx dotted grey;
		border-radius: 10rpx;
		
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		
		margin-top: 30rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 30rpx;
		
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
	.money_icon {
		// border: 1rpx solid red;
		
		width: 50rpx;
		height: 50rpx;
	}
	.delete_icon {
		// border: 1rpx solid red;
		
		width: 50rpx;
		height: 50rpx;
	}
	.transfer_input_text {
		// border: 1upx solid black;
		
		margin-left: 30rpx;
		
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
</style>
