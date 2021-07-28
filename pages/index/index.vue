<template>
	<view class="content">
		<view class="img-center-index">
			<view class="walletMoney">
				<view style="display: flex;">
					<text class="text-style">余额</text>
					<image class="displayImg" @click="displayDetail" :src="displayImgSrc()" />
				</view>
				<text class="text-style" style="font-weight: bold; font-size: 50upx;">{{ money }}</text>
			</view>
			<image class="img-bg" src="@/static/RMB_v3.png" mode="widthFix" />
		</view>
		<view class="intro-block">
			<view class="intro-text">
				<text class="text-walletDetail">钱包名称：{{ wallet.nickName + '\n' }}</text>
				<text class="text-walletDetail">钱包ID：{{ wallet.dwId }}</text>
			</view>
			<view class="intro-trans">
				<button class="copyID-button" @click="clipContent">复制ID</button>
			</view>
		</view>
		<view class="button-list">
			<button class="button-style2" @tap="navi_topUpAccountWallet">
				<view class="button-content">
					<image class="button-icon" src="@/static/topup_v2.png" mode="scaleToFill" />
					<text>钱包充值</text>
				</view>
			</button>
			<button class="button-style1">
				<view class="button-content">
					<image class="button-icon" src="@/static/bank_v2.png" mode="scaleToFill" />
					<text>银行存储</text>
				</view>
			</button>
			<button class="button-style2">
				<view class="button-content">
					<image class="button-icon" src="@/static/wallet.png" mode="scaleToFill" />
					<text>开立钱包</text>
				</view>
			</button>
			<button class="button-style1" @tap="navi_identifyCard">
				<view class="button-content">
					<image class="button-icon" src="@/static/card.png" mode="scaleToFill" />
					<text>识别软卡</text>
				</view>
			</button>
			<button class="button-style2">
				<view class="button-content">
					<image class="button-icon" src="@/static/trans_v2.png" mode="scaleToFill" />
					<text>交易明细</text>
				</view>
			</button>
		</view>
	</view>
</template>

<script>
	import imageSrc from "@/static/2.png"

	export default {
		data() {
			return {
				display: false,
				imageSrc: imageSrc,
				wallet: {},
				money: '***',
			}
		},
		onShow() {
			this.$request.getWallet().then(res => {
				this.wallet = res.userInfo
				console.log(res)
			})
		},
		methods: {
			displayDetail() {
				this.display = !this.display
				if (this.display) {
					this.imageSrc = require("@/static/2.png")
					this.money = "***"
				} else {
					this.imageSrc = require("@/static/1.png")
					this.money = parseFloat(this.wallet.amount).toFixed(2)
				}
			},
			displayImgSrc() {
				return this.imageSrc
			},
			clipContent() {
				uni.setClipboardData({
					data: this.wallet.dwId,
					success: function() {
						uni.getClipboardData({
							success: function(res) {
								console.log(res.data);
							}
						});
					},
					fail: (err) => {
						console.log('failed: ', err)
					}
				})
			},
			navi_identifyCard() {
				uni.navigateTo({
					url: "/pages/identifyCard/identifyCard",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			navi_topUpAccountWallet() {
				uni.navigateTo({
					url: "/pages/topUpAccountWallet/topUpAccountWallet",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import url("@/common/uni.css");
</style>
