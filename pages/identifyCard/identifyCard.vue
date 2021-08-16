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
				
				dwId: '', 
				pwd: '', 
				money: 0,
				cardId: '',
				checkId: '',
				checkType: 0,
				
				type: '0', // 0: 识别卡, 1: 开立卡
			}
		},
		destroyed() {
			clearInterval(this.timer);
		},
		onLoad(option) {
			if (uni.getSystemInfoSync().platform == 'ios') {
				uni.showModal({
					title: '提示',
					content: '本手机不支持NFC功能,请点击确认按钮返回主页',
					confirmText: '确认',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							uni.redirectTo({
								'url': '/pages/index/index',
							})
						}
						else {
							console.log('identifyCard ios:', res)
						}
					}
				})
			}
			else {
				this.type = option.type
				
				if (this.type == '2') {
					this.checkId = option.Id
					this.dwId = option.dwId
					this.checkType = option.checkType
					this.money = option.money
					if (this.checkType == 0) {
						this.pwd = option.pwd
					}
				}
				
				this.countDown()
				this.getCardId()
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
				this.$request.getCardInfo(this.cardId).then(res => {
					clearInterval(this.timer);
					this.timer = null;
					if (res.code == '0') {
						uni.redirectTo({
							url: "/pages/carddetail/carddetail?cid=" + res.data.cardInfo.card.cid,
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
						});
					}
				})
			},
			establishCard() {
				this.$request.getCardIdentification(this.cardId).then(res => {
					clearInterval(this.timer);
					this.timer = null;
					if (res.code == '0') {
						let item = {
							'title': '开立卡成功',
							'button_text': '继续开立',
							'url': '/pages/identifyCard/identifyCard?type=1',
							'transtype': 4
						}
						
						uni.redirectTo({
							url: "/pages/success/success?item=" + encodeURIComponent(JSON.stringify(item)),
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
						});
					}
				})
			},
			recharge() {
				this.$request.cardRecharge(this.checkId, this.dwId, this.pwd, this.money).then(res => {
					clearInterval(this.timer);
					this.timer = null;
					if (res.code == '0') {
						let item = {
							'title': '充值成功',
							'button_text': '继续充值',
							'url': '/pages/recharge/walletCard', 
							'amount': this.money,
							'cardId': this.checkId,
							'walletId': this.dwId,
							'transtype': 2
						}
						
						uni.redirectTo({
							url: "/pages/success/success?item=" + encodeURIComponent(JSON.stringify(item)),
						});
					}
					else {
						let item = {
							'title': '充值失败',
							'button_text': '继续充值',
							'url': '/pages/recharge/walletCard', 
							'amount': this.money,
							'err_code': res.code,
							'transtype': 2,
							'cardId': this.checkId,
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
						});
					}
				})
			},
			withdraw() {
				this.$request.cardWithdraw(this.checkId, this.dwId).then(res => {
					clearInterval(this.timer);
					this.timer = null;
					if (res.code == '0') {
						let item = {
							'title': '提现成功',
							'button_text': '继续提现',
							'url': '/pages/withdraw/walletCard', 
							'amount': this.money,
							'cardId': this.checkId,
							'walletId': this.dwId,
							'transtype': 3
						}
						
						uni.redirectTo({
							url: "/pages/success/success?item=" + encodeURIComponent(JSON.stringify(item)),
						});
					}
					else {
						let item = {
							'title': '提现失败',
							'button_text': '继续提现',
							'url': '/pages/withdraw/walletCard', 
							'amount': this.money,
							'err_code': res.code,
							'transtype': 3,
							'cardId': this.checkId,
						}
						
						uni.redirectTo({
							url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
						});
					}
				})
			},
			checkCard() {
				if (this.checkId == this.cardId) {
					if (this.checkType == 0) {
						this.recharge()
					}
					else {
						this.withdraw()
					}
				}
				else {
					let item = {}
					if (this.checkType == 0) {
						item = {
							'title': '充值失败',
							'button_text': '继续充值',
							'url': '/pages/recharge/walletCard', 
							'amount': this.money,
							'err_code': 501,
							'transtype': 2,
							'cardId': this.checkId,
						}
					}
					else {
						item = {
							'title': '提现失败',
							'button_text': '继续提现',
							'url': '/pages/withdraw/walletCard', 
							'amount': this.money,
							'err_code': 501,
							'transtype': 3,
							'cardId': this.checkId,
						}
					}
					
					uni.redirectTo({
						url: "/pages/fail/fail?item=" + encodeURIComponent(JSON.stringify(item)),
					});
				}
			},
			async getCardId() {
				const id = await NFCidentify.NFCReadCard();
				this.cardId = id
				
				switch (this.type) {
					case '0':
						this.identifyCard()
						break;
					case '1':
						this.establishCard()
						break;
					case '2':
						this.checkCard()
						break;
					default:
						break;
				}
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
