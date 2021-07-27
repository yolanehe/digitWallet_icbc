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
				<image class="icon" src="@/static/rmb_logo_black.png" mode="aspectFill"/>
				<input class="transfer_input_style" placeholder="请输入金额" placeholder-style="font-size: 40rpx; margin-bottom: 10rpx;" type="digit" confirm-type="done" @blur="onKeyInput" v-model="money"/>
				<image class="icon" src="@/static/delete.png" mode="aspectFit" @click="deleteMoney"/>
			</view> 
		</view>
		<view class="picker_unit">
			<text class="picker_text">交易卡卡号</text>
			<picker class="account_picker" mode="selector" :range="accounts" :range-key="'ID'" :value="index" @change="picker_change">
				<view class="select_unit">
					<image class="icon" :src="accounts[index].image" mode="aspectFit" />
					<text class="picker_text">{{ accounts[index].ID }}</text>
				</view>
			</picker>
		</view>
		<button class="button-style2">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				accounts: [{
					"image": "@/static/icbc.png",
					"ID": "6212 **** 6282"
				}, {
					"image": "@/static/ccb.png",
					"ID": "6200 **** 3333"
				}, {
					"image": "@/static/abc.png",
					"ID": "4404 **** 6262"
				}, {
					"image": "@/static/icbc.png",
					"ID": "6277 **** 3333"
				}]
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
					
					this.money = ''
				}
				else {
					this.money = parseFloat(event.target.value).toFixed(2)
				}
			},
			deleteMoney() {
				this.money = ''
			},
			picker_change(event) {
				console.log(this.accounts)
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
		border: 2rpx dashed grey;
		border-radius: 10rpx;
		
		padding-top: 25rpx;
		padding-bottom: 40rpx;
		
		margin-top: 50rpx;
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
	.icon {
		border: 1rpx solid red;
		
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
	.account_picker {
		border: 1rpx solid blue;
	}
	.picker_unit {
		border: 1rpx solid black;
		
		padding-left: 20rpx;
		padding-right: 20rpx;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.select_unit {
		border: 1rpx solid red;
		
		display: flex;
	}
	.picker_text {
		border: 1rpx solid pink;
		
		font-size: 36rpx;
	}
</style>
