<template>
	<view class="content" v-if="wallet.dwId">
		<view class="img-center-index">
			<view class="walletMoney">
				<view style="display: flex;">
					<text class="text-style">余额</text>
					<image class="displayImg" @click="displayDetail" :src="imageSrc" />
				</view>
				<text class="text-style" style="font-weight: bold; font-size: 50upx;">{{ money }}</text>
			</view>
			<image class="img-bg" src="@/static/RMB_v3.png" mode="widthFix" />
		</view>
		<view class="intro-block">
			<view class="intro-text">
				<text class="text-walletDetail">钱包名称：{{ wallet.nickName ? wallet.nickName + '\n' : '' + '\n' }}</text>
				<text class="text-walletDetail">钱包ID：{{ wallet.dwId ? wallet.dwId : '' }}</text>
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
				<view class="popup_view">
					<view class="click-style" @click="ShowHidden = !ShowHidden">
						<text class="charge">交易记录</text>
						<label class="select">{{array[selectid]}}</label>
						<image class="image-down" :src="selectImgSrc" mode="aspectFit"></image>
					</view>
					<view class="arrivalNavigation" v-if="ShowHidden">
						<view class="sideNavigation">
							<nav>
								<ul>
									<view v-for="(item,index) in array" :key="index" :checked="index ==selectid"
										@click="radioIndexChange(index)">
										<li class="liBottomBorder">{{item}}</li>
									</view>
								</ul>
							</nav>
						</view>
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
				display: true,
				wallet: {},
				productList:[],
				
				array: ['全部', '充值', '提现', '转入', '转出'],
				ShowHidden: false,
				selectid: 0,
			}
		},
		computed: {
			money() {
				return this.display ? '***' : parseFloat(this.wallet.amount).toFixed(2)
			},
			imageSrc() {
				return this.display ? require("@/static/2.png") : require("@/static/1.png")
			},
			selectImgSrc() {
				return this.ShowHidden ? require('@/static/up_v2.png') : require('@/static/down_v2.png') 
			}
		},
		onShow() {
			this.$request.getWallet().then(res => {
				this.wallet = res.data.userInfo
			})
			this.$request.getWalletTrans(0).then(res => {
				console.log('res:', res)
				this.productList = res.data.transFlowList
			})
		},
		methods: {
			radioIndexChange(index) {
				this.selectid = index
				this.ShowHidden = false
				
				let typeCode = this.selectid
				
				this.$request.getWalletTrans(typeCode).then(res => {
					this.productList = res.data.transFlowList
				})
			},
			displayDetail() {
				this.display = !this.display
			},
			clipContent() {
				uni.setClipboardData({
					data: this.wallet.dwId,
					success: function() {
						wx.hideToast();
						wx.showToast({
							title: '已成功复制钱包ID至剪贴板',
							icon: 'none',
							duration: 2000
						})
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
		flex-direction: row; 
		align-items: center;
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
	}
	.popup_view {
		background-color: #fff;
		padding: 40rpx 10rpx;
	}
	
	.text-chargeDetail {
		display: flex;
		margin: 0 auto;
		height: 70rpx;
		width: 90%;
		align-items: flex-start;
	}
	
	.click-style {
		margin: 0 auto;
		margin-top: 20rpx;
		margin-bottom: 35rpx;
		height: 30rpx;
		position: relative;
		align-items: flex-end; 
		width: 90%;
		flex-direction: row;
	}
	
	.charge {
		font-size: 38upx;
		position: absolute;
		left: 0rpx;
		bottom: 0rpx;
		
		font-weight: bold;
	}
	
	.select {
		position: absolute;
		right: 45rpx;
		bottom: 0rpx;
		font-size: 30rpx;
		line-height: 48rpx;
	}
	
	.image-down {
		position: absolute;
		height: 20rpx;
		width: 20rpx;
		bottom: 15rpx;
		right: 10rpx;
	}
	
	.arrivalNavigation {
		width: 250rpx;
		position: absolute;
		right: 20rpx;
		z-index: 99;
	
		.sideNavigation {
			width: 248rpx;
			background-color: #202020;
			color: #eee;
			border-radius: 10rpx;
	
			li {
				height: 85rpx;
				text-align: center;
				line-height: 85rpx;
				font-size: 25rpx;
			}
	
			.liBottomBorder {
				border: 0.1rpx solid #373737;
			}
		}
	}
</style>
