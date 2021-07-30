<template>
	<view class="content">
		<view class="logo">
			<image src="../../static/nfc-step1.98b6b356.gif" mode="widthFix"></image>
		</view>
		<text class="title">{{ title }}\n</text>
		<text class="title">识别中...{{ count }}s</text>
	</view>
</template>

<script>
	import NFCidentify from '@/common/NFCidentify.js'

	export default {
		data() {
			return {
				title: "请将手机NFC打开，并将卡式软钱包贴近",
				count: 0,
				timer: null,
				NFCAdapter: null,
				tab: {},
			}
		},
		destroyed() {
			clearInterval(this.timer);
		},

		methods: {
			countDown() {
				let _this = this;
				const TIME_COUNT = 3;
				if (!this.timer) {
					this.count = 0;
					this.timer = setInterval(() => {
						if (this.count >= 0 && this.count <= TIME_COUNT) {
							this.count++;
							if (this.count == 3) {
								console.log(this.count)
								uni.navigateTo({
									url: "/pages/carddetail/carddetail",
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}
						} else {
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
			},
		},
		async onLoad() {
			NFCidentify.initDevice();
		},
		onShow() {
			this.countDown();
		},
		onUnload() {
			NFCidentify.closeNFC();
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.logo {
		// margin-top: 10rpx;
		// margin-left: auto;
		// margin-right: auto;
		// margin-bottom: 200rpx;

		//border: 1upx solid black;

	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 35rpx;
		color: black;

		margin-top: 30upx;
	}
</style>
