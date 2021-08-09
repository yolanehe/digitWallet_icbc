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
			<button class="button-style2" @tap="navi_rechargeWalletAccount">
				<view class="button-content">
					<image class="button-icon" src="@/static/topup_v2.png" mode="scaleToFill" />
					<text>钱包充值</text>
				</view>
			</button>
			<button class="button-style1" @tap="navi_withdrawWalletAccount">
				<view class="button-content">
					<image class="button-icon" src="@/static/bank_v2.png" mode="scaleToFill" />
					<text>银行存储</text>
				</view>
			</button>
			<button class="button-style2" @tap="navi_establishCard">
				<view class="button-content">
					<image class="button-icon" src="@/static/wallet.png" mode="scaleToFill" />
					<text>开立软卡</text>
				</view>
			</button>
			<button class="button-style1" @tap="navi_identifyCard">
				<view class="button-content">
					<image class="button-icon" src="@/static/card.png" mode="scaleToFill" />
					<text>识别软卡</text>
				</view>
			</button>
			<button class="button-style2" @click="toggle()">
				<view class="button-content">
					<image class="button-icon" src="@/static/trans_v2.png" mode="scaleToFill" />
					<text>交易明细</text>
				</view>
			</button>
			
			<uni-popup class="pop_up" ref="popup" :type="type" :animation="false" :maskClick="true">
				<view style="background-color: #fff;padding: 30px;">
					<view class="text-chargeDetail">
						<text>2021年7月</text>
					</view>
					<scroll-view class="popWindow" scroll-y="true">
						<detail_list :productList="productList"></detail_list>
					</scroll-view>
				</view>
			</uni-popup>
			
		</view>
	</view>
</template>

<script>
	import imageSrc from "@/static/2.png"
	import detail_list from '@/components/detail-list/detail-list.vue'
	export default {
		components: {
			'detail_list': detail_list,
		},
		data() {
			return {
				type: 'bottom',
				display: false,
				imageSrc: imageSrc,
				wallet: {},
				money: '***',
				productList:[]
			}
		},
		onShow() {
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			})
			this.$request.getWalletTrans().then(res => {
				this.productList = res.data.transFlowList
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
			navi_establishCard() {
				uni.navigateTo({
					url: "/pages/identifyCard/identifyCard?type=1",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			navi_identifyCard() {
				uni.navigateTo({
					url: "/pages/identifyCard/identifyCard?type=0",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			navi_rechargeWalletAccount() {
				uni.navigateTo({
					url: "/pages/recharge/walletAccount",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			navi_withdrawWalletAccount() {
				uni.navigateTo({
					url: "/pages/withdraw/walletAccount",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toggle(type) {
				this.type = type;
				this.$refs['popup'].open();  //打开弹窗组件
			},
		}
	}
</script>

<style lang="scss">
	@import url("@/common/uni.css");
	.popWindow {
		margin: 0 auto;
		display: flex;
		//overflow-y: scroll;           //设置滚动条
		flex-direction: row; //column:让元素沿垂直主轴从上到下垂直排列,row: 沿水平主轴让元素从左向右排列,row-reverse:沿水平主轴让元素从右向左排列
		align-items: center;
		/*align-items: center;        //flex-start:靠上对齐, center:居中对齐, flex-end:靠下对齐 */
		//justify-content: flex-start;  //center:整体居中排列,flex-start:靠左,flex-end:靠右, space-between,space-around
		height: 650rpx;
		width: 100%;
		margin: 0px auto;
		}
	.text-chargeDetail {
		display: flex;
		margin: 0 auto;
		height: 70rpx;
		width: 90%;
		align-items: flex-start;
		//border: 1upx solid blue;
	}
</style>
