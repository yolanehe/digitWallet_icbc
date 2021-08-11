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
				cardId: '',
				
				type: 0, // 0: 识别卡, 1: 开立卡
			}
		},
		destroyed() {
			clearInterval(this.timer);
		},
		async onLoad(option) {
			this.type = option.type
			console.log('identifyCard type:', this.type)
			
			this.countDown();
			this.cardId = NFCidentify.NFCReadCard()
			
			switch (this.type) {
				case 0:
					identifyCard()
					break;
				case 1:
					establishCard()
					break;
				default:
					break;
			}
		},
		methods: {
			countDown() {
				let _this = this;
				const TIME_COUNT = 30;
				if (!this.timer) {
					this.count = 0;
					this.timer = setInterval(() => {
						if (this.count >= 0 && this.count <= TIME_COUNT) {
							this.count++;
							if (this.count == TIME_COUNT) {
								let item = {
									'title': '识别卡失败',
									'button_text': '重新识别',
									'url': '/pages/identifyCard/identifyCard?type=' + this.type,
									'err_code': '500',
									'transtype': 4
								}
								
								if (this.type == 1) {
									item['title'] = '开立卡失败'
									item['button_text'] = '重新开立'
								}
								
								uni.redirectTo({
									url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}
							
							if (this.count == 20) {
								uni.showToast({
									title: '请检查手机NFC功能是否打开',
									icon: 'none',
									mask: true,
									duration: 3000
								})
							}
						} else {
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
			},
			identifyCard() {
				service.getCardIdentification(this.cardId).then(res => {
					console.log('getCardIdentification: ', res)
					console.log('type:', type)
					
					if (res.code == '0') {
						console.log('getCardIdentification res.code=0')
						let item = {
							'title': '开立卡成功',
							'button_text': '继续开立',
							'url': '/pages/identifyCard/identifyCard?type=1',
							'transtype': 4
						}
						
						uni.redirectTo({
							url: "/pages/success/success?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
					else {
						let item = {
							'title': '开立卡失败',
							'button_text': '换卡开立',
							'url': '/pages/identifyCard/identifyCard?type=1',
							'err_code': res.code,
							'transtype': 4
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
			establishCard() {
				service.getCardInfo(this.cardId).then(res => {
					console.log('getCardInfo: ', res)
					console.log('type:', type)
					
					if (res.code == '0') {
						console.log('getCardInfo res.code=0')
						uni.redirectTo({
							url: "/pages/carddetail/carddetail?cid=" + res.data.cardInfo.card.cid,
							success: res => {},
							fail: () => {},
							complete: () => {}
						})
					}
					else {
						let item = {
							'title': '识别卡失败',
							'button_text': '重新识别',
							'url': '/pages/identifyCard/identifyCard?type=0',
							'err_code': res.code,
							'transtype': 4
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
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
