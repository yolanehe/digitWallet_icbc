<template>
	<view class="picker_block">
		<view class="picker_unit">
			<view class="picker_unit_left">
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
		<view :class="showHidden ? 'content-open' : 'content-close'">
			<view :class="showHidden ? 'parting' : 'content-close'" />
			<scroll-view :class="showHidden ? 'account_list_scroll' : 'content-close'" scroll-y="true">
				<radio-group class="account_list" v-for="(item,index) in accounts" :key="index">
					<view style="display: flex; align-items: center;">
						<image class="account_icon" :src="getAccountIcon(item.bankCode)" mode="aspectFit" />
						<text class="picker_text">{{ item.accId.substr(0, 4) + ' **** ' +  item.accId.substr(15, 4)}}</text>
					</view>
					<view>
						<radio color="#b30000" :value="item.accId" :checked="index == account_index" @click="radioIndexChange(index)"/>
					</view>
				</radio-group>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	
	export default {
		name:"pickerBlock",
		props:{
			accounts: {
				type: Array,
				value: [],
			}, 
			selected_account: {
				type: Map,
				value: {},
		}},
		data() {
			return {
				bankCode: Config.getBankCode(),
				showHidden: false,
				account_index: 0,
			};
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
				
				this.$emit('selected_index', this.account_index)
			},
		}
	}
</script>

<style>
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
</style>
