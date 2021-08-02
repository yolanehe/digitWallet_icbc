<template>
	<view class="transfer_top">
		<view class="transfer-block" style="padding-left: 35rpx;">
			<image class="transfer-icon" :src="getLogoSrc(logo_map[left_content].image)" mode="widthFix" />
			<text class="transfer-text">{{ logo_map[left_content].name }}</text>
		</view>
		<image class="transfer-arrow" src="@/static/arrow.png" mode="widthFix" />
		<view class="transfer-block" style="padding-right: 35rpx;">
			<image class="transfer-icon" :src="getLogoSrc(logo_map[right_content].image)" mode="widthFix" />
			<text class="transfer-text">{{ logo_map[right_content].name }}</text>
		</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	
	export default {
		name:"transfer_top",
		data() {
			return {
				logo_map: Config.getLogoMap()
			};
		},
		props:['left_content', 'right_content'],
		methods: {
			getLogoSrc(src) {
				return require('@/static/' + src + '.png')
			}
		}
	}
</script>

<style>
	.transfer_top {
		margin-top: 30rpx;
		// justify-content: center;
		align-items: center;
		flex-direction: row;
		display: flex;
	}

	.transfer-icon {
		width: 120rpx;
		height: 100rpx;
	}

	.transfer-block {
		flex-direction: column;
		display: flex;

		align-items: center;
		
		width: 45%;
	}

	.transfer-arrow {
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		width: 72rpx;
		height: 72rpx;
	}

	.transfer-text {
		font-size: 30rpx;
	}
</style>
