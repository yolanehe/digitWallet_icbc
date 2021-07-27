<template>
	<view class="account_lists">
		<!-- head -->
		<view class="account_list_header" @click.stop="showDownMenu">
			<text class="picker_text">{{ value }}</text>
			<image class="select_down_image" src="@/static/down.png"></image>
		</view>
		<!-- drop down area -->
		<view class="account_list_down" v-show="showMenu">
			
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
	</view>
</template>

<script>
	export default {
		name:"account_lists",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
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
